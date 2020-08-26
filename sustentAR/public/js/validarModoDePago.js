function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', function(){

    let form = qs('#content');
    let dni = qs('input#dni');
    let errorDni = qs("small#dni");
    let nroTarjeta = qs('input#nroTarjeta');
    let errorNroTarjeta = qs("small#nroTarjeta");
    let codSeguridad = qs('input#codSeguridad');
    let errorCodSeguridad = qs("small#codSeguridad");
    let nombreTitular = qs('input#nombreTitular');
    let errorNombreTitular = qs("small#nombreTitular");
    let btnConfirmar = qs('#btnConfirmar');



    nroTarjeta.addEventListener('input', function (e) {
        let foo = this.value.split("-").join("");
        if (foo.length > 0) {
            foo = foo.match(new RegExp('.{1,4}', 'g')).join("-");
        }
        this.value = foo;
    });


    btnConfirmar.addEventListener('click', function(e) {
        e.preventDefault(form);

        let errores = {};

        if(dni.value.length != 8) {
            errores.dni = "Inserta un DNI válido. 8 numeros sin espacios, ni puntos."
        }

        if(nroTarjeta.value.length != 19) {
            errores.nroTarjeta = "Inserta una tarjeta válida. Deben ser 16 numeros consecutivos, sin espacios, ni -."
        }

        if(codSeguridad.value.length != 3) {
            if(codSeguridad.value.length != 4) {
            errores.codSeguridad = "Inserta un codigo de seguridad válido. Es el numero de tres o cuatro cifras que figura en el dorso de la tarjeta."
        }
        }

        if(nombreTitular.value.length < 5) {
            errores.nombreTitular = "Inserta el nombre como figura en la tarjeta. "
        }
        

        if(Object.keys(errores).length >= 1) {
            if(errores.dni) {
                errorDni.innerText = errores.dni;
            } else {
                errorDni.innerText = '';
            }
            if(errores.nroTarjeta) {
                errorNroTarjeta.innerText = errores.nroTarjeta;
            } else {
                errorNroTarjeta.innerText = '';
            }
            if(errores.codSeguridad) {
                errorCodSeguridad.innerText = errores.codSeguridad;
            } else {
                errorCodSeguridad.innerText = '';
            }
            if(errores.nombreTitular) {
                errorNombreTitular.innerText = errores.nombreTitular;
            } else {
                errorNombreTitular.innerText = '';
            }

        } else {
            Swal.fire({
                position: 'top-center',
                icon: 'info',
                title: 'Estamos procesando el pago.',
                showConfirmButton: false,
                timer: 3000
              })
            
            setTimeout( function () { 
              form.submit();
            }, 3000);
            
        }
    })
})