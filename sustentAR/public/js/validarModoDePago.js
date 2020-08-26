function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', function(){

    let formContent = qs('#content');
    let dni = qs('#dni');
    let nroTarjeta = qs('#nroTarjeta');
    let codSeguridad = qs('#codSeguridad');
    let nombreTitular = qs('#nombreTitular');
    let fNacimiento = qs('#f-Nacimiento');
    let btnConfirmar = qs('#btnConfirmar');


    let errores = {};

    dni.addEventListener('keyup', function() {
        if(dni.value.length == 8) {
            nroTarjeta.disabled = false;  
        } else {
            errores.dni = "Inserta un DNI válido. 8 numeros consecutivos sin espacios, ni puntos. "
        }
    })
    
    nroTarjeta.addEventListener('keyup', function() {
        if(nroTarjeta.value.length == 16) {
            codSeguridad.disabled=false;
        } else {
            errores.nroTarjeta = "Inserta una tarjeta válida. Deben ser 16 numeros consecutivos, sin espacios, ni - "
        }
    })

    codSeguridad.addEventListener('keyup', function() {
        if(codSeguridad.value.length == 3) {
            nombreTitular.disabled=false;
        } else {
            errores.codSeguridad = "Inserta un codigo de seguridad válido. Es el numero de tres cifras que figura en el dorso de la tarjeta. "
        }
    })

    nombreTitular.addEventListener('keyup', function() {
        if(nombreTitular.value.length >= 3) {
            fNacimiento.disabled=false;
        } else {
            errores.nombreTitular = "Inserta el nombre tal y como figura en la tarjeta. "
        }
    })

    fNacimiento.addEventListener('keyup', function() {
        if(fNacimiento.value.length != '') {
            console.log('OK')
        } else {
            errores.fNacimiento = "Inserta una fecha válida. El formato es DD/MM/YYYY, por ejemplo 01/12/2019 "
        }
    })

    /*
    btnConfirmar.addEventListener('click', function(e) {
        e.preventDefault(formContent);

        if(errores < 1) {
            formContent.submit()
        }
    })*/
})