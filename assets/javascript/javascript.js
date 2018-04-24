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

    // Log everything that's coming out of snapshot

    console.log("Name ", childSnapshot.val().name);

    var newRow = $("<tr>");
    newRow.append("<td>" + childSnapshot.val().name + "</td>" + "<td>" + childSnapshot.val().destination + "</td>" + "<td>" + childSnapshot.val().time + "</td>" + "<td>" + childSnapshot.val().frequncy + "</td>");

    $(".tbody").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(".button").submit(function (event) {
    return false;
    event.preventDefault();
    //Input Variables from Form
    console.log("click 1");
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequncy = $("#frequency-input").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequncy: frequncy
    });
});