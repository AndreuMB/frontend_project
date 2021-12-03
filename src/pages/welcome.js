export { print_welcome };

function print_welcome(){
    let content="";
    for (let i = 0; i < 3; i++) {
        content+=
        `
        <div class="card" style="width: 18rem;">
            <img src="img/example-sheet.jpg" class="card-img-top" alt="example-sheet">
            <div class="card-body bg-dark">
                <h5 class="card-title">Sheet 1</h5>
                <div class="d-flex justify-content-between">
                    <p class="card-text">Andreu Micó</p>
                    <a href="#" class="btn btn-primary">Play it</a>
                </div>
            </div>
        </div>
        `
    }

    document.querySelector('#container').innerHTML=
        `<h1 class="display-1 contental-center">PIANET</h1>

        <div class="p-3">
        <h4 class="display-4 contental-center mb-2">Popular sheets</h4>
        <!-- <div class=""> -->
        </div>

    
        <div class="m-2 d-flex justify-content-around">

            ${content}
        
        </div>

    </div>`;
}