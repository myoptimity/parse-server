import { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import deepcopy from 'deepcopy';
import UsersRouter from '../../Routers/UsersRouter';
import * as objectsMutations from '../helpers/objectsMutations';
import { OBJECT } from './defaultGraphQLTypes';
import { getUserFromSessionToken } from './usersQueries';
import { transformTypes } from '../transformers/mutation';
import Parse from 'parse/node';

const usersRouter = new UsersRouter();

const load = parseGraphQLSchema => {
  if (parseGraphQLSchema.isUsersClassDisabled) {
    return;
  }

  const signUpMutation = mutationWithClientMutationId({
    name: 'SignUp',
    description: 'The signUp mutation can be used to create and sign up a new user.',
    inputFields: {
      fields: {
        descriptions: 'These are the fields of the new user to be created and signed up.',
        type: parseGraphQLSchema.parseClassTypes['_User'].classGraphQLCreateType,
      },
    },
    outputFields: {
      viewer: {
        description: 'This is the new user that was created, signed up and returned as a viewer.',
        type: new GraphQLNonNull(parseGraphQLSchema.viewerType),
      },
    },
    mutateAndGetPayload: async (args, context, mutationInfo) => {
      try {
        const { fields } = deepcopy(args);
        const { config, auth, info } = context;

        const parseFields = await transformTypes('create', fields, {
          className: '_User',
          parseGraphQLSchema,
          originalFields: args.fields,
          req: { config, auth, info },
        });

        const { sessionToken, objectId, authDataResponse } = await objectsMutations.createObject(
          '_User',
          parseFields,
          config,
          auth,
          info
        );

        context.info.sessionToken = sessionToken;
        const viewer = await getUserFromSessionToken(
          context,
          mutationInfo,
          'viewer.user.',
          objectId
        );
        if (authDataResponse && viewer.user) { viewer.user.authDataResponse = authDataResponse; }
        return {
          viewer,
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    },
  });

  parseGraphQLSchema.addGraphQLType(signUpMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(signUpMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('signUp', signUpMutation, true, true);
  const logInWithMutation = mutationWithClientMutationId({
    name: 'LogInWith',
    description:
      'The logInWith mutation can be used to signup, login user with 3rd party authentication system. This mutation create a user if the authData do not correspond to an existing one.',
    inputFields: {
      authData: {
        descriptions: 'This is the auth data of your custom auth provider',
        type: new GraphQLNonNull(OBJECT),
      },
      fields: {
        descriptions: 'These are the fields of the user to be created/updated and logged in.',
        type: new GraphQLInputObjectType({
          name: 'UserLoginWithInput',
          fields: () => {
            const classGraphQLCreateFields = parseGraphQLSchema.parseClassTypes[
              '_User'
            ].classGraphQLCreateType.getFields();
            return Object.keys(classGraphQLCreateFields).reduce((fields, fieldName) => {
              if (
                fieldName !== 'password' &&
                fieldName !== 'username' &&
                fieldName !== 'authData'
              ) {
                fields[fieldName] = classGraphQLCreateFields[fieldName];
              }
              return fields;
            }, {});
          },
        }),
      },
    },
    outputFields: {
      viewer: {
        description: 'This is the new user that was created, signed up and returned as a viewer.',
        type: new GraphQLNonNull(parseGraphQLSchema.viewerType),
      },
    },
    mutateAndGetPayload: async (args, context, mutationInfo) => {
      try {
        const { fields, authData } = deepcopy(args);
        const { config, auth, info } = context;

        const parseFields = await transformTypes('create', fields, {
          className: '_User',
          parseGraphQLSchema,
          originalFields: args.fields,
          req: { config, auth, info },
        });

        const { sessionToken, objectId, authDataResponse } = await objectsMutations.createObject(
          '_User',
          { ...parseFields, authData },
          config,
          auth,
          info
        );

        context.info.sessionToken = sessionToken;
        const viewer = await getUserFromSessionToken(
          context,
          mutationInfo,
          'viewer.user.',
          objectId
        );
        if (authDataResponse && viewer.user) { viewer.user.authDataResponse = authDataResponse; }
        return {
          viewer,
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    },
  });

  parseGraphQLSchema.addGraphQLType(logInWithMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(logInWithMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('logInWith', logInWithMutation, true, true);

  const logInMutation = mutationWithClientMutationId({
    name: 'LogIn',
    description: 'The logIn mutation can be used to log in an existing user.',
    inputFields: {
      username: {
        description: 'This is the username used to log in the user.',
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        description: 'This is the password used to log in the user.',
        type: new GraphQLNonNull(GraphQLString),
      },
      authData: {
        description: 'Auth data payload, needed if some required auth adapters are configured.',
        type: OBJECT,
      },
    },
    outputFields: {
      viewer: {
        description: 'This is the existing user that was logged in and returned as a viewer.',
        type: new GraphQLNonNull(parseGraphQLSchema.viewerType),
      },
    },
    mutateAndGetPayload: async (args, context, mutationInfo) => {
      try {
        const { username, password, authData } = deepcopy(args);
        const { config, auth, info } = context;

        const { sessionToken, objectId, authDataResponse } = (
          await usersRouter.handleLogIn({
            body: {
              username,
              password,
              authData,
            },
            query: {},
            config,
            auth,
            info,
          })
        ).response;

        context.info.sessionToken = sessionToken;

        const viewer = await getUserFromSessionToken(
          context,
          mutationInfo,
          'viewer.user.',
          objectId
        );
        if (authDataResponse && viewer.user) { viewer.user.authDataResponse = authDataResponse; }
        return {
          viewer,
        };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    },
  });

  parseGraphQLSchema.addGraphQLType(logInMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(logInMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('logIn', logInMutation, true, true);

  const logOutMutation = mutationWithClientMutationId({
    name: 'LogOut',
    description: 'The logOut mutation can be used to log out an existing user.',
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    mutateAndGetPayload: async (_args, context) => {
      try {
        const { config, auth, info } = context;

        await usersRouter.handleLogOut({
          config,
          auth,
          info,
        });

        return { ok: true };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    },
  });

  parseGraphQLSchema.addGraphQLType(logOutMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(logOutMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('logOut', logOutMutation, true, true);

  const resetPasswordMutation = mutationWithClientMutationId({
    name: 'ResetPassword',
    description:
      'The resetPassword mutation can be used to reset the password of an existing user.',
    inputFields: {
      email: {
        descriptions: 'Email of the user that should receive the reset email',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    mutateAndGetPayload: async ({ email }, context) => {
      const { config, auth, info } = context;

      await usersRouter.handleResetRequest({
        body: {
          email,
        },
        config,
        auth,
        info,
      });

      return { ok: true };
    },
  });

  parseGraphQLSchema.addGraphQLType(resetPasswordMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(resetPasswordMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('resetPassword', resetPasswordMutation, true, true);

  const confirmResetPasswordMutation = mutationWithClientMutationId({
    name: 'ConfirmResetPassword',
    description:
      'The confirmResetPassword mutation can be used to reset the password of an existing user.',
    inputFields: {
      username: {
        descriptions: 'Username of the user that have received the reset email',
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        descriptions: 'New password of the user',
        type: new GraphQLNonNull(GraphQLString),
      },
      token: {
        descriptions: 'Reset token that was emailed to the user',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    mutateAndGetPayload: async ({ password, token }, context) => {
      const { config } = context;
      if (!password) {
        throw new Parse.Error(Parse.Error.PASSWORD_MISSING, 'you must provide a password');
      }
      if (!token) {
        throw new Parse.Error(Parse.Error.OTHER_CAUSE, 'you must provide a token');
      }

      const userController = config.userController;
      await userController.updatePassword(token, password);
      return { ok: true };
    },
  });

  parseGraphQLSchema.addGraphQLType(
    confirmResetPasswordMutation.args.input.type.ofType,
    true,
    true
  );
  parseGraphQLSchema.addGraphQLType(confirmResetPasswordMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation(
    'confirmResetPassword',
    confirmResetPasswordMutation,
    true,
    true
  );

  const sendVerificationEmailMutation = mutationWithClientMutationId({
    name: 'SendVerificationEmail',
    description:
      'The sendVerificationEmail mutation can be used to send the verification email again.',
    inputFields: {
      email: {
        descriptions: 'Email of the user that should receive the verification email',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    outputFields: {
      ok: {
        description: "It's always true.",
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    },
    mutateAndGetPayload: async ({ email }, context) => {
      try {
        const { config, auth, info } = context;

        await usersRouter.handleVerificationEmailRequest({
          body: {
            email,
          },
          config,
          auth,
          info,
        });

        return { ok: true };
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    },
  });

  parseGraphQLSchema.addGraphQLType(
    sendVerificationEmailMutation.args.input.type.ofType,
    true,
    true
  );
  parseGraphQLSchema.addGraphQLType(sendVerificationEmailMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation(
    'sendVerificationEmail',
    sendVerificationEmailMutation,
    true,
    true
  );

  const challengeMutation = mutationWithClientMutationId({
    name: 'Challenge',
    description:
      'The challenge mutation can be used to initiate an authentication challenge when an auth adapter needs it.',
    inputFields: {
      username: {
        description: 'This is the username used to log in the user.',
        type: GraphQLString,
      },
      password: {
        description: 'This is the password used to log in the user.',
        type: GraphQLString,
      },
      authData: {
        description:
          'Auth data allow to preidentify the user if the auth adapter needs preidentification.',
        type: OBJECT,
      },
      challengeData: {
        description:
          'Challenge data payload, can be used to post data to auth providers to auth providers if they need data for the response.',
        type: OBJECT,
      },
    },
    outputFields: {
      challengeData: {
        description: 'Challenge response from configured auth adapters.',
        type: OBJECT,
      },
    },
    mutateAndGetPayload: async (input, context) => {
      try {
        const { config, auth, info } = context;

        const { response } = await usersRouter.handleChallenge({
          body: input,
          config,
          auth,
          info,
        });
        return response;
      } catch (e) {
        parseGraphQLSchema.handleError(e);
      }
    },
  });

  parseGraphQLSchema.addGraphQLType(challengeMutation.args.input.type.ofType, true, true);
  parseGraphQLSchema.addGraphQLType(challengeMutation.type, true, true);
  parseGraphQLSchema.addGraphQLMutation('challenge', challengeMutation, true, true);
};

export { load };
