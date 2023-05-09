// Declared Names to move from section to section
const signUpPageLink = document.querySelector('#signup-page-link');
const loginPageLink = document.querySelector('#login-page-link');
const wrapper = document.querySelector('.wrapper');
// End of Code

// Declared Names for SignUp
const signUpEmail = document.querySelector('#signup-email');
const signUpCompanyName = document.querySelector('#signup-companyname');
const signUpManagerName = document.querySelector('#signup-managername');
const signUpCompanyPhoneNumber = document.querySelector('#signup-phonenumber');
const signUpPassword = document.querySelector('#signup-password');
const signUpConfirmPassword = document.querySelector('#signup-confirmpassword');
const signUpButton = document.querySelector('#signup-button');
// End of Declaration

// Declared Names for Login
const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');
const loginButton = document.querySelector('#login-button');
// End of Declaration

// SignOut Button
const signoutButton = document.querySelector('#signout-button');
//

// Error Warnings for Login and SignUp
const signUpWarning = document.querySelector('#signup-warning');
const loginWarning = document.querySelector('#login-warning');
// End of Code

loginPassword.addEventListener('input', checkLoginButton);
signUpPassword.addEventListener('input', checkSignUpButton);

signUpButton.addEventListener('input', checkSignUpButton);

function checkLoginButton() {
  if (loginPassword.value.length >= 6 && loginEmail.value != '') {
    loginButton.style.backgroundColor = '#0095f6';
  } else {
    loginButton.style.backgroundColor = '#bcdffc';
  }
}

function checkSignUpButton() {
  if (
    signUpPassword.value.length >= 6 &&
    signUpEmail.value != '' &&
    signUpCompanyName.value != '' &&
    signUpManagerName.value != '' &&
    signUpCompanyPhoneNumber.value != ''
  ) {
    signUpButton.disabled = false;
    signUpButton.style.backgroundColor = '#0095f6';
  } else {
    signUpButton.disabled = true;
    signUpButton.style.backgroundColor = '#bcdffc';
  }
}

// Move from  signup page to login page
signUpPageLink.addEventListener('click', function () {
  wrapper.style.top = '-100%';
});

loginPageLink.addEventListener('click', function () {
  wrapper.style.top = '0%';
});
// End Of Code

signUpButton.addEventListener('click', function () {
  signUpButton.innerText = 'Loading...';

  auth
    .createUserWithEmailAndPassword(signUpEmail.value, signUpPassword.value)
    .then((userCredential) => {
      signUpButton.innerText = 'Sign Up';

      // if (
      //   validate_field(company_name) == false ||
      //   validate_field(name_of_manager) == false ||
      //   validate_field(company_phone_number) == false
      // ) {
      //   alert('One or More Extra Fields is Outta Line!!');
      //   return;
      // }
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        Email: email,
        Company_Name: company_name,
        Name_of_Manager: name_of_manager,
        Company_Phone_Number: company_phone_number,
        Password: password,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);

      // DOne
      alert('User Created!!');
      // signUpButton.innerText = 'Sign Up';
      // var user = userCredential.user;
      // var currentUser = auth.currentUser;
      // currentUser.updateProfile({
      //   displayName: signUpManagerName.value,
      // });
      // console.log(user);
    })
    .catch((e) => {
      if (signUpEmail.value == '' || signUpEmail.value == null) {
        signUpWarning.innerText = 'Please Enter Email';
      } else if (
        signUpCompanyName.value == '' ||
        signUpCompanyName.value == null
      ) {
        signUpWarning.innerText = 'Please Enter Company Name';
      } else if (
        signUpManagerName.value == '' ||
        signUpManagerName.value == null
      ) {
        signUpWarning.innerText = 'Please Enter Name of Manager';
      } else if (
        signUpCompanyPhoneNumber.value == '' ||
        signUpCompanyPhoneNumber.value == null
      ) {
        signUpWarning.innerText = 'Please Enter Company Phone Number ';
      } else if (signUpPassword.value == '' || signUpPassword.value == null) {
        signUpWarning.innerText = 'Please Enter Password ';
      } else if (
        signUpConfirmPassword.value == '' ||
        signUpConfirmPassword.value == null
      ) {
        signUpWarning.innerText = 'Please Enter Confirm Password ';
      } else {
        signUpWarning.innerText = '';
      }

      signUpButton.innerText = 'Register';
      // signUpWarning.innerText = e.message;
      // signUpButton.innerText = 'Register';
      // signUpWarning.innerText = e.message;
      // console.log(e.message);
    });
});

loginButton.addEventListener('click', function () {
  let messages = [];
  loginButton.innerText = 'Loading...';
  auth
    .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then((e) => {
      loginButton.innerText = 'Loading...';
      alert('User Logged In!!');
    })
    .catch((e) => {
      if (loginEmail.value == '' || loginEmail.value == null) {
        loginWarning.innerText = 'Please Enter Email';
      } else {
        if (loginPassword.value == '' || loginPassword.value == null) {
          loginWarning.innerText = 'Please Enter Password';
        }
        loginWarning.innerText = e.message;
      }
      loginButton.innerText = 'Loading...';
      loginButton.innerText = 'Log in';
    });
});

signoutButton.addEventListener('click', function () {
  auth.signOut();
});

auth.onAuthStateChanged((user) => {
  signUpButton.innerText = 'Register';
  loginButton.innerText = 'Log in';
  loginWarning.innerText = '';
  signUpCompanyName.value = '';
  signUpManagerName.value = '';
  signUpCompanyPhoneNumber.value = '';
  signUpWarning.innerText = '';
  wrapper.style.top = '0';
  loginPassword.value = '';
  loginEmail.value = '';
  signUpPassword.value = '';
  signUpConfirmPassword.value = '';
  signUpEmail.value = '';
  if (user) {
    wrapper.style.display = 'none';
  } else {
    wrapper.style.display = 'block';
  }
});

function validate_field(field) {
  if (field == null) {
    return false;
  }
}

function SelectAllData() {
  firebase
    .database()
    .ref('tickets')
    .once('value', function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var busliner = CurrentRecord.val().BusLiner;
        var date = CurrentRecord.val().Date;
        var time = CurrentRecord.val().Time;
        var northorig = CurrentRecord.val().North_Origin;
        var northdes = CurrentRecord.val().North_Destination;
        var southorg = CurrentRecord.val().South_Origin;
        var southdes = CurrentRecord.val().South_Destination;
        var totalkilo = CurrentRecord.val().Total_Kilometer;
        var totalbill = CurrentRecord.val().Total_Bill;
        AddItemsToTable(
          busliner,
          date,
          time,
          northorig,
          northdes,
          southorg,
          southdes,
          totalkilo,
          totalbill
        );
      });
    });
}

window.onload = SelectAllData;

var stdNo = 0;
function AddItemsToTable(
  busliner,
  date,
  time,
  northorig,
  northdes,
  southorg,
  southdes,
  totalkilo,
  totalbill
) {
  var tbody = document.getElementById('tbody1');
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');
  var td7 = document.createElement('td');
  var td8 = document.createElement('td');
  var td9 = document.createElement('td');
  var td10 = document.createElement('td');

  td1.innerHTML = ++stdNo;
  td2.innerHTML = busliner;
  td3.innerHTML = date;
  td4.innerHTML = time;
  td5.innerHTML = northorig;
  td6.innerHTML = northdes;
  td7.innerHTML = southorg;
  td8.innerHTML = southdes;
  td9.innerHTML = totalkilo;
  td10.innerHTML = totalbill;
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(td7);
  trow.appendChild(td8);
  trow.appendChild(td9);
  trow.appendChild(td10);
  tbody.appendChild(trow);
}
