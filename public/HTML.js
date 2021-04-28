/*eslint-disable*/
var socket = io();
var messages = document.getElementById("name");

(function() {
  $("form").submit(function(e) {
    let li = document.createElement("li");
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", $("#name").val());

    messages.appendChild(li).append($("#name").val());
    let span = document.createElement("span");
    messages.appendChild(span).append("by " + "Anonymous" + ": " + "just now");

    $("#name").val("");

    return false;
  });

  socket.on("received", data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    let messages = document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by " + "anonymous" + ": " + "just now");
    console.log("Hello bingo!");
  });
})();
