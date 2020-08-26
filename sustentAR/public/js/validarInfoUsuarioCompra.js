function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', function() {
    let dni = qs('#dni')
    let direccion = qs('#direccion')
    let cp = qs('#cp')
    let entreCalles = qs('#entreCalles')
    let depto = qs('#depto')
    let telefono = qs('#telefono')
    let btnConfirmar = qs('#btnConfirmar')
    let formInfoUsuario = qs('form')
    
        
    btnConfirmar.addEventListener('click', function(evento){
        evento.preventDefault();
    
        
        let errores = 0;
        let specificErrors = 0;
        if(dni.value.length != 8){
            specificErrors++;
            errores++;
        }
        if(direccion.value.length < 1){
            errores++;
        }
        if(entreCalles.value.length < 1){
            errores++;
        }
        if(depto.value.length < 1){
            errores++;
        }
        if(telefono.value.length < 8){
            console.log('telefono mal')
            specificErrors++;
            errores++;
        }
        if(cp.value.length != 4){
            console.log('cp mal')
            specificErrors++;
            errores++;
        }
        
        if(errores > 0){
            if(specificErrors > 0){
                swal('Verifica haber ingresado correctamente: dni, telefono y codigo postal')
            }else{
                swal('Faltan campos por completar... ¿seguro que quieres continuar?')
            }
        }else{
            // console.log('hola');
            // btnConfirmar.unbind('click').click();
            // btnConfirmar.click()
        }
    })
}) 