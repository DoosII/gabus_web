var firebaseConfig = {
  apiKey: 'AIzaSyAlgoHUaXw1sX1bmiIQFnwny1-jzhW3Yn0',
  authDomain: 'track-course.firebaseapp.com',
  projectId: 'track-course',
  storageBucket: 'track-course.appspot.com',
  messagingSenderId: '399770937681',
  appId: '1:399770937681:web:92c57327304c1b4cfa4b70',
};
firebase.initializeApp(firebaseConfig);
// References for Auth, Firestore
const auth = firebase.auth();
const database = firebase.database();

// FIREBASE NOT MINE
function register() {
  email = document.getElementById('signup-email').value;
  company_name = document.getElementById('signup-companyname').value;
  name_of_manager = document.getElementById('signup-managername').value;
  company_phone_number = document.getElementById('signup-phonenumber').value;
  password = document.getElementById('signup-password').value;
  confirmpassword = document.getElementById('signup-confirmpassword').value;

  // // Validate input fields
  // if (validate_email(email) == false || validate_password(password) == false) {
  //   alert('Email or Password is Outta Line!!');
  //   return;
  //   // Don't continue running the code
  // }
  // if (
  //   validate_field(company_name) == false ||
  //   validate_field(name_of_manager) == false ||
  //   validate_field(company_phone_number) == false
  // ) {
  //   alert('One or More Extra Fields is Outta Line!!');
  //   return;
  // }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
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

      if (password != confirmpassword) {
      }

      // DOne
      alert('User Created!!');
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      // alert(error_message);
    });
}
// END OF FIREBASE NOT MINE

// Set up our login function
// function login() {
//   // Get all our input fields
//   email = document.getElementById('email').value;
//   password = document.getElementById('password').value;

//   // Validate input fields
//   if (validate_email(email) == false || validate_password(password) == false) {
//     alert('Email or Password is Outta Line!!');
//     return;
//     // Don't continue running the code
//   }

//   auth
//     .signInWithEmailAndPassword(email, password)
//     .then(function () {
//       // Declare user variable
//       var user = auth.currentUser;

//       // Add this user to Firebase Database
//       var database_ref = database.ref();

//       // Create User data
//       var user_data = {
//         last_login: Date.now(),
//       };

//       // Push to Firebase Database
//       database_ref.child('users/' + user.uid).update(user_data);

//       // DOne
//       alert('User Logged In!!');
//     })
//     .catch(function (error) {
//       // Firebase will use this to alert of its errors
//       var error_code = error.code;
//       var error_message = error.message;

//       alert(error_message);
//     });
// }

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
