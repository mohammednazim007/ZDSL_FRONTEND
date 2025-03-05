/* eslint-disable import/no-extraneous-dependencies */

import nodemailer from 'nodemailer'
import { NextApiRequest, NextApiResponse } from 'next' // For Next.js API route types

async function sendMail(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Destructure environment variables with proper type checks
  const { STP_EMAIL, EMAIL_PASS } = process.env

  if (!STP_EMAIL || !EMAIL_PASS) {
    res.status(500).json({ message: 'Email configuration is missing' })
    return
  }

  if (req.method === 'POST') {
    // Validate request body
    const { to, subject, body }: { to: string; subject: string; body: string } =
      req.body

    if (!to || !subject || !body) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: STP_EMAIL,
        pass: EMAIL_PASS,
      },
    })

    // Mail options
    const mailOptions = {
      from: STP_EMAIL,
      to,
      subject,
      text: body,
    }

    try {
      // Send email
      await transporter.sendMail(mailOptions)
      res.status(200).json({ message: 'Email sent successfully' })
    } catch (error: unknown) {
      // Type-check error and ensure proper typing
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      console.error('Error sending email:', error)
      res
        .status(500)
        .json({ message: 'Error sending email', error: errorMessage })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}

export default sendMail
