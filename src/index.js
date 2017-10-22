// @flow
const detect = require('lang-detector');
const { text, createError, send } = require('micro');

module.exports = async (req/*: Request*/, res/*: Response*/)/* : Promise<string> */ => {
  if (req.method !== 'POST') throw createError(405, 'POST requests only.');

  const body = await text(req);
  if (!body || typeof body !== 'string') throw createError(400, 'Provide code snippet in body.');

  try {
    const result = detect(body);
    if (result !== 'Unknown') return result;
    return send(res, 400, 'Invalid code snippet.')
  } catch(err) {
    throw createError(400, 'Invalid code snippet.');
  }
}
