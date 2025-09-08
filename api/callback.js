let lastSong = null; // guarda última música gerada

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("🎵 Callback recebido:", req.body);

    // Salva última música recebida
    lastSong = req.body;

    return res.status(200).json({ ok: true });
  }

  if (req.method === "GET") {
    if (!lastSong) {
      return res.status(200).json({ status: "pending" });
    }

    return res.status(200).json({
      status: "completed",
      data: lastSong
    });
  }

  res.status(405).json({ error: "Método não permitido" });
}
