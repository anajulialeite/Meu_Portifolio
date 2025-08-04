const centro = document.querySelector('.centro');
let rotation = 0;

/*function rotateCentro() {
    rotation += 1; //Aumenta um grau a cada chamada
    centro.style.transform = 'rotate(${rotation}deg)';
}

setInterval(rotateCentro, 10); //Gira a logo a cada 10 milisegndos
*/

const menuHamburguer = document.querySelector(".menu-hamburguer");
const navMenu = document.querySelector(".nav-menu");

if (menuHamburguer && navMenu) {
    menuHamburguer.addEventListener("click", () => {
        menuHamburguer.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'pt',
        includedLanguages: 'en,pt',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}