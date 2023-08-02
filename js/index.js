
// let realName = prompt("what is your name?");

let activate = document.querySelector(".startButton").addEventListener("click", function() {
    let realUser = document.getElementById("userName");
    let agentUser = prompt('Enter Quiz takers Name');
    realUser.textContent = agentUser;
    console.log(realUser);
})

