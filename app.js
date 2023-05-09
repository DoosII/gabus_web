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
  
  // SUMMARY OF TICKETS
  const SummTick = document.querySelector('#btn-confirm');
  const wrapper = document.querySelector('.wrapper');
  
  // Move from  signup page to login page
  
  function show2() {
    document.getElementById('div2').style.display = 'block';
    document.getElementById('div1').style.display = 'none';
    document.getElementById('div3').style.display = 'none';
  }
  
  function show1() {
    document.getElementById('div1').style.display = 'block';
    document.getElementById('div2').style.display = 'none';
    document.getElementById('div3').style.display = 'none';
  }
  
  function show3() {
    document.getElementById('div3').style.display = 'block';
    document.getElementById('div1').style.display = 'none';
  }
  
  function backofshow3() {
    document.getElementById('div3').style.display = 'block';
    document.getElementById('div2').style.display = 'none';
  }
  
  function btnConfirm() {
    var database_ref = database.ref();
    var busLiner = document.getElementById('bus-liner').value;
    var time = document.getElementById('time').value;
    var date = document.getElementById('date').value;
    var northOrig = document.getElementById('north-origin').value;
    var southOrig = document.getElementById('south-origin').value;
    var northDes = document.getElementById('north-destination').value;
    var southDes = document.getElementById('south-destination').value;
    var ticket = create_random_string(10);
    //na collect na data brad
    show3();
  
    // //////////////////////////////////////CALCULATE THE DISTANCE NORTH
    var origin = document.getElementById('north-origin').value;
    var destination = document.getElementById('north-destination').value;
    var Sorigin = document.getElementById('south-origin').value;
    var Sdestination = document.getElementById('south-destination').value;
    var service = new google.maps.DistanceMatrixService();
  
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      callback
    );
    // get distance results
    function callback(response, status) {
      var distance = response.rows[0].elements[0].distance;
      var distance_in_kilo = distance.value / 1000; // the kilom
      console.log(distance_in_kilo);
      input8.innerText = distance_in_kilo + ' km';
  
      var base = 35;
      var charge_km = 2;
      for (var i, i = 0; i < distance_in_kilo; i++) {
        var bill = base + charge_km;
      }
      input10.innerText = base + ' PHP';
    }
    // print results on submit the form
    $('#distance_form').submit(function (e) {});
    // ///////////////////////////////////////END OF CALCULATE DISTANCE NORTH
  
    // ///////////////////////////////////////CALCULATE DISTANCE SOUTH
    var Sorigin = document.getElementById('south-origin').value;
    var Sdestination = document.getElementById('south-destination').value;
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [Sorigin],
        destinations: [Sdestination],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      callback
    );
    // get distance results
    function callback(response, status) {
      var distance = response.rows[0].elements[0].distance;
      var distance_in_kilo = distance.value / 1000; // the kilom
      input8.innerText = distance_in_kilo + ' km';
      console.log(distance_in_kilo);
  
      var base = 35;
      var charge_km = 2;
      for (var i, i = 0; i < distance_in_kilo; i++) {
        base += charge_km;
      }
      input10.innerText = base + ' PHP';
  
      var ticket_data = {
        BusLiner: busLiner,
        Date: date,
        Time: time,
        North_Origin: northOrig,
        North_Destination: northDes,
        South_Origin: southOrig,
        South_Destination: southDes,
        Total_Kilometer: distance_in_kilo + ' km',
        Total_Bill: base + ' PHP',
      };
      database_ref.child('tickets/' + ticket).set(ticket_data);
    }
    // print results on submit the form
    $('#distance_form').submit(function (e) {});
    // ///////////////////////////////////////END OF CALCULATE DISTANCE SOUTH///////////
  
    var input0 = document.getElementById('refnum');
    var input1 = document.getElementById('Input1');
    var input2 = document.getElementById('Input2');
    var input3 = document.getElementById('Input3');
    var input4 = document.getElementById('Input4');
    var input5 = document.getElementById('Input5');
    var input6 = document.getElementById('Input6');
    var input7 = document.getElementById('Input7');
    var input8 = document.getElementById('Input8');
    var input10 = document.getElementById('Input10');
  
    input0.innerText = ticket;
    input1.innerText = busLiner;
    input2.innerText = date;
    input3.innerText = time;
    input4.value = northOrig;
    input5.value = northDes;
    input6.value = southOrig;
    input7.value = southDes;
  
    if (input4.value != '0') {
      document.getElementById('northcebu').style.display = 'block';
      input4.innerText = northOrig;
    } else {
      document.getElementById('northcebu').style.display = 'none';
    }
  
    if (input5.value != '0') {
      document.getElementById('northcebudest').style.display = 'block';
      input5.innerText = northDes;
    } else {
      document.getElementById('northcebudest').style.display = 'none';
    }
  
    if (input6.value != '0') {
      document.getElementById('southcebu').style.display = 'block';
      input6.innerText = southOrig;
    } else {
      document.getElementById('southcebu').style.display = 'none';
    }
  
    if (input7.value != '0') {
      document.getElementById('southcebudest').style.display = 'block';
      input7.innerText = southDes;
    } else {
      document.getElementById('southcebudest').style.display = 'none';
    }
    //   // input6.innerText = southOrig;
  }
  
  //random reference no.
  function create_random_string(string_length) {
    var random_string = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return random_string;
  }
  
  function calculateDistance() {
    var database_ref = database.ref();
    var busLiner = document.getElementById('bus-liner').value;
    var time = document.getElementById('time').value;
    var date = document.getElementById('date').value;
    var northOrig = document.getElementById('north-origin').value;
    var southOrig = document.getElementById('south-origin').value;
    var northDes = document.getElementById('north-destination').value;
    var southDes = document.getElementById('south-destination').value;
    var ticket = create_random_string(10);
    //na collect na data brad
  
    // //////////////////////////////////////CALCULATE THE DISTANCE NORTH
    var origin = document.getElementById('north-origin').value;
    var destination = document.getElementById('north-destination').value;
    var Sorigin = document.getElementById('south-origin').value;
    var Sdestination = document.getElementById('south-destination').value;
    var service = new google.maps.DistanceMatrixService();
  
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      callback
    );
    // get distance results
    function callback(response, status) {
      var distance = response.rows[0].elements[0].distance;
      var distance_in_kilo = distance.value / 1000; // the kilom
      console.log(distance_in_kilo);
      input8.innerText = distance_in_kilo + ' km';
  
      var base = 50;
      var charge_km = 2;
      for (var i, i = 0; i < distance_in_kilo; i++) {
        var bill = base + charge_km;
      }
      input9.innerText = base + ' PHP';
    }
    // print results on submit the form
    $('#distance_form').submit(function (e) {});
    // ///////////////////////////////////////END OF CALCULATE DISTANCE NORTH
  
    // ///////////////////////////////////////CALCULATE DISTANCE SOUTH
    var Sorigin = document.getElementById('south-origin').value;
    var Sdestination = document.getElementById('south-destination').value;
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [Sorigin],
        destinations: [Sdestination],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      callback
    );
    // get distance results
    function callback(response, status) {
      var distance = response.rows[0].elements[0].distance;
      var distance_in_kilo = distance.value / 1000; // the kilom
      input8.innerText = distance_in_kilo + ' km';
      console.log(distance_in_kilo);
  
      var base = 35;
      var charge_km = 2;
      for (var i, i = 0; i < distance_in_kilo; i++) {
        base += charge_km;
      }
      input9.innerText = base + ' PHP';
    }
    // print results on submit the form
    $('#distance_form').submit(function (e) {});
    // ///////////////////////////////////////END OF CALCULATE DISTANCE SOUTH///////////
  
    var input0 = document.getElementById('refnum');
    var input1 = document.getElementById('Input1');
    var input2 = document.getElementById('Input2');
    var input3 = document.getElementById('Input3');
    var input4 = document.getElementById('Input4');
    var input5 = document.getElementById('Input5');
    var input6 = document.getElementById('Input6');
    var input7 = document.getElementById('Input7');
    var input8 = document.getElementById('Input8');
    var input9 = document.getElementById('Input9');
  
    input0.innerText = ticket;
    input1.innerText = busLiner;
    input2.innerText = date;
    input3.innerText = time;
    input4.value = northOrig;
    input5.value = northDes;
    input6.value = southOrig;
    input7.value = southDes;
  }
  //------------end tickets

 

// Start of rating forward to firebase
function submitrating() {
  var rate = document.getElementsByName('rate');
  var randomuser = create_random_string(10);
  var ratingdesc = document.getElementById('ratingtext').value;
  var element;

  if (rate[0].checked) {
    element = document.getElementById('rate-5').value;
  }
  if (rate[1].checked) {
    element = document.getElementById('rate-4').value;
  }
  if (rate[2].checked) {
    element = document.getElementById('rate-3').value;
  }
  if (rate[3].checked) {
    element = document.getElementById('rate-2').value;
  }
  if (rate[4].checked) {
    element = document.getElementById('rate-1').value;
  }

  //na collect na data brad
  var database_ref = database.ref();
  var rating_data = {
    RatingDescription: ratingdesc,
    Rate: element,
  };
  database_ref.child('ratings/' + randomuser).set(rating_data);
}
// END OF RATING FORWARD TO FIREBASE

