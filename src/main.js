import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

// TESTS
// import './test.js';

// PAGES
import { print_welcome } from './pages/welcome';
import { print_sheets } from './pages/sheets';
import { print_stave } from './pages/compose';
import { print_test } from './pages/test';
import { print_menu } from './pages/menu';
import { get_users } from './pages/connect';
// import { get_sheets } from './pages/connect';



document.addEventListener('DOMContentLoaded', function(){
  // get_users();
  // get_sheets();
  // const sheets = await get_sheets();
  // console.log(sheets)
  // const users = async function prueba() {
  //   return await get_sheets();
  // }
  
  // get_sheets();
  //console.log('users = ', get_sheets());
  // console.log('sheets = ', users);

  print_menu();
  
  // print_welcome();
  // document.querySelector('#welcome_link').addEventListener('click', print_welcome);
  // // document.querySelector('#sheets_link').addEventListener('click', print_sheets);
  // document.querySelector('#compose_link').addEventListener('click', print_stave);
  // document.querySelector('#test_link').addEventListener('click', print_test);


});
