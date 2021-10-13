import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { date, number } = req.body

  try {
    const result = await prisma.leitura.create({
      data: {
        date,
        value: number
      }
    })

    return res.status(200).json(result)
  } catch(err) {
    console.log(err)
    return res.status(400).json({ error: 'Erro ao inserir no BD' })
  }
}