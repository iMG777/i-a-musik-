export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt é obrigatório" });
  }

  try {
    const response = await fetch("https://api.sunoapi.org/api/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SUNO_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        model: "V3_5",
        customMode: false,
        callBackUrl: "https://i-a-musik-2u6hw6cwv-dev-mgs-projects.vercel.app/api/callback"
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Erro no generate:", error);
    res.status(500).json({ error: "Erro interno ao gerar música" });
  }
}
