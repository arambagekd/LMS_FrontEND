// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCp2eSQoYFYW6WfnKpM6LLwvNkzdjxOfT0",
  authDomain: "easylibro-a1e52.firebaseapp.com",
  projectId: "easylibro-a1e52",
  storageBucket: "easylibro-a1e52.appspot.com",
  messagingSenderId: "306141034466",
  appId: "1:306141034466:web:d3c5d6ccda7308449b6bbb",
  measurementId: "G-7LQRG3KYEM"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
