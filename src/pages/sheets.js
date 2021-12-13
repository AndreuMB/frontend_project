export { print_sheets };
import { print_stave } from './compose';

function print_sheets(){
    let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";
    fetch(url + sessionStorage.getItem("localId") + "/sheets.json?auth="+sessionStorage.getItem("idToken"))
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let sheet_list="";
        Object.entries(data).map(el=>{
            console.log(el);
            sheet_list += 
            `
            <div class="card m-5" style="width: 18rem;">
                <img src="img/example-sheet.jpg" class="card-img-top" alt="example-sheet">
                <div class="card-body bg-dark">
                    <h5 class="card-title">${el[1].title}</h5>
                    <a href="#" class="btn btn-primary">Play it</a>
                </div>
            </div>
            `
        })
        // .forEach(element => {
        //     console.log(element);
        //     sheet_list += 
        //     `
        //     <div class="card m-5" style="width: 18rem;">
        //         <img src="img/example-sheet.jpg" class="card-img-top" alt="example-sheet">
        //         <div class="card-body bg-dark">
        //             <h5 class="card-title">${element.title}</h5>
        //             <a href="#" class="btn btn-primary">Play it</a>
        //         </div>
        //     </div>
        //     `
        // });
        document.querySelector('#container').innerHTML=
            `
            <h1>My sheets</h1>
            <div class="m-2 d-flex justify-content-left">

                ${sheet_list}
    
                <div class="card m-5" style="width: 18rem;">
                    <div class="card-img-top size_img" >
                        <img class="img_card" src="img/plus.png" alt="example-sheet">
                    </div>
                    <div class="card-body bg-dark new_body">
                        <form id="new_sheet">
                            <div class="mb-3">
                                <input type="text" id="title_sheet" class="form-control" name="title" placeholder="title">
                            </div>
                            <button type="button" id="submit_new" class="btn btn-primary">New</button>
                        </form>
                    </div>
                </div>
            </div>
            `;
        document.querySelector("#submit_new").addEventListener('click', submit_sheet);
    })

}

function submit_sheet(){
    let title = document.querySelector('#title_sheet').value;
    if (title=="") {
        console.log("title required");
    }else{
        let url = "https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/";
        let formData = new FormData(document.querySelector('#new_sheet'));
        fetch(url + sessionStorage.getItem("localId") + "/sheets.json?auth="+sessionStorage.getItem("idToken"),{
            method: "post",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            sessionStorage.setItem("sheet",data.name);

            print_stave();
        })
    }
}
