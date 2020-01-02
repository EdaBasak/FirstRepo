async function changeForm() {
  var loginDiv = document.getElementById("loginDiv");
  var seatDiv = document.getElementById("seatDiv");
  loginDiv.animate([
    // keyframes
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-50px)' },
  ], {
    // timing options
    duration: 200,
    iterations: 1
  });
  loginDiv.animate([
    // keyframes
    { opacity: 1 },
    { opacity: 0 },
  ], {
    // timing options
    duration: 200,
    iterations: 1
  });
  await new Promise(r => setTimeout(r, 200));
  loginDiv.style.display = "none";
  seatDiv.style.display = "block";
  seatDiv.animate([
    // keyframes
    { transform: 'translateY(-50px)' },
    { transform: 'translateY(0px)' }
  ], {
    // timing options
    duration: 500,
    iterations: 1
  });
  seatDiv.animate([
    // keyframes
    { opacity: 0 },
    { opacity: 1 }
  ], {
    // timing options
    duration: 500,
    iterations: 1
  });
  seatOccupancy(80);
}

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

const emailAdress = document.body.getElementsByClassName("input100")[1]
const names = document.body.getElementsByClassName("input100")[0]
const submit_btn = document.body.getElementsByClassName("login100-form-btn")[0]
//Create referans (Realtime Database e veri aktarmak için)
const nameRef = firebase.database().ref().child('name_surname');
//oluşturulan maillerin ad soyadla yan yana eşleşmesi için firebase
//yerine nameRef i veriyoruz
const mailRef = nameRef.child('email');
//Realtime Database değitirildiği anda verileri okumak için
nameRef.on('value', snap => {
  name_surname.innerText = JSON.stringify(snap.value, null, 3);
});
nameRef.on('value', snap => console.log(snap.val()));

nameRef.on('child_added', snap => {
  const mails = document.createElement('mails');
  mails.innerText = snap.val();
  mails.id = snap.key;
});

async function submitClick() {
 await  changeForm(); 
  const isChecked = document.getElementById("check")
  if (isChecked.checked == true) {
    var name = names.value;
    var mail = emailAdress.value;
    console.log(name);
    console.log(mail);
    //window.alert("writeUserData work!");
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
  } else {
     window.alert("Please accept the terms!");
  }
   
  
 

}
function total(){
  var totalRecord;
  firebase.database().ref('users').on('value',(snap)=>{
    totalRecord =  snap.numChildren();
     console.log("Total Record : "+totalRecord);
   });
return totalRecord;
}
async function seatOccupancy(percentage) {
  var totalRecord;
  var filledSeatCount;
  firebase.database().ref('users').on('value',(snap)=>{
   totalRecord =  snap.numChildren();
    console.log("Total Record : "+totalRecord);
    filledSeatCount = Math.floor((totalRecord * 40) / 100);
  });

 
  var timeCo = 160 / percentage;
  var filledSeatCount = Math.floor((percentage * 40) / 100)
  var currentSeat = 0;
  var seatList = document.getElementById("seatList");
  var text = document.getElementById("parcentageText");
  for (let i = seatList.childElementCount - 1; i >= 0; i--) {
    for (let j = seatList.children[i].children[0].childElementCount * 2 - 1; j > 0; j -= 2) {
      if (currentSeat >= filledSeatCount) {
        break;
      }
      (seatList.children[i].children[0].childNodes[j].setAttribute('class', 'filledSeat'));
      await new Promise(r => setTimeout(r, 13 * timeCo));
      timeCo *= 1.08
      currentSeat++;
      text.innerText = "%" + Math.floor(currentSeat * 2.5);
    }
  }
}






