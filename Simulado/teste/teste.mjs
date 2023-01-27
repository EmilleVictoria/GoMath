
import {getDatabase} from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlf4r7aoGNjAkJWcW-JxtHtKTxqcgHovc",
  authDomain: "ppo-gomath.firebaseapp.com",
  projectId: "ppo-gomath",
  storageBucket: "ppo-gomath.appspot.com",
  messagingSenderId: "912435434450",
  appId: "1:912435434450:web:abe0af0fad236cddd0ae0b",
  measurementId: "G-0HG8CT24EW"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const firebase = getDatabase();

//var questions; 
  
    // questions.push(snapshot.val());
    // ref.get('value', (snapshot) => {
     //   snapshot.forEach((childSnapshot) => {
       //   var enunciado = childSnapshot.enunciado.val();
        //  var alt1 = hildSnapshot.alt1.val();
       //   var alt2 = hildSnapshot.alt2.val();
       //   var alt3 = hildSnapshot.alt3.val();
       //   var alt4 = hildSnapshot.alt4.val();
       //   var correta = hildSnapshot.correta.val();
       
      

  const dbRef = firebase.database().ref();
dbRef.child("Quetoes").child(userId).get().then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
        

        
