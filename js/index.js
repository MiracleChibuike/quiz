
// let realName = prompt("what is your name?");

let activate = document.querySelector(".startButton").addEventListener("click", function() {
    let agentUser = document.getElementById("userName");
    let realUser = document.getElementById("user");
    agentUser.innerHTML = realUser.value;
})

