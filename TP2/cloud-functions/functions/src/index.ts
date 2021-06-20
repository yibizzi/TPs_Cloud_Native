import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

admin.initializeApp();
const db = admin.firestore();

export const getNarutoData = functions.https.onRequest((request, response) => {
  functions.logger.info("Naruto data demanded.");
  cors(request, response, () => {
    db.collection("test_data")
        .where("nom", "==", "naruto")
        .limit(1)
        .get()
        .then((doc) => {
          if (doc.empty) {
            console.log("No Documents for Naruto!");
            return response.send("Not found.");
          }
          const result = doc.docs.pop();
          console.log("Naruto found!");
          return response.send(result?.data());
        })
        .catch((error) => {
          console.log("Error retrieving Naruto.");
          console.error(error);
        });
  });
});
