export { print_register };

import { print_login } from './login';

function print_register(){
    document.querySelector('#container').innerHTML=
        `
        <div class="container p-5">
            <form id="register" method="POST">
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" id="username" class="form-control" name="username">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" id="email" class="form-control" name="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="pswd" class="form-control" name="password">
                </div>
                <button type="button" id="submit_register" class="btn btn-primary">Register</button>
            </form>
        </div>
        `;
    document.querySelector("#submit_register").addEventListener('click',register);
}

function register(e){
    e.preventDefault(); 
    // let formData = new FormData(document.querySelector('#register'));
    // formDataJSON = JSON.stringify(Object.fromEntries(formData));
    // formDataJSON.push({"returnSecureToken":true});

    let email = document.querySelector('#email').value;
    let pswd = document.querySelector('#pswd').value;
    let username = document.querySelector('#username').value;

    let dataJSON = {"email":email,"password":pswd,"returnSecureToken":true}


    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key,{
        method: "post",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(dataJSON),
    }).then((response) => response.json())
    .then((datos) => {
        console.log(datos);
        if (datos.error) {
            console.log(datos.error.message);
        }else{
            console.log(datos.localId);
        }
        let json={
            "name": username
        };
        // json.key=
        fetch(url + datos.localId + ".json?auth="+datos.idToken, {
            method: "put",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(json),
        })
    }).then(()=> print_login())

    // fetch(url + ".json", {
    //     method: "post",
    //     headers: { "Content-type": "application/json; charset=UTF-8" },
    //     body: JSON.stringify(Object.fromEntries(formData)),
    //    }).then((response) => response.json())
    //     .then((datos) => {
    //         // tractament de les dades
    //         console.log(datos);
    // });
}