document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress");

    progressBars.forEach(bar => {
        const percentage = bar.getAttribute("data-percentage");

        setTimeout(() => {
            bar.style.width = percentage; // Anima cada barra individualmente
        }, 300);
    });
});

