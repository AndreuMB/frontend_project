export { get_users };
export { get_sheets };

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