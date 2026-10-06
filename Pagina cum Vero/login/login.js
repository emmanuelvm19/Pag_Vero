import { cargarUsuarios } from "../signup/usuarios.js";

const formulario = document.getElementById("login");
const botonVer = document.getElementById("btn-ver");
const iconoOjo = document.getElementById("icono-ojo");
const mail = document.getElementById("correo");
const contra = document.getElementById("password");

const listaUsuarios = cargarUsuarios();   // ya incluye los quemados

// ...el resto (submit y botonVer) se queda igual
console.log(listaUsuarios);

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(listaUsuarios.find(u => u.email === mail.value && u.password === contra.value)){
        console.log("Hola, usuario encontrado");
        alert("Has accedido al sitio");
        window.location.href = "main/main.html";
    } else {
        console.error("Usuario o contraseña incorrectos");
        alert("Usuario o contraseña incorrectos");
    }
    mail.value = "";
    contra.value = "";
});
botonVer.addEventListener("click", () => {
    if (contra.type === "password") {
        contra.type = "text";
        iconoOjo.textContent = "visibility_off"; // Cambiamos el icono a un mono tapándose los ojos
    }else{
        contra.type = "password";
        iconoOjo.textContent = "visibility";
    }
});
