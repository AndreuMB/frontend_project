export { get_users };
export { get_sheets };
export { post_img };

async function get_users(){
    let url = 'https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    fetch(url+'/?auth='+sessionStorage.getItem("idToken"))
    .then((response) => response.json())
    .then((datos) => {
        return datos;
    })
}

// fetch
async function get_sheets(){
    let url = 'https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/'
    +sessionStorage.getItem("localId")+'/sheets.json';
    console.log(url);
    const response = await fetch(url+'/?auth='+sessionStorage.getItem("idToken"));
    const data = await response.json();
    
    return data;
}

async function post_img(img){
    console.log();
    let url = 'https://daw2022-64f58-default-rtdb.europe-west1.firebasedatabase.app/users/'
    +sessionStorage.getItem("localId")+'/sheets/'+sessionStorage.getItem("sheet")+'/img.json/?auth='+sessionStorage.getItem("idToken");
    console.log(url);
    await fetch(url,{
        method: "put",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(img),
    })
}