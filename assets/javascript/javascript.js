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

database.ref().on("child_added", function (childSnapshot) {

    var newRow = $("<tr>");
    newRow.append(
    "<td>" + childSnapshot.val().name + "</td>" + 
    "<td>" + childSnapshot.val().destination + "</td>" + 
    "<td>" + childSnapshot.val().frequncy + "</td>" +
    "<td>" + childSnapshot.val().nextArrival + "</td>" +
    "<td>" + childSnapshot.val().minutesAwaay + "</td>");

    $("tbody").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(".button").on("click", function (event) {
    // return false;
    event.preventDefault();
 
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#time-input").val().trim(), "HH:mm");
    var frequncy = moment($("#frequency-input").val().trim(), "m");
    var nextArrival = moment(firstTrainTime).add(frequncy);


    console.log(firstTrainTime);


    var minutesAway = "";

    database.ref().push({
        name: name,
        destination: destination,
        time: firstTrainTime,
        frequncy: frequncy,
        time: firstTrainTime,
        arrival: nextArrival
    });

});