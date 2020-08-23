function qs(element) {
    return document.querySelectorAll(element)
};

window.addEventListener('load', function() {

let botonSeleccionarImg = qs('#botonSeleccionarImg');
let inputSeleccionarArchivo = qs('.inputSeleccionarArchivo');

botonSeleccionarImg[0].addEventListener('click', function() {
    inputSeleccionarArchivo[0].click()
})

botonSeleccionarImg[1].addEventListener('click', function() {
    inputSeleccionarArchivo[1].click()
})

botonSeleccionarImg[2].addEventListener('click', function() {
    inputSeleccionarArchivo[2].click()
})

})