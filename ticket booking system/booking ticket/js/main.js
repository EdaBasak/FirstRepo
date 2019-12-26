
var name_surname=d = document.body.getElementsByClassName("input100")[0]
console.log(name_surname.value);
var email=document.body.getElementsByClassName("input100")[1]
var submit_btn=document.body.getElementsByClassName("login100-form-btn")[0]

function submitClick(){
  window.alert("submitClick work!");

  var firebaseRef=firebase.database().ref();
  var nameText=name_surname.value;
  var mailText=email.value;
  console.log(nameText);
  console.log(mailText);

  firebaseRef.child("Text").set(nameText);
  firebaseRef.child("Text").set(mailText);
  writeUserData();

}
function writeUserData() {
    window.alert("writeUserData work!");
  firebase.database().ref('users/' + nameText).set({
    username: nameText,
    email: mailText,

  });
  console.log(nameText);
  console.log(mailText);
}
