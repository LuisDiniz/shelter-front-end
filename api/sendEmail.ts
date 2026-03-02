import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const formspreeEndpoint = process.env.FORM_ENDPOINT_ADOPTION

    if (!formspreeEndpoint) {
      console.error('FORM_ENDPOINT_ADOPTION environment variable is not configured')
      return res.status(500).json({ message: 'Server configuration error: email service not configured' })
    }

    const {
      fullName,
      animalName,
      email,
      phone,
      requestType
    } = req.body

    const json = JSON.stringify({
        "Nome Completo": fullName,
        "Animal": animalName,
        "Email": email,
        "Telefone": phone,
        "Tipo": requestType
    })

    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    })

    const data = await response.json()
    if (!data.ok) {
      return res.status(400).json({ message: `Failed to send email.` })
    }

    return res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error}.` })
  }
}