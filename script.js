let timeout;

function traduzirTexto() {
  clearTimeout(timeout); // Limpa o tempo anterior

  timeout = setTimeout(() => {
    executarTraducao();
  }, 800); // Espera 800ms após digitar para traduzir
}

async function executarTraducao() {
  const texto = document.getElementById("inputText").value.trim();
  const select = document.getElementById("targetLanguages");
  const outputArea = document.getElementById("outputArea");

  if (!texto) {
    outputArea.innerHTML = "<p>Digite algo para traduzir.</p>";
    return;
  }

  const idiomas = Array.from(select.selectedOptions).map(opt => opt.value);

  if (idiomas.length === 0) {
    outputArea.innerHTML = "<p>Selecione pelo menos um idioma.</p>";
    return;
  }

  outputArea.innerHTML = "<p>Traduzindo...</p>";
  outputArea.innerHTML = "";

  for (let idioma of idiomas) {
    try {
      const resposta = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          q: texto,
          source: "pt",
          target: idioma,
          format: "text"
        })
      });

      const dados = await resposta.json();

      const div = document.createElement("div");
      div.classList.add("output");
      div.innerHTML = `<strong>${nomeDoIdioma(idioma)}:</strong><br>${dados.translatedText}`;
      outputArea.appendChild(div);
    } catch (erro) {
      const div = document.createElement("div");
      div.classList.add("output");
      div.innerHTML = `<strong>${nomeDoIdioma(idioma)}:</strong><br>Erro ao traduzir.`;
      outputArea.appendChild(div);
    }
  }
}

function nomeDoIdioma(codigo) {
  const nomes = {
    en: "Inglês",
    es: "Espanhol",
    fr: "Francês",
    de: "Alemão",
    it: "Italiano"
  };
  return nomes[codigo] || codigo;
}
