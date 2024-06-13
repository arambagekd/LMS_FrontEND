// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCp2eSQoYFYW6WfnKpM6LLwvNkzdjxOfT0",
//   authDomain: "easylibro-a1e52.firebaseapp.com",
//   projectId: "easylibro-a1e52",
//   storageBucket: "easylibro-a1e52.appspot.com",
//   messagingSenderId: "306141034466",
//   appId: "1:306141034466:web:d3c5d6ccda7308449b6bbb",
//   measurementId: "G-7LQRG3KYEM"
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
// const analytics = getAnalytics(app);

// export const getFirebaseToken = async () => {
//   try {
//     const currentToken = await getToken(messaging, { vapidKey: "BLvGx9zZ5DTbRkTgk4SKT7awS9fTBQ_uMADWC6nBwxu6wPSr2I-RU1GRwpouhtKgPGZtZL00OxZcMYyC6XSUF50" });
//     if (currentToken) {
//         console.log('Firebase token:', currentToken);
//         return currentToken;
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//       }
//   } catch (error) {
//     return error;
//     console.error('An error occurred while retrieving token. ', error);
//   }
// };


// export const onMessageListener = () =>
//     new Promise((resolve) => {
//       onMessage(messaging, (payload) => {
//         console.log('Message received. ', payload);
  
//         // Display a notification if the browser supports notifications
//         if (Notification.permission === 'granted') {
//           const { title, body } = payload.notification;
//           new Notification(title, {
//             body,
//             icon: '/firebase-logo.png' // Customize this to your icon
//           });
//         }
  
//         resolve(payload);
//       });
//     });

// // export const onMessageListener = () =>
// //   new Promise((resolve) => {
// //     onMessage(messaging, (payload) => {
// //       resolve(payload);
// //     });
// //   });


// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCp2eSQoYFYW6WfnKpM6LLwvNkzdjxOfT0",
  authDomain: "easylibro-a1e52.firebaseapp.com",
  projectId: "easylibro-a1e52",
  storageBucket: "easylibro-a1e52.appspot.com",
  messagingSenderId: "306141034466",
  appId: "1:306141034466:web:d3c5d6ccda7308449b6bbb",
  measurementId: "G-7LQRG3KYEM"
};

let app;
let messaging;
let analytics;

if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
  analytics = getAnalytics(app);
}

export const getFirebaseToken = async () => {
  if (!messaging) return;

  try {
    const currentToken = await getToken(messaging, { vapidKey: "BLvGx9zZ5DTbRkTgk4SKT7awS9fTBQ_uMADWC6nBwxu6wPSr2I-RU1GRwpouhtKgPGZtZL00OxZcMYyC6XSUF50" });
    if (currentToken) {
      console.log('Firebase token:', currentToken);
      return currentToken;
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (error) {
    //console.error('An error occurred while retrieving token. ', error);
    return "no";
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);

      if (Notification.permission === 'granted') {
        const { title, body } = payload.notification;
        new Notification(title, {
          body,
          icon: '/firebase-logo.png' // Customize this to your icon
        });
      }

      resolve(payload);
    });
  });

