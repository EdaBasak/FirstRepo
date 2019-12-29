const config = {
  apiKey: "AIzaSyBQZwF7-VrcLrZJ2RYTxd_ghCNK1gfLyvs",
  authDomain: "ggk20-991b1.firebaseapp.com",
  databaseURL: "https://ggk20-991b1.firebaseio.com",
  projectId: "ggk20-991b1",
  storageBucket: "ggk20-991b1.appspot.com",
  messagingSenderId: "695934257815",
  appId: "1:695934257815:web:498f4e8c43af4028fef7d2",
  measurementId: "G-RPSE4722JB"
};
firebase.initializeApp(config);

const emailAdress=document.body.getElementsByClassName("input100")[1]
const names =  document.body.getElementsByClassName("input100")[0]
const submit_btn = document.body.getElementsByClassName("login100-form-btn")[0]
//Create referans (Realtime Database e veri aktarmak için)
const nameRef= firebase.database().ref().child('name_surname');
//oluşturulan maillerin ad soyadla yan yana eşleşmesi için firebase
//yerine nameRef i veriyoruz
const mailRef=nameRef.child('email');
//Realtime Database değitirildiği anda verileri okumak için
nameRef.on('value',snap=> {
  name_surname.innerText=JSON.stringify(snap.value,null,3);
});
nameRef.on('value',snap => console.log(snap.val()));

nameRef.on('child_added', snap => {
const mails= document.createElement('mails');
mails.innerText =snap.val();
mails.id=snap.key;
});

function submitClick(){
  const isChecked=document.getElementById("check")
  if(isChecked.checked==true){
    var name=names.value;
    var mail=emailAdress.value;
    console.log(name);
    console.log(mail);
    window.alert("writeUserData work!");
     
    firebase.database().ref('users/' + name).set({
      username: name,
      email: mail,
  
    });
   
  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('mails').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/users/' + newPostKey];
  updates['/user-mail/' + mail + '/' + newPostKey];
  
  return firebase.database().ref().update(updates);
  }else{
    window.alert("Please accept the terms!");
  }
  const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmailConfirmation = functions.database.ref('/Email_Message/{mailId}').onWrite(async (change) => {
  const snapshot = change.after;
  const val = snapshot.val();

  const mailOptions = {
    from: ' <edabasakerdogan@gmail.com>',
    to: val.email,
  };

  // Building Email message.
  mailOptions.subject = 'Dear ' + val.name;  //for example
  mailOptions.text = val.message;

  try {
    await mailTransport.sendMail(mailOptions);
    console.log('email sent to:', val.email);
  } catch(error) {
    console.error('There was an error while sending the email:', error);
  }
  return null;
});
}




