export { print_menu };

import { print_welcome } from './welcome';
import { print_login } from './login';
import { print_register } from './register';
import { print_sheets } from './sheets';
import { print_stave } from './compose';
import { print_test } from './test.js';

function print_menu() {  
    let menu = document.querySelector('#menu');
    console.log("localId = " + sessionStorage.getItem('localId'));
    if (sessionStorage.getItem('localId') !== null) {
      menu.innerHTML=
      `
        <a class="navbar-brand" href="#">Pianet</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" id="welcome_link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="sheets_link" href="#">My Sheets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="compose_link" href="#">Compose</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="test_link" href="#">Tests</a>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="userMenu">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" id="profile" href="#">${sessionStorage.getItem('username')}</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="logout_link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      `
      document.querySelector('#logout_link').addEventListener('click', ()=>{
        sessionStorage.clear();
        print_menu();
        print_welcome();
      });
      document.querySelector('#sheets_link').addEventListener('click', print_sheets);
    }else{
      menu.innerHTML=
      `
        <a class="navbar-brand" href="#">Pianet</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" id="welcome_link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="compose_link" href="#">Compose</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="test_link" href="#">Tests</a>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="userMenu">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" id="login_link" href="#">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="register_link" href="#">Register</a>
            </li>
          </ul>
        </div>
      `
      document.querySelector('#login_link').addEventListener('click', print_login);
      document.querySelector('#register_link').addEventListener('click', print_register);
    }
    document.querySelector('#welcome_link').addEventListener('click', print_welcome);
    document.querySelector('#compose_link').addEventListener('click', print_stave);
    document.querySelector('#test_link').addEventListener('click', print_test);
    print_welcome();
  }