import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = admin.initializeApp();
const auth = getAuth(app);

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`,
      };
    })
    .catch((err) => {
      return err;
    });
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });
