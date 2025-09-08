let lastSong = null;

export default async function handler(req, res) {
  if (req.method === "POST") {
    lastSong = req.body;
    return res.status(200).json({ ok: true });
  }

  if (req.method === "GET") {
    if (!lastSong) return res.status(200).json({ status: "pending" });
    return res.status(200).json({ status: "completed", data: lastSong });
  }

  res.status(405).json({ error: "Método não permitido" });
}
