function guardarCorreo() {
    // Obtener los datos del formulario
    const remitente = document.getElementById('sender').value;
    const destinatario = document.getElementById('recipient').value;
    const asunto = document.getElementById('subject').value;
    const cuerpo = document.getElementById('body').value;
    const attachmentInput = document.getElementById('attachment');

    let imagenBase64 = '';

    // Verificar si se seleccionó un archivo
    if (attachmentInput.files.length > 0) {
        const file = attachmentInput.files[0];
        const reader = new FileReader();

        reader.onloadend = function () {
            // Convertir la imagen a Base64
            imagenBase64 = reader.result.split(',')[1];

            guardarCorreoEnLocalStorage(remitente, destinatario, asunto, cuerpo, imagenBase64);
        };

        // Leer la imagen como URL
        reader.readAsDataURL(file);
    } else {
        // Si no se selecciona imagen, guardar solo los demás datos del correo.
        guardarCorreoEnLocalStorage(remitente, destinatario, asunto, cuerpo, imagenBase64);
    }
}

function guardarCorreoEnLocalStorage(remitente, destinatario, asunto, cuerpo, imagenBase64) {
    const correoGuardado = {
        remitente: remitente,
        destinatario: destinatario,
        asunto: asunto,
        cuerpo: cuerpo,
        imagen: imagenBase64, // Guardamos la imagen como cadena Base64
    };

    // Obtener los correos guardados del usuario 2 del LocalStorage
    const correosGuardados = localStorage.getItem('correosGuardados');
    let correos = [];

    if (correosGuardados) {
        correos = JSON.parse(correosGuardados);
    }

    // Agregar el nuevo correo a la lista de correos
    correos.push(correoGuardado);

    // Guardar la lista actualizada en el LocalStorage
    localStorage.setItem('correosGuardados', JSON.stringify(correos));

    // Redirigir a la página de visualización
    window.open('visualizar_correo.html', '_blank');
}
