export { print_login };

import { print_welcome } from './welcome';
import { print_menu } from './menu';
import '../apikey.js'

function print_login(){
    document.querySelector('#container').innerHTML=
        `
        <div class="container p-5">
            <form id="login">
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" id="email" class="form-control" name="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="pswd" class="form-control" name="password">
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
    // let formData = new FormData(document.querySelector('#login'));
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";

    let email = document.querySelector('#email').value;
    let pswd = document.querySelector('#pswd').value;

    let dataJSON = {"email":email,"password":pswd,"returnSecureToken":true}

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+key,{
        method: "post",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(dataJSON),
    }).then((response) => {
        if (!response.ok) {
            throw "Username or password incorrect";
        }
        return response.json();
    }).then((datos) => {
        fetch(url + datos.localId + ".json?auth="+datos.idToken)
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem('localId', datos.localId);
            sessionStorage.setItem('idToken', datos.idToken);
            sessionStorage.setItem('username', data.name);


            console.log(data);
            console.log("username = " + data.name);

            print_menu();
            print_welcome();
        });
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