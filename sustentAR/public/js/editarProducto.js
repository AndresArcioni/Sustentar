function qs(element) {
    return document.querySelectorAll(element)
};

function previewImg(index){
    let oFReader = new FileReader();
    let input = document.querySelectorAll("#inputFile");
    oFReader.readAsDataURL(input[index].files[0]);

    oFReader.onload = function (oFREvent) {
        let img = document.querySelectorAll("#imgDeProducto");
        img[index].src = oFREvent.target.result;
    };
}

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