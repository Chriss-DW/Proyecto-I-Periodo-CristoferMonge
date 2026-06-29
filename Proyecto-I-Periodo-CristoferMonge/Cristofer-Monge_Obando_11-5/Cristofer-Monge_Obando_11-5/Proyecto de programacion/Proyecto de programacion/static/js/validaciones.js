// =========================================================================
// 1. VALIDACIÓN PARA LA PANTALLA DE EDICIÓN (editar.html)
// =========================================================================
function validarYConfirmarEdicion() {
    // Aquí estoy obteniendo los valores que el usuario escribió en el formulario de edición
    // Uso .trim() porque no quiero que espacios en blanco arruinen la validación
    var nombre = document.getElementById('edit_nombre').value.trim();
    var telefono = document.getElementById('edit_telefono').value.trim();
    var correo = document.getElementById('edit_correo').value.trim();
    var direccion = document.getElementById('edit_direccion').value.trim();

    // Primero verifico que ningún campo obligatorio esté vacío
    // Esto es importante porque si falta información, no puedo guardar el contacto correctamente
    if (nombre === "" || telefono === "" || correo === "" || direccion === "") {
        alert("Los campos obligatorios (nombre, teléfono, correo, dirección) no pueden estar vacíos.");
        return false; // Detengo el proceso aquí mismo
    }

    // Para el teléfono, en Costa Rica usamos 8 dígitos exactos
    // isNaN() me ayuda a verificar que solo sean números
    if (telefono.length !== 8 || isNaN(telefono)) {
        alert("El número de teléfono debe tener exactamente 8 dígitos.");
        return false;
    }

    // Esta expresión regular me asegura que el correo tenga el formato correcto
    // Básicamente: algo@algo.dominio (con 2 a 4 letras en el dominio)
    var expresionCorreo = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;
    if (!expresionCorreo.test(correo)) {
        alert("El correo electrónico debe tener un formato válido (debe contener @ y un dominio, ej: usuario@dominio.com).");
        return false;
    }

    // Pido confirmación al usuario porque actualizar datos es algo serio
    // No quiero que alguien actualice por accidente y luego se arrepienta
    var confirmacion = confirm("¿Está seguro/a que desea actualizar la información del contacto? Esta acción no puede ser revertida.");
    return confirmacion;
}

// =========================================================================
// 2. VALIDACIÓN PARA LA PANTALLA DE CREACIÓN (Crear_contactos.html)
// =========================================================================
function validarYConfirmarCreacion() {
    // Similar a la función anterior, pero ahora para crear nuevos contactos
    // Obtengo los valores del formulario de creación
    var nombre = document.getElementById('nuevo_nombre').value.trim();
    var telefono = document.getElementById('nuevo_telefono').value.trim();
    var correo = document.getElementById('nuevo_correo').value.trim();
    var direccion = document.getElementById('nuevo_direccion').value.trim();

    // Las validaciones son las mismas: campos obligatorios no vacíos
    if (nombre === "" || telefono === "" || correo === "" || direccion === "") {
        alert("Los campos obligatorios (nombre, teléfono, correo, dirección) no pueden estar vacíos.");
        return false;
    }

    // Teléfono de 8 dígitos numéricos
    if (telefono.length !== 8 || isNaN(telefono)) {
        alert("El número de teléfono debe tener exactamente 8 dígitos.");
        return false;
    }

    // Correo con formato válido usando la misma expresión regular
    var expresionCorreo = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,4}$/;
    if (!expresionCorreo.test(correo)) {
        alert("El correo electrónico debe tener un formato válido (debe contener @ y un dominio, ej: usuario@dominio.com).");
        return false;
    }

    // Para crear no pido confirmación, solo valido y retorno true si todo está bien
    return true;
}


// =========================================================================
// 3. MODAL GLOBAL DE ELIMINACIÓN (Indicador 11)
// =========================================================================
// Esta variable me servirá para recordar qué contacto quiero eliminar
var idFilaAEliminar = null;

function mostrarModalEliminar(idFila) {
    // Guardo el ID que me pasan para usarlo después
    idFilaAEliminar = idFila;
    
    // Busco el modal en mi HTML y el enlace que tiene dentro
    var modal = document.getElementById('modalEliminar');
    var link = document.getElementById('modalEliminarLink');
    
    // Construyo la URL de eliminación con el ID específico
    link.href = '/eliminar_contacto/' + idFila;
    
    // Hago visible el modal agregando la clase 'active'
    modal.classList.add('active');
    
    // Evito que el enlace haga algo antes de que el usuario confirme
    return false;
}

function cerrarModalEliminar() {
    // Oculto el modal removiendo la clase 'active'
    document.getElementById('modalEliminar').classList.remove('active');
    // Limpio la variable porque ya no necesito recordar el ID
    idFilaAEliminar = null;
}

// Esta parte es para que el modal se cierre si el usuario hace clic fuera de él
// Me pareció una buena experiencia de usuario
document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modalEliminar');
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Si el clic fue en el fondo oscuro (no en el contenido del modal)
            if (e.target === modal) {
                cerrarModalEliminar(); // Cierro el modal
            }
        });
    }
});