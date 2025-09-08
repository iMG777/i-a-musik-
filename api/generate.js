export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.sunoapi.org/api/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.SUNO_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,                // obrigatório
        model: "V3_5",         // pode ser V4, V4_5 etc
        customMode: false,     // não precisa de style/title
        callBackUrl: "https://i-a-musik-.vercel.app/api/callback"
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao gerar música" });
  }
}
