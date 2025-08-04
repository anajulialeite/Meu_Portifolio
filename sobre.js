document.addEventListener("DOMContentLoaded", function () {
    const text = "Quem sou eu?";
    let index = 0;
    const element = document.getElementById("typing-effect");

    if (!element) {
        console.error("Elemento com ID 'typing-effect' não encontrado!");
        return;
    }

    function typeWriter() {
        if (index < text.length) {
            element.textContent += text.charAt(index); 
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    element.textContent = ""; // Limpa o conteúdo antes de iniciar a animação
    typeWriter();
});

document.addEventListener("DOMContentLoaded", function () {
    let image = document.querySelector(".img-fade-in");
    image.classList.add("visible");
  });
  