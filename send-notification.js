const firebaseConfig = {
    apiKey: "AIzaSyAHZq4qhOqAL_Bv9s14Ucu3XgiafdGiWnw",
    authDomain: "pwa-kod.firebaseapp.com",
    projectId: "pwa-kod",
    storageBucket: "pwa-kod.appspot.com",
    messagingSenderId: "633133019616",
    appId: "1:633133019616:web:f19dd74669d803083abb85",
    measurementId: "G-CLJR42XRWN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

document.getElementById("send_test_notification").addEventListener("click", async (event)=>{
    const tokens = (await (await fetch('https://script.google.com/macros/s/AKfycbwAYR3CUzT7TMrroAXVIzqhq5nxPbwnplisEsH4oj5piIy_VH1gqd0t8EqHM1PerU1ZMQ/exec')).json()).tokens

    for(let i = 0; i < tokens.length; i++){
        await fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
                'Authorization': 'Bearer AAAAk2mrMeA:APA91bGybtWFpN38IZUwY_-_G8Nyz4Om9mNR9-s5C7JfX7f8VSGxU_gb-ngXRfAcb5oeKNOeBqsW0Z27DBTJxUdQVPhM89wGunmXbOXJi0rAClxnaywBtjhyucKyPKoubAG2gTLEQH8w',
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'to': tokens[i].token,
                'notification': {
                    'title': "Test Push",
                    'body': document.getElementById("text").value
                }
            })
        });
    }
});