import { Usuario } from "./Usuario.js";

const CLAVE = "usuariosBD";

// Usuarios "quemados": siempre estarán disponibles
const USUARIOS_BASE = [
    new Usuario(1, "Emmanuel", "emmanuel@gmail.com", "emma123"),
    new Usuario(2, "Veronica", "vero@gmail.com", "veroteamo"),
];

export function guardarUsuarios(lista) {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
}

export function cargarUsuarios() {
    const guardados = localStorage.getItem(CLAVE);
    const lista = guardados
        ? JSON.parse(guardados).map(o => new Usuario(o.id, o.name, o.email, o.password))
        : [];

    // Agrega los quemados que falten (sin duplicar los que ya existan)
    let huboCambios = false;
    for (const base of USUARIOS_BASE) {
        if (!lista.some(u => u.email === base.email)) {
            lista.push(base);
            huboCambios = true;
        }
    }
    if (huboCambios) guardarUsuarios(lista);

    return lista;
}