

window.addEventListener('load', function() {
    let btnSubmit = qs('#btnSubmit');
    let inputNombre = qs('#inputNombre');
    let inputApellido = qs('#inputApellido');
    let inputEmail = qs('#inputEmail');
    let inputContrasenia = qs('#inputContrasenia');
    
    let erNombre = qs('.erNombre');
    let erApellido = qs('.erApellido');
    let erEmail = qs('.erEmail');
    let erContrasenia = qs('.erContrasenia');

    let registerForm = qs('form')



    let regexMail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i



    btnSubmit.addEventListener('click', function(e){
        e.preventDefault();

        let errores = {}

        if(inputNombre.value.length < 1){
            errores.nombre = 'Este campo debe estar completo'
        }

        if(inputApellido.value.length < 1){
            errores.apellido = 'Este campo debe estar completo'
        }

        if(inputEmail.value.match(regexMail) == null){
            errores.email = 'Este mail es inválido'
        }

        if(inputContrasenia.value.length < 1 ){
            errores.contasenia = 'Este campo no puede estar vacio'
        } else {
            if(inputContrasenia.value.length < 8){
                errores.contrasenia = 'La contraseña debe tener como mínimo 8 caracteres'
            }
        }

        if(Object.keys(errores).length >= 1){
            erNombre.innerText = (errores.nombre) ? errores.nombre : '';
            erApellido.innerText = (errores.apellido) ? errores.apellido : '';
            erEmail.innerText = (errores.email) ? errores.email : '';
            erContrasenia.innerText = (errores.contrasenia) ? errores.contrasenia : '';
        } else {
            registerForm.submit();
        }
    })
    /*
    botonSeleccionarImg[1].addEventListener('click', function() {
        inputSeleccionarArchivo[1].click()
    })

    botonSeleccionarImg[2].addEventListener('click', function() {
        inputSeleccionarArchivo[2].click()
    })*/

})