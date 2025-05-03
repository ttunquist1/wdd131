console.log("Hello World!");

let selectElm = document.querySelector("select");
let logoElm = document.querySelector("img");


selectElm.addEventListener("change", changeTheme);

function changeTheme() {
    let current = selectElm.value;
    if (current == 2)
    {
        document.body.className = "dark";
        document.body.classList.add("dark");

        logoElm.src = "byui-logo_dark.png";

        
    } else {
        document.body.classList.remove("dark");
        logoElm.src = "byui-logo_blue.webp";
    }



}