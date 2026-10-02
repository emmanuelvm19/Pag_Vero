import { Usuario } from "../signup/Usuario.js";

const formulario = document.getElementById("login");
const botonVer = document.getElementById("btn-ver");
const iconoOjo = document.getElementById("icono-ojo");
const mail = document.getElementById("correo");
const contra = document.getElementById("password");

// Traemos los datos almacenados
const datosEnNavegador = localStorage.getItem("usuariosBD");
const objetosPlanos = datosEnNavegador ? JSON.parse(datosEnNavegador) : [];

// Convertimos a objetos de clase Usuario
const listaUsuarios = objetosPlanos.map(obj => new Usuario(obj.id, obj.name, obj.email, obj.password));

console.log(listaUsuarios);

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if(listaUsuarios.find(u => u.email === mail.value && u.password === contra.value)){
        console.log("Hola, usuario encontrado");
        window.location.href = "../main/main.html";
        alert("Has accedido al sitio");
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
