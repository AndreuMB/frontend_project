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
                    <input type="email" class="form-control" name="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password">
                </div>
                <button type="button" id="submit_register" class="btn btn-primary">Register</button>
            </form>
        </div>
        `;
    document.querySelector("#submit_register").addEventListener('click',register);
}

function register(e){
    e.preventDefault(); 
    let formData = new FormData(document.querySelector('#register'));

    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFfIeHfupYXw89FUOMeorhfQrndz7iIck',{
        method: "post",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
    }).then((response) => response.json())
    .then((datos) => {
        if (datos.error) {
            console.log(datos.error.message);
        }else{
            console.log(datos.localId);
        }
        let json={
            "Name": document.querySelector('#username').value
        };
        // json.key=
        fetch(url + datos.localId + ".json", {
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