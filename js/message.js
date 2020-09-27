window.onload = function() {
    loadMessages();
}

var database = firebase.database();
var userEmail = "";

function loadMessages() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userEmail = user.email;
            database.ref("/").on("value", function(data) {
                var keys = data.val();
                document.getElementById('realTimeMessages').innerHTML = "";
                for (result in keys) {
                    var pTag = `<p class="msg">${keys[result].email}: ${keys[result].message}</p>`;
                    document.getElementById('realTimeMessages').innerHTML += pTag;
                }
            })
        } else {

        }
    });
}





function messageSend() {
    var messageToSent = document.getElementById("message-input");
    database.ref().push({
        email: userEmail,
        message: messageToSent.value,
    })

    messageToSent.value = "";

}


function logout() {
    firebase.auth().signOut()
    location.replace("index.html");
}