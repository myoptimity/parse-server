/**
 * @interface SchemaOptions
 * @property {Function} afterMigration Execute a callback after running schema migrations.
 * @property {Function} beforeMigration Execute a callback before running schema migrations.
 * @property {Any} definitions Rest representation on Parse.Schema https://docs.parseplatform.org/rest/guide/#adding-a-schema
 * @property {Boolean} deleteExtraFields Is true if Parse Server should delete any fields not defined in a schema definition. This should only be used during development.
 * @property {Boolean} lockSchemas Is true if Parse Server will reject any attempts to modify the schema while the server is running.
 * @property {Boolean} recreateModifiedFields Is true if Parse Server should recreate any fields that are different between the current database schema and theschema definition. This should only be used during development.
 * @property {Boolean} strict Is true if Parse Server should exit if schema update fail.
 */

/**
 * @interface ParseServerOptions
 * @property {AccountLockoutOptions} accountLockout The account lockout policy for failed login attempts.
 * @property {Boolean} allowClientClassCreation Enable (or disable) client class creation, defaults to false
 * @property {Boolean} allowCustomObjectId Enable (or disable) custom objectId
 * @property {Boolean} allowExpiredAuthDataToken Allow a user to log in even if the 3rd party authentication token that was used to sign in to their account has expired. If this is set to `false`, then the token will be validated every time the user signs in to their account. This refers to the token that is stored in the `_User.authData` field. Defaults to `false`.
 * @property {String[]} allowHeaders Add headers to Access-Control-Allow-Headers
 * @property {String|String[]} allowOrigin Sets origins for Access-Control-Allow-Origin. This can be a string for a single origin or an array of strings for multiple origins.
 * @property {Adapter<AnalyticsAdapter>} analyticsAdapter Adapter module for the analytics
 * @property {String} appId Your Parse Application ID
 * @property {String} appName Sets the app name
 * @property {Object} auth Configuration for your authentication providers, as stringified JSON. See http://docs.parseplatform.org/parse-server/guide/#oauth-and-3rd-party-authentication
 * @property {Adapter<CacheAdapter>} cacheAdapter Adapter module for the cache
 * @property {Number} cacheMaxSize Sets the maximum size for the in memory cache, defaults to 10000
 * @property {Number} cacheTTL Sets the TTL for the in memory cache (in ms), defaults to 5000 (5 seconds)
 * @property {String} clientKey Key for iOS, MacOS, tvOS clients
 * @property {String} cloud Full path to your cloud code main.js
 * @property {Number|Boolean} cluster Run with cluster, optionally set the number of processes default to os.cpus().length
 * @property {String} collectionPrefix A collection prefix for the classes
 * @property {Boolean} convertEmailToLowercase Optional. If set to `true`, the `email` property of a user is automatically converted to lowercase before being stored in the database. Consequently, queries must match the case as stored in the database, which would be lowercase in this scenario. If `false`, the `email` property is stored as set, without any case modifications. Default is `false`.
 * @property {Boolean} convertUsernameToLowercase Optional. If set to `true`, the `username` property of a user is automatically converted to lowercase before being stored in the database. Consequently, queries must match the case as stored in the database, which would be lowercase in this scenario. If `false`, the `username` property is stored as set, without any case modifications. Default is `false`.
 * @property {CustomPagesOptions} customPages custom pages for password validation and reset
 * @property {Adapter<StorageAdapter>} databaseAdapter Adapter module for the database; any options that are not explicitly described here are passed directly to the database client.
 * @property {DatabaseOptions} databaseOptions Options to pass to the database client
 * @property {String} databaseURI The full URI to your database. Supported databases are mongodb or postgres.
 * @property {Number} defaultLimit Default value for limit option on queries, defaults to `100`.
 * @property {Boolean} directAccess Set to `true` if Parse requests within the same Node.js environment as Parse Server should be routed to Parse Server directly instead of via the HTTP interface. Default is `false`.<br><br>If set to `false` then Parse requests within the same Node.js environment as Parse Server are executed as HTTP requests sent to Parse Server via the `serverURL`. For example, a `Parse.Query` in Cloud Code is calling Parse Server via a HTTP request. The server is essentially making a HTTP request to itself, unnecessarily using network resources such as network ports.<br><br>⚠️ In environments where multiple Parse Server instances run behind a load balancer and Parse requests within the current Node.js environment should be routed via the load balancer and distributed as HTTP requests among all instances via the `serverURL`, this should be set to `false`.
 * @property {String} dotNetKey Key for Unity and .Net SDK
 * @property {Adapter<MailAdapter>} emailAdapter Adapter module for email sending
 * @property {Boolean} emailVerifyTokenReuseIfValid Set to `true` if a email verification token should be reused in case another token is requested but there is a token that is still valid, i.e. has not expired. This avoids the often observed issue that a user requests multiple emails and does not know which link contains a valid token because each newly generated token would invalidate the previous token.<br><br>Default is `false`.<br>Requires option `verifyUserEmails: true`.
 * @property {Number} emailVerifyTokenValidityDuration Set the validity duration of the email verification token in seconds after which the token expires. The token is used in the link that is set in the email. After the token expires, the link becomes invalid and a new link has to be sent. If the option is not set or set to `undefined`, then the token never expires.<br><br>For example, to expire the token after 2 hours, set a value of 7200 seconds (= 60 seconds * 60 minutes * 2 hours).<br><br>Default is `undefined`.<br>Requires option `verifyUserEmails: true`.
 * @property {Boolean} enableAnonymousUsers Enable (or disable) anonymous users, defaults to true
 * @property {Boolean} enableCollationCaseComparison Optional. If set to `true`, the collation rule of case comparison for queries and indexes is enabled. Enable this option to run Parse Server with MongoDB Atlas Serverless or AWS Amazon DocumentDB. If `false`, the collation rule of case comparison is disabled. Default is `false`.
 * @property {Boolean} enableExpressErrorHandler Enables the default express error handler for all errors
 * @property {Boolean} enableInsecureAuthAdapters Enable (or disable) insecure auth adapters, defaults to true. Insecure auth adapters are deprecated and it is recommended to disable them.
 * @property {Boolean} encodeParseObjectInCloudFunction If set to `true`, a `Parse.Object` that is in the payload when calling a Cloud Function will be converted to an instance of `Parse.Object`. If `false`, the object will not be converted and instead be a plain JavaScript object, which contains the raw data of a `Parse.Object` but is not an actual instance of `Parse.Object`. Default is `false`. <br><br>ℹ️ The expected behavior would be that the object is converted to an instance of `Parse.Object`, so you would normally set this option to `true`. The default is `false` because this is a temporary option that has been introduced to avoid a breaking change when fixing a bug where JavaScript objects are not converted to actual instances of `Parse.Object`.
 * @property {String} encryptionKey Key for encrypting your files
 * @property {Boolean} enforcePrivateUsers Set to true if new users should be created without public read and write access.
 * @property {Boolean} expireInactiveSessions Sets whether we should expire the inactive sessions, defaults to true. If false, all new sessions are created with no expiration date.
 * @property {Boolean} extendSessionOnUse Whether Parse Server should automatically extend a valid session by the sessionLength. In order to reduce the number of session updates in the database, a session will only be extended when a request is received after at least half of the current session's lifetime has passed.
 * @property {String} fileKey Key for your files
 * @property {Adapter<FilesAdapter>} filesAdapter Adapter module for the files sub-system
 * @property {FileUploadOptions} fileUpload Options for file uploads
 * @property {String} graphQLPath Mount path for the GraphQL endpoint, defaults to /graphql
 * @property {String} graphQLSchema Full path to your GraphQL custom schema.graphql file
 * @property {String} host The host to serve ParseServer on, defaults to 0.0.0.0
 * @property {IdempotencyOptions} idempotencyOptions Options for request idempotency to deduplicate identical requests that may be caused by network issues. Caution, this is an experimental feature that may not be appropriate for production.
 * @property {String} javascriptKey Key for the Javascript SDK
 * @property {Boolean} jsonLogs Log as structured JSON objects
 * @property {LiveQueryOptions} liveQuery parse-server's LiveQuery configuration object
 * @property {LiveQueryServerOptions} liveQueryServerOptions Live query server configuration options (will start the liveQuery server)
 * @property {Adapter<LoggerAdapter>} loggerAdapter Adapter module for the logging sub-system
 * @property {String} logLevel Sets the level for logs
 * @property {LogLevels} logLevels (Optional) Overrides the log levels used internally by Parse Server to log events.
 * @property {String} logsFolder Folder for the logs (defaults to './logs'); set to null to disable file based logging
 * @property {String} maintenanceKey (Optional) The maintenance key is used for modifying internal and read-only fields of Parse Server.<br><br>⚠️ This key is not intended to be used as part of a regular operation of Parse Server. This key is intended to conduct out-of-band changes such as one-time migrations or data correction tasks. Internal fields are not officially documented and may change at any time without publication in release changelogs. We strongly advice not to rely on internal fields as part of your regular operation and to investigate the implications of any planned changes *directly in the source code* of your current version of Parse Server.
 * @property {String[]} maintenanceKeyIps (Optional) Restricts the use of maintenance key permissions to a list of IP addresses or ranges.<br><br>This option accepts a list of single IP addresses, for example `['10.0.0.1', '10.0.0.2']`. You can also use CIDR notation to specify an IP address range, for example `['10.0.1.0/24']`.<br><br><b>Special scenarios:</b><br>- Setting an empty array `[]` means that the maintenance key cannot be used even in Parse Server Cloud Code. This value cannot be set via an environment variable as there is no way to pass an empty array to Parse Server via an environment variable.<br>- Setting `['0.0.0.0/0', '::0']` means to allow any IPv4 and IPv6 address to use the maintenance key and effectively disables the IP filter.<br><br><b>Considerations:</b><br>- IPv4 and IPv6 addresses are not compared against each other. Each IP version (IPv4 and IPv6) needs to be considered separately. For example, `['0.0.0.0/0']` allows any IPv4 address and blocks every IPv6 address. Conversely, `['::0']` allows any IPv6 address and blocks every IPv4 address.<br>- Keep in mind that the IP version in use depends on the network stack of the environment in which Parse Server runs. A local environment may use a different IP version than a remote environment. For example, it's possible that locally the value `['0.0.0.0/0']` allows the request IP because the environment is using IPv4, but when Parse Server is deployed remotely the request IP is blocked because the remote environment is using IPv6.<br>- When setting the option via an environment variable the notation is a comma-separated string, for example `"0.0.0.0/0,::0"`.<br>- IPv6 zone indices (`%` suffix) are not supported, for example `fe80::1%eth0`, `fe80::1%1` or `::1%lo`.<br><br>Defaults to `['127.0.0.1', '::1']` which means that only `localhost`, the server instance on which Parse Server runs, is allowed to use the maintenance key.
 * @property {Union} masterKey Your Parse Master Key
 * @property {String[]} masterKeyIps (Optional) Restricts the use of master key permissions to a list of IP addresses or ranges.<br><br>This option accepts a list of single IP addresses, for example `['10.0.0.1', '10.0.0.2']`. You can also use CIDR notation to specify an IP address range, for example `['10.0.1.0/24']`.<br><br><b>Special scenarios:</b><br>- Setting an empty array `[]` means that the master key cannot be used even in Parse Server Cloud Code. This value cannot be set via an environment variable as there is no way to pass an empty array to Parse Server via an environment variable.<br>- Setting `['0.0.0.0/0', '::0']` means to allow any IPv4 and IPv6 address to use the master key and effectively disables the IP filter.<br><br><b>Considerations:</b><br>- IPv4 and IPv6 addresses are not compared against each other. Each IP version (IPv4 and IPv6) needs to be considered separately. For example, `['0.0.0.0/0']` allows any IPv4 address and blocks every IPv6 address. Conversely, `['::0']` allows any IPv6 address and blocks every IPv4 address.<br>- Keep in mind that the IP version in use depends on the network stack of the environment in which Parse Server runs. A local environment may use a different IP version than a remote environment. For example, it's possible that locally the value `['0.0.0.0/0']` allows the request IP because the environment is using IPv4, but when Parse Server is deployed remotely the request IP is blocked because the remote environment is using IPv6.<br>- When setting the option via an environment variable the notation is a comma-separated string, for example `"0.0.0.0/0,::0"`.<br>- IPv6 zone indices (`%` suffix) are not supported, for example `fe80::1%eth0`, `fe80::1%1` or `::1%lo`.<br><br>Defaults to `['127.0.0.1', '::1']` which means that only `localhost`, the server instance on which Parse Server runs, is allowed to use the master key.
 * @property {Number} masterKeyTtl (Optional) The duration in seconds for which the current `masterKey` is being used before it is requested again if `masterKey` is set to a function. If `masterKey` is not set to a function, this option has no effect. Default is `0`, which means the master key is requested by invoking the  `masterKey` function every time the master key is used internally by Parse Server.
 * @property {Number} maxLimit Max value for limit option on queries, defaults to unlimited
 * @property {Number|String} maxLogFiles Maximum number of logs to keep. If not set, no logs will be removed. This can be a number of files or number of days. If using days, add 'd' as the suffix. (default: null)
 * @property {String} maxUploadSize Max file size for uploads, defaults to 20mb
 * @property {Union} middleware middleware for express server, can be string or function
 * @property {Boolean} mountGraphQL Mounts the GraphQL endpoint
 * @property {String} mountPath Mount path for the server, defaults to /parse
 * @property {Boolean} mountPlayground Mounts the GraphQL Playground - never use this option in production
 * @property {Number} objectIdSize Sets the number of characters in generated object id's, default 10
 * @property {PagesOptions} pages The options for pages such as password reset and email verification.
 * @property {PasswordPolicyOptions} passwordPolicy The password policy for enforcing password related rules.
 * @property {String} playgroundPath Mount path for the GraphQL Playground, defaults to /playground
 * @property {Number} port The port to run the ParseServer, defaults to 1337.
 * @property {Boolean} preserveFileName Enable (or disable) the addition of a unique hash to the file names
 * @property {Boolean} preventLoginWithUnverifiedEmail Set to `true` to prevent a user from logging in if the email has not yet been verified and email verification is required.<br><br>Default is `false`.<br>Requires option `verifyUserEmails: true`.
 * @property {Boolean} preventSignupWithUnverifiedEmail If set to `true` it prevents a user from signing up if the email has not yet been verified and email verification is required. In that case the server responds to the sign-up with HTTP status 400 and a Parse Error 205 `EMAIL_NOT_FOUND`. If set to `false` the server responds with HTTP status 200, and client SDKs return an unauthenticated Parse User without session token. In that case subsequent requests fail until the user's email address is verified.<br><br>Default is `false`.<br>Requires option `verifyUserEmails: true`.
 * @property {ProtectedFields} protectedFields Protected fields that should be treated with extra security when fetching details.
 * @property {String} publicServerURL Public URL to your parse server with http:// or https://.
 * @property {Any} push Configuration for push, as stringified JSON. See http://docs.parseplatform.org/parse-server/guide/#push-notifications
 * @property {RateLimitOptions[]} rateLimit Options to limit repeated requests to Parse Server APIs. This can be used to protect sensitive endpoints such as `/requestPasswordReset` from brute-force attacks or Parse Server as a whole from denial-of-service (DoS) attacks.<br><br>ℹ️ Mind the following limitations:<br>- rate limits applied per IP address; this limits protection against distributed denial-of-service (DDoS) attacks where many requests are coming from various IP addresses<br>- if multiple Parse Server instances are behind a load balancer or ran in a cluster, each instance will calculate it's own request rates, independent from other instances; this limits the applicability of this feature when using a load balancer and another rate limiting solution that takes requests across all instances into account may be more suitable<br>- this feature provides basic protection against denial-of-service attacks, but a more sophisticated solution works earlier in the request flow and prevents a malicious requests to even reach a server instance; it's therefore recommended to implement a solution according to architecture and user case.
 * @property {String} readOnlyMasterKey Read-only key, which has the same capabilities as MasterKey without writes
 * @property {RequestKeywordDenylist[]} requestKeywordDenylist An array of keys and values that are prohibited in database read and write requests to prevent potential security vulnerabilities. It is possible to specify only a key (`{"key":"..."}`), only a value (`{"value":"..."}`) or a key-value pair (`{"key":"...","value":"..."}`). The specification can use the following types: `boolean`, `numeric` or `string`, where `string` will be interpreted as a regex notation. Request data is deep-scanned for matching definitions to detect also any nested occurrences. Defaults are patterns that are likely to be used in malicious requests. Setting this option will override the default patterns.
 * @property {String} restAPIKey Key for REST calls
 * @property {Boolean} revokeSessionOnPasswordReset When a user changes their password, either through the reset password email or while logged in, all sessions are revoked if this is true. Set to false if you don't want to revoke sessions.
 * @property {Boolean} scheduledPush Configuration for push scheduling, defaults to false.
 * @property {SchemaOptions} schema Defined schema
 * @property {SecurityOptions} security The security options to identify and report weak security settings.
 * @property {Boolean} sendUserEmailVerification Set to `false` to prevent sending of verification email. Supports a function with a return value of `true` or `false` for conditional email sending.<br><br>Default is `true`.<br>
 * @property {Function} serverCloseComplete Callback when server has closed
 * @property {String} serverURL URL to your parse server with http:// or https://.
 * @property {Number} sessionLength Session duration, in seconds, defaults to 1 year
 * @property {Boolean} silent Disables console output
 * @property {Boolean} startLiveQueryServer Starts the liveQuery server
 * @property {Any} trustProxy The trust proxy settings. It is important to understand the exact setup of the reverse proxy, since this setting will trust values provided in the Parse Server API request. See the <a href="https://expressjs.com/en/guide/behind-proxies.html">express trust proxy settings</a> documentation. Defaults to `false`.
 * @property {String[]} userSensitiveFields Personally identifiable information fields in the user table the should be removed for non-authorized users. Deprecated @see protectedFields
 * @property {Boolean} verbose Set the logging to verbose
 * @property {Boolean} verifyUserEmails Set to `true` to require users to verify their email address to complete the sign-up process. Supports a function with a return value of `true` or `false` for conditional verification.<br><br>Default is `false`.
 * @property {String} webhookKey Key sent with outgoing webhook calls
 */

/**
 * @interface RateLimitOptions
 * @property {String} errorResponseMessage The error message that should be returned in the body of the HTTP 429 response when the rate limit is hit. Default is `Too many requests.`.
 * @property {Boolean} includeInternalRequests Optional, if `true` the rate limit will also apply to requests that are made in by Cloud Code, default is `false`. Note that a public Cloud Code function that triggers internal requests may circumvent rate limiting and be vulnerable to attacks.
 * @property {Boolean} includeMasterKey Optional, if `true` the rate limit will also apply to requests using the `masterKey`, default is `false`. Note that a public Cloud Code function that triggers internal requests using the `masterKey` may circumvent rate limiting and be vulnerable to attacks.
 * @property {String} redisUrl Optional, the URL of the Redis server to store rate limit data. This allows to rate limit requests for multiple servers by calculating the sum of all requests across all servers. This is useful if multiple servers are processing requests behind a load balancer. For example, the limit of 10 requests is reached if each of 2 servers processed 5 requests.
 * @property {Number} requestCount The number of requests that can be made per IP address within the time window set in `requestTimeWindow` before the rate limit is applied.
 * @property {String[]} requestMethods Optional, the HTTP request methods to which the rate limit should be applied, default is all methods.
 * @property {String} requestPath The path of the API route to be rate limited. Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expression. See: https://expressjs.com/en/guide/routing.html
 * @property {Number} requestTimeWindow The window of time in milliseconds within which the number of requests set in `requestCount` can be made before the rate limit is applied.
 * @property {String} zone The type of rate limit to apply. The following types are supported:<br><br>- `global`: rate limit based on the number of requests made by all users <br>- `ip`: rate limit based on the IP address of the request <br>- `user`: rate limit based on the user ID of the request <br>- `session`: rate limit based on the session token of the request <br><br><br>:default: 'ip'
 */

/**
 * @interface SecurityOptions
 * @property {CheckGroup[]} checkGroups The security check groups to run. This allows to add custom security checks or override existing ones. Default are the groups defined in `CheckGroups.js`.
 * @property {Boolean} enableCheck Is true if Parse Server should check for weak security settings.
 * @property {Boolean} enableCheckLog Is true if the security check report should be written to logs. This should only be enabled temporarily to not expose weak security settings in logs.
 */

/**
 * @interface PagesOptions
 * @property {PagesRoute[]} customRoutes The custom routes.
 * @property {PagesCustomUrlsOptions} customUrls The URLs to the custom pages.
 * @property {Boolean} enableLocalization Is true if pages should be localized; this has no effect on custom page redirects.
 * @property {Boolean} enableRouter Is true if the pages router should be enabled; this is required for any of the pages options to take effect.
 * @property {Boolean} forceRedirect Is true if responses should always be redirects and never content, false if the response type should depend on the request type (GET request -> content response; POST request -> redirect response).
 * @property {String} localizationFallbackLocale The fallback locale for localization if no matching translation is provided for the given locale. This is only relevant when providing translation resources via JSON file.
 * @property {String} localizationJsonPath The path to the JSON file for localization; the translations will be used to fill template placeholders according to the locale.
 * @property {String} pagesEndpoint The API endpoint for the pages. Default is 'apps'.
 * @property {String} pagesPath The path to the pages directory; this also defines where the static endpoint '/apps' points to. Default is the './public/' directory.
 * @property {Object} placeholders The placeholder keys and values which will be filled in pages; this can be a simple object or a callback function.
 */

/**
 * @interface PagesRoute
 * @property {Function} handler The route handler that is an async function.
 * @property {String} method The route method, e.g. 'GET' or 'POST'.
 * @property {String} path The route path.
 */

/**
 * @interface PagesCustomUrlsOptions
 * @property {String} emailVerificationLinkExpired The URL to the custom page for email verification -> link expired.
 * @property {String} emailVerificationLinkInvalid The URL to the custom page for email verification -> link invalid.
 * @property {String} emailVerificationSendFail The URL to the custom page for email verification -> link send fail.
 * @property {String} emailVerificationSendSuccess The URL to the custom page for email verification -> resend link -> success.
 * @property {String} emailVerificationSuccess The URL to the custom page for email verification -> success.
 * @property {String} passwordReset The URL to the custom page for password reset.
 * @property {String} passwordResetLinkInvalid The URL to the custom page for password reset -> link invalid.
 * @property {String} passwordResetSuccess The URL to the custom page for password reset -> success.
 */

/**
 * @interface CustomPagesOptions
 * @property {String} choosePassword choose password page path
 * @property {String} expiredVerificationLink expired verification link page path
 * @property {String} invalidLink invalid link page path
 * @property {String} invalidPasswordResetLink invalid password reset link page path
 * @property {String} invalidVerificationLink invalid verification link page path
 * @property {String} linkSendFail verification link send fail page path
 * @property {String} linkSendSuccess verification link send success page path
 * @property {String} parseFrameURL for masking user-facing pages
 * @property {String} passwordResetSuccess password reset success page path
 * @property {String} verifyEmailSuccess verify email success page path
 */

/**
 * @interface LiveQueryOptions
 * @property {String[]} classNames parse-server's LiveQuery classNames
 * @property {Adapter<PubSubAdapter>} pubSubAdapter LiveQuery pubsub adapter
 * @property {Any} redisOptions parse-server's LiveQuery redisOptions
 * @property {String} redisURL parse-server's LiveQuery redisURL
 * @property {Adapter<WSSAdapter>} wssAdapter Adapter module for the WebSocketServer
 */

/**
 * @interface LiveQueryServerOptions
 * @property {String} appId This string should match the appId in use by your Parse Server. If you deploy the LiveQuery server alongside Parse Server, the LiveQuery server will try to use the same appId.
 * @property {Number} cacheTimeout Number in milliseconds. When clients provide the sessionToken to the LiveQuery server, the LiveQuery server will try to fetch its ParseUser's objectId from parse server and store it in the cache. The value defines the duration of the cache. Check the following Security section and our protocol specification for details, defaults to 5 * 1000 ms (5 seconds).
 * @property {Any} keyPairs A JSON object that serves as a whitelist of keys. It is used for validating clients when they try to connect to the LiveQuery server. Check the following Security section and our protocol specification for details.
 * @property {String} logLevel This string defines the log level of the LiveQuery server. We support VERBOSE, INFO, ERROR, NONE, defaults to INFO.
 * @property {String} masterKey This string should match the masterKey in use by your Parse Server. If you deploy the LiveQuery server alongside Parse Server, the LiveQuery server will try to use the same masterKey.
 * @property {Number} port The port to run the LiveQuery server, defaults to 1337.
 * @property {Adapter<PubSubAdapter>} pubSubAdapter LiveQuery pubsub adapter
 * @property {Any} redisOptions parse-server's LiveQuery redisOptions
 * @property {String} redisURL parse-server's LiveQuery redisURL
 * @property {String} serverURL This string should match the serverURL in use by your Parse Server. If you deploy the LiveQuery server alongside Parse Server, the LiveQuery server will try to use the same serverURL.
 * @property {Number} websocketTimeout Number of milliseconds between ping/pong frames. The WebSocket server sends ping/pong frames to the clients to keep the WebSocket alive. This value defines the interval of the ping/pong frame from the server to clients, defaults to 10 * 1000 ms (10 s).
 * @property {Adapter<WSSAdapter>} wssAdapter Adapter module for the WebSocketServer
 */

/**
 * @interface IdempotencyOptions
 * @property {String[]} paths An array of paths for which the feature should be enabled. The mount path must not be included, for example instead of `/parse/functions/myFunction` specifiy `functions/myFunction`. The entries are interpreted as regular expression, for example `functions/.*` matches all functions, `jobs/.*` matches all jobs, `classes/.*` matches all classes, `.*` matches all paths.
 * @property {Number} ttl The duration in seconds after which a request record is discarded from the database, defaults to 300s.
 */

/**
 * @interface AccountLockoutOptions
 * @property {Number} duration Set the duration in minutes that a locked-out account remains locked out before automatically becoming unlocked.<br><br>Valid values are greater than `0` and less than `100000`.
 * @property {Number} threshold Set the number of failed sign-in attempts that will cause a user account to be locked. If the account is locked. The account will unlock after the duration set in the `duration` option has passed and no further login attempts have been made.<br><br>Valid values are greater than `0` and less than `1000`.
 * @property {Boolean} unlockOnPasswordReset Set to `true`  if the account should be unlocked after a successful password reset.<br><br>Default is `false`.<br>Requires options `duration` and `threshold` to be set.
 */

/**
 * @interface PasswordPolicyOptions
 * @property {Boolean} doNotAllowUsername Set to `true` to disallow the username as part of the password.<br><br>Default is `false`.
 * @property {Number} maxPasswordAge Set the number of days after which a password expires. Login attempts fail if the user does not reset the password before expiration.
 * @property {Number} maxPasswordHistory Set the number of previous password that will not be allowed to be set as new password. If the option is not set or set to `0`, no previous passwords will be considered.<br><br>Valid values are >= `0` and <= `20`.<br>Default is `0`.
 * @property {Boolean} resetPasswordSuccessOnInvalidEmail Set to `true` if a request to reset the password should return a success response even if the provided email address is invalid, or `false` if the request should return an error response if the email address is invalid.<br><br>Default is `true`.
 * @property {Boolean} resetTokenReuseIfValid Set to `true` if a password reset token should be reused in case another token is requested but there is a token that is still valid, i.e. has not expired. This avoids the often observed issue that a user requests multiple emails and does not know which link contains a valid token because each newly generated token would invalidate the previous token.<br><br>Default is `false`.
 * @property {Number} resetTokenValidityDuration Set the validity duration of the password reset token in seconds after which the token expires. The token is used in the link that is set in the email. After the token expires, the link becomes invalid and a new link has to be sent. If the option is not set or set to `undefined`, then the token never expires.<br><br>For example, to expire the token after 2 hours, set a value of 7200 seconds (= 60 seconds * 60 minutes * 2 hours).<br><br>Default is `undefined`.
 * @property {String} validationError Set the error message to be sent.<br><br>Default is `Password does not meet the Password Policy requirements.`
 * @property {Function} validatorCallback Set a callback function to validate a password to be accepted.<br><br>If used in combination with `validatorPattern`, the password must pass both to be accepted.
 * @property {String} validatorPattern Set the regular expression validation pattern a password must match to be accepted.<br><br>If used in combination with `validatorCallback`, the password must pass both to be accepted.
 */

/**
 * @interface FileUploadOptions
 * @property {Boolean} enableForAnonymousUser Is true if file upload should be allowed for anonymous users.
 * @property {Boolean} enableForAuthenticatedUser Is true if file upload should be allowed for authenticated users.
 * @property {Boolean} enableForPublic Is true if file upload should be allowed for anyone, regardless of user authentication.
 * @property {String[]} fileExtensions Sets the allowed file extensions for uploading files. The extension is defined as an array of file extensions, or a regex pattern.<br><br>It is recommended to restrict the file upload extensions as much as possible. HTML files are especially problematic as they may be used by an attacker who uploads a HTML form to look legitimate under your app's domain name, or to compromise the session token of another user via accessing the browser's local storage.<br><br>Defaults to `^(?!(h|H)(t|T)(m|M)(l|L)?$)` which allows any file extension except HTML files.
 */

/**
 * @interface DatabaseOptions
 * @property {Boolean} autoSelectFamily The MongoDB driver option to set whether the socket attempts to connect to IPv6 and IPv4 addresses until a connection is established. If available, the driver will select the first IPv6 address.
 * @property {Number} autoSelectFamilyAttemptTimeout The MongoDB driver option to specify the amount of time in milliseconds to wait for a connection attempt to finish before trying the next address when using the autoSelectFamily option. If set to a positive integer less than 10, the value 10 is used instead.
 * @property {Number} connectTimeoutMS The MongoDB driver option to specify the amount of time, in milliseconds, to wait to establish a single TCP socket connection to the server before raising an error. Specifying 0 disables the connection timeout.
 * @property {Boolean} enableSchemaHooks Enables database real-time hooks to update single schema cache. Set to `true` if using multiple Parse Servers instances connected to the same database. Failing to do so will cause a schema change to not propagate to all instances and re-syncing will only happen when the instances restart. To use this feature with MongoDB, a replica set cluster with [change stream](https://docs.mongodb.com/manual/changeStreams/#availability) support is required.
 * @property {Number} maxPoolSize The MongoDB driver option to set the maximum number of opened, cached, ready-to-use database connections maintained by the driver.
 * @property {Number} maxStalenessSeconds The MongoDB driver option to set the maximum replication lag for reads from secondary nodes.
 * @property {Number} maxTimeMS The MongoDB driver option to set a cumulative time limit in milliseconds for processing operations on a cursor.
 * @property {Number} minPoolSize The MongoDB driver option to set the minimum number of opened, cached, ready-to-use database connections maintained by the driver.
 * @property {Boolean} retryWrites The MongoDB driver option to set whether to retry failed writes.
 * @property {Number} schemaCacheTtl The duration in seconds after which the schema cache expires and will be refetched from the database. Use this option if using multiple Parse Servers instances connected to the same database. A low duration will cause the schema cache to be updated too often, causing unnecessary database reads. A high duration will cause the schema to be updated too rarely, increasing the time required until schema changes propagate to all server instances. This feature can be used as an alternative or in conjunction with the option `enableSchemaHooks`. Default is infinite which means the schema cache never expires.
 * @property {Number} socketTimeoutMS The MongoDB driver option to specify the amount of time, in milliseconds, spent attempting to send or receive on a socket before timing out. Specifying 0 means no timeout.
 */

/**
 * @interface AuthAdapter
 * @property {Boolean} enabled Is `true` if the auth adapter is enabled, `false` otherwise.
 */

/**
 * @interface LogLevels
 * @property {String} cloudFunctionError Log level used by the Cloud Code Functions on error. Default is `error`.
 * @property {String} cloudFunctionSuccess Log level used by the Cloud Code Functions on success. Default is `info`.
 * @property {String} triggerAfter Log level used by the Cloud Code Triggers `afterSave`, `afterDelete`, `afterFind`, `afterLogout`. Default is `info`.
 * @property {String} triggerBeforeError Log level used by the Cloud Code Triggers `beforeSave`, `beforeDelete`, `beforeFind`, `beforeLogin` on error. Default is `error`.
 * @property {String} triggerBeforeSuccess Log level used by the Cloud Code Triggers `beforeSave`, `beforeDelete`, `beforeFind`, `beforeLogin` on success. Default is `info`.
 */
