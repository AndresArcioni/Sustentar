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

    
    btnConfirmar.addEventListener('click', function(e) {
        e.preventDefault();

        if(dni.length == 8) {
            nroTarjeta.disabled=false;
        }

        if(nroTarjeta.length == 16) {
            codSeguridad.disabled=false;
        }

        if(codSeguridad.length == 3) {
            nombreTitular.disabled=false;
        }

        if(nombreTitular.length >= 3) {
            fNacimiento.disabled=false;
        }

        if(fNacimiento.length != '') {
            formContent.submit();
        }
        

    })


})