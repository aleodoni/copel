import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  try {
    const result = await prisma.$queryRaw`SELECT * FROM "Leitura" where id = (select max(id) from "Leitura")`;
    return res.status(200).json(result[0])
  } catch(err) {
    console.log(err)
    return res.status(400).json({ error: 'Erro ao ler do BD' })
  }
}