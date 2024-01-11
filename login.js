function iniciarSesion() {
    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena").value;

    
    var usuariosValidos = [{
        correo: "diegodpc@gmail.com",
        contrasena: "123",
        nombre: "DiegoDP"
    }, {
        correo: "darioint@gmail.com",
        contrasena: "1234",
        nombre: "DarioInt"
    },{
        correo: "nahinolmedo@gmail.com",
        contrasena: "12345",
        nombre: "NahinOlm"
    },{
        correo: "jass@gmail.com",
        contrasena: "123456",
        nombre: "YasbeckM"
    },
    
    ];

    
    var usuarioEncontrado = usuariosValidos.find(function(usuario) {
        return usuario.correo === correo && usuario.contrasena === contrasena;
    });

    if (usuarioEncontrado) {
      
        localStorage.setItem("usuarioLogueado", "true");
        localStorage.setItem("nombreUsuario", usuarioEncontrado.nombre);

        window.location.href = "index.html";
    } else {
        alert("Credenciales inválidas");
    }

    
    return false;
}