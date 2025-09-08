const generateBtn = document.getElementById("generateBtn");
const resultDiv = document.getElementById("result");

console.log("🎬 script.js carregado com sucesso");


generateBtn.onclick = async () => {
  const promptText = document.getElementById("prompt").value;
  if (!promptText) {
    alert("Digite uma descrição da música!");
    return;
  }

  resultDiv.textContent = "🎵 Enviando pedido...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await response.json();
    console.log("Resposta do generate:", data);

    if (data.code === 200) {
      resultDiv.textContent = "⏳ Música sendo processada! Aguarde o callback...";
    } else {
      resultDiv.textContent = "❌ Erro: " + JSON.stringify(data);
    }
  } catch (err) {
    resultDiv.textContent = "⚠️ Erro ao chamar API: " + err;
  }
};
