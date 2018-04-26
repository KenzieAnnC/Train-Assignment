// Initialize Firebase

var config = {
    apiKey: "AIzaSyDdLW0UM6upysqGMkYtH3vWQYu51FCCtoQ",
    authDomain: "traintime-f5505.firebaseapp.com",
    databaseURL: "https://traintime-f5505.firebaseio.com",
    projectId: "traintime-f5505",
    storageBucket: "",
    messagingSenderId: "722518752092"
};

firebase.initializeApp(config);

var database = firebase.database();


$(".button").on("click", function (event) {
  
    event.preventDefault();
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var firstTrainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrainTime), "minutes");

    var tRemainder = diffTime % frequency;

    var minutesAway = frequency - tRemainder;

    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    var newTrain = {
        name: name,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    }

    database.ref().push(newTrain);
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#time-input").val("");
    


});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {


    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextArrival;
    var minutesAway = childSnapshot.val().minutesAway;

    $("tbody").append(
    "<tr><td>" + name + 
    "</td><td>" + destination + 
    "</td><td>" + frequency + 
    "</td><td>" + nextArrival + 
    "</td><td>" + minutesAway +  
    "</td></tr>");

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});