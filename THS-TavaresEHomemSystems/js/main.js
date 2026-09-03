// Lógica de simulação de terminal
const textArray = "Arquitetura de Software & Manutenção.";
const typingElement = document.querySelector('.typing-text');
let index = 0;

function typeWriter() {
    if (index < textArray.length) {
        typingElement.innerHTML += textArray.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Controla a velocidade de digitação em milissegundos
    }
}

// Inicia a função assim que a janela carrega
window.onload = typeWriter;
