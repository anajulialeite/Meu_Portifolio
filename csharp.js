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

// Ajustar posição do GitHub Corner
function ajustarGitHubCorner() {
    const githubCorner = document.getElementById("githubCorner");

    if (!githubCorner) return; // Garante que o elemento existe

    // Detecta se a barra do Google Tradutor está presente
    const barraTradutor = document.querySelector("iframe.goog-te-banner-frame");

    if (barraTradutor) {
        githubCorner.style.top = "50px"; // Move pra baixo se a barra existir
    } else {
        githubCorner.style.top = "10px"; // Posição normal
    }
}

// Roda ao carregar a página
window.addEventListener("load", () => {
    ajustarGitHubCorner();

    // Observa mudanças no DOM (se a barra aparece ou some)
    const observer = new MutationObserver(ajustarGitHubCorner);
    observer.observe(document.body, { childList: true, subtree: true });
});