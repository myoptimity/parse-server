/*
 * PhantAuth was designed to simplify testing for applications using OpenID Connect
 * authentication by making use of random generated users.
 *
 * To learn more, please go to: https://www.phantauth.net
 */

const { Parse } = require('parse/node');
const httpsRequest = require('./httpsRequest');
import Config from '../../Config';
import Deprecator from '../../Deprecator/Deprecator';

// Returns a promise that fulfills if this user id is valid.
async function validateAuthData(authData) {
  const config = Config.get(Parse.applicationId);

  Deprecator.logRuntimeDeprecation({ usage: 'phantauth adapter' });

  const phantauthConfig = config.auth.phantauth;
  if (!phantauthConfig?.enableInsecureAuth) {
    throw new Parse.Error(Parse.Error.INTERNAL_SERVER_ERROR, 'PhantAuth only works with enableInsecureAuth: true');
  }

  const data = await request('auth/userinfo', authData.access_token);
  if (data?.sub !== authData.id) {
    throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'PhantAuth auth is invalid for this user.');
  }
}

// Returns a promise that fulfills if this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

// A promisey wrapper for api requests
function request(path, access_token) {
  return httpsRequest.get({
    host: 'phantauth.net',
    path: '/' + path,
    headers: {
      Authorization: 'bearer ' + access_token,
      'User-Agent': 'parse-server',
    },
  });
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData,
};
