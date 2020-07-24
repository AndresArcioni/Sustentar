function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', function() {

let botonSeleccionarImg = qs('#botonSeleccionarImg');
let inputSeleccionarArchivo = qs('.inputSeleccionarArchivo');

botonSeleccionarImg.addEventListener('click', function() {
    inputSeleccionarArchivo.click()
})

})