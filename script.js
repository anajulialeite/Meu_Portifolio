const centro = document.querySelector('.centro');
let rotation = 0;

function rotateCentro() {
    rotation += 1; //Aumenta um grau a cada chamada
    centro.style.transform = 'rotate(${rotation}deg)';
}

setInterval(rotateCentro, 10); //Gira a logo a cada 10 milisegndos