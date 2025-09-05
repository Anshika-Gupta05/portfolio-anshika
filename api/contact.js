import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const formData = req.body;

    const params = new URLSearchParams();
    for (const key in formData) {
      params.append(key, formData[key]);
    }

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwFc-tIg5vFJ80fP9s8FQKTL5ApWE2DDcH_ZedSa9q1Fjj2ukaS48Xb0IA9E0gd1Pg6pQ/exec",
      {
        method: "POST",
        body: params,
      }
    );

    const result = await response.json();

    // return success to frontend
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
