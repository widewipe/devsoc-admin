require("dotenv").config();
const admin = require("firebase-admin");

// const private_key = JSON.parse(process.env.PRIVATEKEY);

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: process.env.PROJECTID,
        private_key_id: process.env.PRIVATEKEYID,
        private_key: process.env.PRIVATEKEY.replace(/\\n/g, "\n"),
        client_email: process.env.CLIENTEMAIL,
        client_id: process.env.CLIENTID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.CLIENTCERTURL,
        universe_domain: "googleapis.com",
      }),
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID,
      appId: process.env.APPID,
      //   apiKey: "AIzaSyBtXvr-WlRomE7-py5k4ya6DufINS82IKw",
      // authDomain: "devsoc-52d8e.firebaseapp.com",
      // projectId: "devsoc-52d8e",
      // storageBucket: "devsoc-52d8e.appspot.com",
      // messagingSenderId: "486684213408",
      // appId: "1:486684213408:web:e2f1c27fc279f04c9109c5"
    });
  }

  const db = admin.firestore();
  db.settings({ ignoreUndefinedProperties: true });

  module.exports = { admin, db };
} catch (e) {
  console.error("Error initializing Firebase Admin SDK:", e);
}
