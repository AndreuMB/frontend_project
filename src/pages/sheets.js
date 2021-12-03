export { print_sheets };

function print_sheets(){
    document.querySelector('#container').innerHTML=
        `
        <h1>My sheets</h1>
        <div class="container m-2">
        <div class="card" style="width: 18rem;">
            <img src="img/example-sheet.jpg" class="card-img-top" alt="example-sheet">
            <div class="card-body bg-dark">
            <h5 class="card-title">Sheet 1</h5>
            <p class="card-text">Andreu Micó</p>
            <a href="#" class="btn btn-primary">Play it</a>
            </div>
        </div>
        </div>
        `;
  }