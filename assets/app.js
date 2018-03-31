// Initialize Firebase
var config = {
    apiKey: "AIzaSyAF2scix68H6Y2rRChgftq25cWmeYfgD5E",
    authDomain: "liz-train-scheduler.firebaseapp.com",
    databaseURL: "https://liz-train-scheduler.firebaseio.com",
    projectId: "liz-train-scheduler",
    storageBucket: "liz-train-scheduler.appspot.com",
    messagingSenderId: "57459775596"
  };
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// Create an event listener for when the user clicks the submit button.
$("#submitButton").on("click", function (event) {
  event.preventDefault();

  // Takes in user input from the form using jQuery and stores the information in an object in the database
  database.ref().push({
      name: $("#trainName").val(),
      destination: $("#trainDestination").val(),
      firstTime: $("#firstDeparture").val(),
      frequency: $("#departureFreq").val()
  });

  // Console log the user inputs
  console.log("Train Name: " + $("#trainName").val());
  console.log("Train Destination: " + $("#trainDestination").val());
  console.log("Train First Departure Time: " + $("#firstDeparture").val());
  console.log("Train Departure Frequency: " + $("#departureFreq").val());

  // Alert user that the information has been uploaded
  alert("New train scheduled successfully added");

  // Empty out the form fields before the user enters in a new train schedule
  $("#trainName").val(""),
  $("#trainDestination").val(""),
  $("#firstDeparture").val(""),
  $("#departureFreq").val("")

});

// Display the database information on the page and get the user data into a new dynamically generated table row each time a new train schedule is entered
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // Console log each object in the database
  console.log(childSnapshot.val());

  // Store the user info in a variable
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().firstTime;
  var trainFrequency = childSnapshot.val().frequency;

  // Console log each property of the object in the database
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // Use Moment.js to do the math conversion on when the next train is coming based on the value stored in firstDeparture, departureFreq and the current time

  // Create a variable to hold the train frequency entered by the user
  var tFrequency = trainFrequency;
  console.log("Train frequency for our math: " + tFrequency + " minutes");

  // Create a variable to hold the train's first departure time entered by the user
  var tFirstTime = moment(trainTime,"HH:mm");
  console.log("Train's first departure time for our math: " + tFirstTime);

  // Create a variable to hold the difference in minutes between the current time and the train's first departure time
  var diffTime = moment().diff(moment(tFirstTime), "minutes")
  console.log("Difference in time : " + diffTime + " minutes");

  // Create a variable to calculate the time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log("The remainder: " + tRemainder);

  // Create a variable to hold time of the next train
  var minToNextTrain = tFrequency - tRemainder;
  console.log("Minutes until next train: " + minToNextTrain);

  // Create a variable to display time of next train
  var tNext = moment().add(minToNextTrain, "minutes");
  console.log("Next train arrives at: " + moment(tNext).format("HH:mm"));

  // Add the train's schedule to the the table after the user submits the information
  $("#trainSchedules > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" +
  trainTime + "</td><td>" + moment(tNext).format("HH:mm") +  "</td><td>" + minToNextTrain + "</td></tr>");
});

// To display the current time on the page
$("#currentTime").text(moment().format("HH:mm"));



