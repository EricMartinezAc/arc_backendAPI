const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
var serviceAccount = require("./ise-arcproject-firebase-adminsdk-v81rb-fc2dc5dc11.json");
//const { async } = require('@firebase/database-types/node_modules/@firebase/util');

//creando propio servidor firebase
initializeApp({
    credential: cert(serviceAccount)
});
