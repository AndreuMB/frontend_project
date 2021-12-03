export { print_login };

import { print_welcome } from './welcome';

function print_login(){
    document.querySelector('#container').innerHTML=
        `
        <div class="container p-5">
            <form id="login">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" name="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" name="password">
                </div>
                <span class="text-danger" id="error_login"></span><br>
                <button type="button" id="submit_login" class="btn btn-primary">Login</button>
            </form>
        </div>
        `;
        document.querySelector("#submit_login").addEventListener('click',login);

}

function login(e){
    e.preventDefault();
    let formData = new FormData(document.querySelector('#login'));
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users";

    fetch(url + ".json")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFfIeHfupYXw89FUOMeorhfQrndz7iIck',{
        method: "post",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(Object.fromEntries(formData)),
    }).then((response) => {
        if (!response.ok) {
            throw "Username or password incorrect";
        }
        return response.json();
    }).then((datos) => {
        console.log(datos);
        print_welcome();
    }).catch(error => {
        console.log("enter");
        document.querySelector('#error_login').innerHTML=error;
    })


    // return token
    // id user
    // save pswd and username in realtime db

    // .catch((error) => {
    //     console.log("error")
    //     // return Promise.reject()

    // })

}