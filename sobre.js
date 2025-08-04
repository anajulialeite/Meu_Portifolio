document.addEventListener("DOMContentLoaded", function () {
    const texts = {
        pt: "Quem sou eu?",
        en: "About me"
    };
    let index = 0;
    const element = document.getElementById("typing-effect");

    if (!element) {
        console.error("Elemento com ID 'typing-effect' não encontrado!");
        return;
    }

    function typeWriter(text) {
        element.textContent = ""; // Limpa antes de começar
        index = 0;
        function typing() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typing, 100);
            }
        }
        typing();
    }

    // Função para trocar idioma, mostrar a seção certa e trocar o texto animado
    window.setLanguage = function (lang) {
        document.querySelectorAll('.language').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(lang).classList.add('active');

        // Troca o lang do html para acessibilidade e SEO
        document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';

        // Inicia a animação de digitação com o texto do idioma escolhido
        typeWriter(texts[lang]);
    };

    // Inicia com português ativo
    setLanguage('pt');

    // Faz a imagem aparecer com fade-in
    let image = document.querySelector(".img-fade-in");
    if (image) {
        image.classList.add("visible");
    }
});
