/* Ursus Works: logged-out review submissions.
   Saves a review only if the order number exists in customer-orders.
   One logged-out review per order number.
   Required secret: FIREBASE_SERVICE_ACCOUNT (the full service account JSON). */

const ALLOWED_ORIGINS = [
  'https://ursusworks.com', 'https://www.ursusworks.com',
  'https://ursusarmament.com', 'https://www.ursusarmament.com'
];

let cachedToken = null;

const b64url = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)))
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const encodeJson = obj => b64url(new TextEncoder().encode(JSON.stringify(obj)));

async function getToken(account) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expires > now + 60) return cachedToken.value;

  const unsigned = encodeJson({ alg: 'RS256', typ: 'JWT' }) + '.' + encodeJson({
    iss: account.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  });
  const der = Uint8Array.from(
    atob(account.private_key.replace(/-----[^-]+-----|\s/g, '')), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned));

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: unsigned + '.' + b64url(signature)
    })
  });
  if (!res.ok) throw new Error('Token request failed: ' + res.status);
  const data = await res.json();
  cachedToken = { value: data.access_token, expires: now + data.expires_in };
  return cachedToken.value;
}

function validate(body) {
  const text = (v, max) =>
    typeof v === 'string' && v.trim().length > 0 && v.trim().length <= max ? v.trim() : null;
  const review = {
    orderNumber:  text(body.orderNumber, 13),
    productType:  text(body.productType, 80),
    feedbackType: text(body.feedbackType, 30),
    firstName:    text(body.firstName, 60),
    state:        text(body.state, 2),
    reviewText:   text(body.reviewText, 5000),
    starRating:   body.starRating
  };
  if (Object.values(review).some(v => v === null)) return null;
  if (!/^UA-\d{1,10}$/.test(review.orderNumber)) return null;
  if (!/^[A-Z]{2}$/.test(review.state)) return null;
  if (!['Customer Purchase', 'Field Review'].includes(review.feedbackType)) return null;
  if (!Number.isInteger(review.starRating) || review.starRating < 1 || review.starRating > 5) return null;
  return review;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.includes(origin);
    const headers = {
      'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin'
    };
    const reply = (status, ok) => Response.json({ ok }, { status, headers });

    if (!allowed) return reply(403, false);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return reply(405, false);

    try {
      const raw = await request.text();
      if (raw.length > 20000) return reply(413, false);
      let body;
      try { body = JSON.parse(raw); } catch { return reply(400, false); }
      if (!body || typeof body !== 'object') return reply(400, false);

      if (body.website) return reply(200, true);          // spam trap

      const review = validate(body);
      if (!review) return reply(400, false);

      const account = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
      const base = 'https://firestore.googleapis.com/v1/projects/' +
        account.project_id + '/databases/(default)/documents';
      const auth = {
        'Authorization': 'Bearer ' + await getToken(account),
        'Content-Type': 'application/json'
      };

      // 1. Does the order exist?
      const search = await fetch(base + ':runQuery', {
        method: 'POST', headers: auth,
        body: JSON.stringify({ structuredQuery: {
          from: [{ collectionId: 'customer-orders' }],
          where: { fieldFilter: {
            field: { fieldPath: 'order_number' }, op: 'EQUAL',
            value: { stringValue: review.orderNumber }
          } },
          limit: 1
        } })
      });
      if (!search.ok) throw new Error('Order lookup failed: ' + search.status);
      const found = (await search.json()).some(row => row.document);
      if (!found) return reply(200, true);                // same reply as a match; nothing saved

      // 2. Save it. The fixed document ID blocks a second review for the same order.
      const str = v => ({ stringValue: v });
      const save = await fetch(base + '/ursus-reviews?documentId=guest-' + review.orderNumber, {
        method: 'POST', headers: auth,
        body: JSON.stringify({ fields: {
          productType:    str(review.productType),
          feedbackType:   str(review.feedbackType),
          starRating:     { integerValue: String(review.starRating) },
          firstName:      str(review.firstName),
          state:          str(review.state),
          reviewText:     str(review.reviewText),
          orderNumber:    str(review.orderNumber),
          reviewApproval: { booleanValue: false },
          img1_url:       str(''),
          img2_url:       str(''),
          timestamp:      { timestampValue: new Date().toISOString() }
        } })
      });
      if (!save.ok && save.status !== 409) throw new Error('Save failed: ' + save.status);
      return reply(200, true);                            // 409 = already reviewed
    } catch (err) {
      console.error(err.message);
      return reply(500, false);
    }
  }
};
