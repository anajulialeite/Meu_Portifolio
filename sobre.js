document.addEventListener("DOMContentLoaded", function () {
    // Efeito de digitação
    const text = "Quem sou eu?";
    let index = 0;
    const element = document.getElementById("typing-effect");

    if (!element) {
        console.error("Elemento com ID 'typing-effect' não encontrado!");
    } else {
        element.textContent = "";
        function typeWriter() {
            if (index < text.length) {
                element.textContent += text.charAt(index); 
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    }

    // Animação da imagem
    const image = document.querySelector(".img-fade-in");
    if (image) {
        image.classList.add("visible");
    }

    // Google Translate
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
        new google.translate.TranslateElement({
            pageLanguage: 'pt',
            includedLanguages: 'en,pt',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    };
});

  