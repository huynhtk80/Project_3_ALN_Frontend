import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = admin.initializeApp();
const auth = getAuth(app);

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add other admins' };
  }

  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, {
        ...user.customClaims,
        admin: true,
      });
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.deleteAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim

  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add creators' };
  }
  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      if (!user.customClaims) return;
      const updateClaims = user.customClaims;
      delete updateClaims?.admin;
      return auth.setCustomUserClaims(user.uid, updateClaims);
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.addCreatorRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add creators' };
  }
  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, {
        ...user.customClaims,
        creator: true,
      });
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.deleteCreatorRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim

  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add creators' };
  }
  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      if (!user.customClaims) return;
      const updateClaims = user.customClaims;
      delete updateClaims?.creator;
      return auth.setCustomUserClaims(user.uid, updateClaims);
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.addAdminRoleById = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add other admins' };
  }
  console.log('need to update this');
  return auth
    .getUser(data.uid)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, {
        ...user.customClaims,
        admin: true,
      });
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.deleteAdminRoleById = functions.https.onCall((data, context) => {
  // get user and add admin custom claim

  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add creators' };
  }
  return auth
    .getUser(data.uid)
    .then((user) => {
      if (!user.customClaims) return;
      const updateClaims = user.customClaims;
      delete updateClaims?.admin;
      return auth.setCustomUserClaims(user.uid, updateClaims);
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.addCreatorRoleById = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add creators' };
  }
  return auth
    .getUser(data.uid)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, {
        ...user.customClaims,
        creator: true,
      });
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.deleteCreatorRoleById = functions.https.onCall((data, context) => {
  // get user and add admin custom claim

  if (context.auth?.token.admin !== true) {
    return { error: 'only admins can add creators' };
  }
  return auth
    .getUser(data.uid)
    .then((user) => {
      if (!user.customClaims) return;
      const updateClaims = user.customClaims;
      delete updateClaims?.creator;
      return auth.setCustomUserClaims(user.uid, updateClaims);
    })
    .then(() => {
      return {
        message: 'success',
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.getUsersRoles = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  console.log(data);
  if (context.auth?.token.admin !== true) {
    return { error: 'only admins access this data' };
  }
  return (
    auth
      .getUsers(data)
      .then((usersResults) => {
        console.log(usersResults);
        const results = usersResults.users.map((user) => {
          return { DOC_ID: user.uid, roles: user.customClaims };
        });

        return results;
        // {
        //   data: usersResults.users.map((user) => {
        //     return { DOC_ID: user.uid, roles: user.customClaims };
        //   }),
        // };
      })
      // .then(() => {
      //   return {
      //     message: `Success! ${data.email} is no longer creator.`,
      //   };
      // })
      .catch((err) => {
        return err;
      })
  );
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
