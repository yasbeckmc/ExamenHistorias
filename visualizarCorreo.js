function mostrarCorreo() {
    const correoGuardado = localStorage.getItem('correoGuardado');
    if (!correoGuardado) {
        alert('No se encontró ningún correo guardado.');
        return;
    }

    const correoDatos = document.getElementById('correoDatos');
    const { remitente, destinatario, asunto, cuerpo, imagen } = JSON.parse(correoGuardado);

    correoDatos.innerHTML = `
        <p><strong>Remitente:</strong> ${remitente}</p>
        <p><strong>Destinatario:</strong> ${destinatario}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Cuerpo:</strong> ${cuerpo}</p>
        <img src="data:image/jpeg;base64,${imagen}" alt="Imagen adjunta"> <!-- Mostrar la imagen adjunta -->
    `;
}

mostrarCorreo();
function mostrarCorreosEnviados() {
    const correosGuardados = localStorage.getItem('correosGuardados');
    if (!correosGuardados) {
        alert('No se encontraron correos guardados.');
        return;
    }

    const correoDatos = document.getElementById('correoDatos');
    const correos = JSON.parse(correosGuardados);

    correoDatos.innerHTML = '<h2>Correos enviados por Usuario 1:</h2>';

    correos.forEach((correo) => {
        correoDatos.innerHTML += `
            <p><strong>Remitente:</strong> ${correo.remitente}</p>
            <p><strong>Destinatario:</strong> ${correo.destinatario}</p>
            <p><strong>Asunto:</strong> ${correo.asunto}</p>
            <p><strong>Cuerpo:</strong> ${correo.cuerpo}</p>
            <img src="data:image/jpeg;base64,${correo.imagen}" alt="Imagen adjunta"> <!-- Mostrar la imagen adjunta -->
            <hr>
        `;
    });
}

mostrarCorreosEnviados();


function volver() {
    window.history.back();
}
