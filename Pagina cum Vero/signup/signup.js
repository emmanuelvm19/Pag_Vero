import {Usuario} from "./Usuario.js"

const formulario = document.getElementById("signup-form");
const mail = document.getElementById("correo");
const nombr = document.getElementById("nombre");
const contra = document.getElementById("password");

const listaUsuarios = [];

listaUsuarios.push(new Usuario(1, "Emmanuel", "emmanuel@gmail.com", "emma123"));
const userGen = new Usuario (2, "Usuario2", "user@gmail.com", "user123");
listaUsuarios.push(userGen);
localStorage.setItem("usuariosBD", JSON.stringify(listaUsuarios));

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = listaUsuarios.at(-1).id + 1;
    listaUsuarios.push(new Usuario(id, nombr.value, mail.value, contra.value));
    localStorage.setItem("usuariosBD", JSON.stringify(listaUsuarios));
    console.log("Usuario guardado en LocalStorage")
    alert("Usuario creado con exito");
    mail.value = "";
    nombr.value = "";
    contra.value = "";
});
