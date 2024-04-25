importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyAHZq4qhOqAL_Bv9s14Ucu3XgiafdGiWnw",
    authDomain: "pwa-kod.firebaseapp.com",
    projectId: "pwa-kod",
    storageBucket: "pwa-kod.appspot.com",
    messagingSenderId: "633133019616",
    appId: "1:633133019616:web:f19dd74669d803083abb85",
    measurementId: "G-CLJR42XRWN"
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Получено уведомление:', payload);
    
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon ?? null
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});