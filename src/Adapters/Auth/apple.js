/**
 * Parse Server authentication adapter for Apple.
 *
 * @class AppleAdapter
 * @param {Object} options - Configuration options for the adapter.
 * @param {string} options.clientId - Your Apple App ID.
 *
 * @param {Object} authData - The authentication data provided by the client.
 * @param {string} authData.id - The user ID obtained from Apple.
 * @param {string} authData.token - The token obtained from Apple.
 *
 * @description
 * ## Parse Server Configuration
 * To configure Parse Server for Apple authentication, use the following structure:
 * ```json
 * {
 *   "auth": {
 *     "apple": {
 *       "clientId": "12345"
 *     }
 *   }
 * }
 * ```
 *
 * ## Expected `authData` from the Client
 * The adapter expects the client to provide the following `authData` payload:
 * - `authData.id` (**string**, required): The user ID obtained from Apple.
 * - `authData.token` (**string**, required): The token obtained from Apple.
 *
 * Parse Server stores the required authentication data in the database.
 *
 * ### Example AuthData from Apple
 * ```json
 * {
 *   "apple": {
 *     "id": "1234567",
 *     "token": "xxxxx.yyyyy.zzzzz"
 *   }
 * }
 * ```
 *
 * @see {@link https://developer.apple.com/documentation/signinwithapplerestapi Sign in with Apple REST API Documentation}
 */

// Apple SignIn Auth
// https://developer.apple.com/documentation/signinwithapplerestapi

const Parse = require('parse/node').Parse;
const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const authUtils = require('./utils');

const TOKEN_ISSUER = 'https://appleid.apple.com';

const getAppleKeyByKeyId = async (keyId, cacheMaxEntries, cacheMaxAge) => {
  const client = jwksClient({
    jwksUri: `${TOKEN_ISSUER}/auth/keys`,
    cache: true,
    cacheMaxEntries,
    cacheMaxAge,
  });

  let key;
  try {
    key = await authUtils.getSigningKey(client, keyId);
  } catch (error) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      `Unable to find matching key for Key ID: ${keyId}`
    );
  }
  return key;
};

const verifyIdToken = async ({ token, id }, { clientId, cacheMaxEntries, cacheMaxAge }) => {
  if (!token) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `id token is invalid for this user.`);
  }

  const { kid: keyId, alg: algorithm } = authUtils.getHeaderFromToken(token);
  const ONE_HOUR_IN_MS = 3600000;
  let jwtClaims;

  cacheMaxAge = cacheMaxAge || ONE_HOUR_IN_MS;
  cacheMaxEntries = cacheMaxEntries || 5;

  const appleKey = await getAppleKeyByKeyId(keyId, cacheMaxEntries, cacheMaxAge);
  const signingKey = appleKey.publicKey || appleKey.rsaPublicKey;

  try {
    jwtClaims = jwt.verify(token, signingKey, {
      algorithms: algorithm,
      // the audience can be checked against a string, a regular expression or a list of strings and/or regular expressions.
      audience: clientId,
    });
  } catch (exception) {
    const message = exception.message;

    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `${message}`);
  }

  if (jwtClaims.iss !== TOKEN_ISSUER) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      `id token not issued by correct OpenID provider - expected: ${TOKEN_ISSUER} | from: ${jwtClaims.iss}`
    );
  }

  if (jwtClaims.sub !== id) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, `auth data is invalid for this user.`);
  }
  return jwtClaims;
};

// Returns a promise that fulfills if this id token is valid
function validateAuthData(authData, options = {}) {
  return verifyIdToken(authData, options);
}

// Returns a promise that fulfills if this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

module.exports = {
  validateAppId,
  validateAuthData,
};
