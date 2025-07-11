async function traduzirTexto() {
  const texto = document.getElementById("inputText").value;
  const idiomaDestino = document.getElementById("targetLanguage").value;

  const resposta = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: texto,
      source: "pt",
      target: idiomaDestino,
      format: "text"
    })
  });

  const dados = await resposta.json();
  document.getElementById("outputText").textContent = dados.translatedText;
}
