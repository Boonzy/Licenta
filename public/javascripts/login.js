"use strict";

function login() {
    let users = document.getElementById("username");
    let pass = document.getElementById("password");

    if (username && password) {
        let userData = { username: users.value, password: pass.value };
        console.log(userData);
        callApi("POST", "/api/userCheck", userData)
            .then(res => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    alert("Nume/Parola sunt incorecte");
                }
            })
            .catch(e => {
                console.log(e);
                alert(e);
            });
    }
}