import { Usuario } from "./Usuario.js";
import { cargarUsuarios, guardarUsuarios } from "./usuarios.js";

const formulario = document.getElementById("signup-form");
const mail = document.getElementById("correo");
const nombr = document.getElementById("nombre");
const contra = document.getElementById("password");

const listaUsuarios = cargarUsuarios();

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (listaUsuarios.some(u => u.email === mail.value)) {
        alert("Ese correo ya está registrado");
        return;
    }

    const id = Math.max(0, ...listaUsuarios.map(u => u.id)) + 1;
    listaUsuarios.push(new Usuario(id, nombr.value, mail.value, contra.value));
    guardarUsuarios(listaUsuarios);

    alert("Usuario creado con exito");
    mail.value = "";
    nombr.value = "";
    contra.value = "";
});
