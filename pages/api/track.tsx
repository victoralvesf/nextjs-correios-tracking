// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { getPackageStatus } from '../service/trackService'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.code) {
    return res.status(401).json({
      message: 'Query param code is required',
      example: '/api/track?code=TRACKING_CODE'
    })
  }

  const code = String(req.query.code)

  const track = await getPackageStatus(code);

  res.status(200).json(track)
}
