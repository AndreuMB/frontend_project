import 'bootstrap/dist/css/bootstrap.min.css';

// TESTS
// import './test.js';

// PAGES
import { print_welcome } from './pages/welcome';
import { print_sheets } from './pages/sheets';
import { print_stave } from './pages/compose';
import { print_test } from './pages/test.js';
import { print_menu } from './pages/menu.js';



document.addEventListener('DOMContentLoaded', function(){

  print_menu();
  // print_welcome();
  // document.querySelector('#welcome_link').addEventListener('click', print_welcome);
  // // document.querySelector('#sheets_link').addEventListener('click', print_sheets);
  // document.querySelector('#compose_link').addEventListener('click', print_stave);
  // document.querySelector('#test_link').addEventListener('click', print_test);


});
