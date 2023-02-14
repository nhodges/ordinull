// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import parse from 'node-html-parser'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const uri = 'https://ordinals.com/inscriptions'
  const response = await fetch(uri)
  const data = await response.text()
  const html = parse(data)
  const nodeList = html.querySelectorAll('.thumbnails > a')
  const nodeArray = Array.prototype.slice.call(nodeList)
  const inscriptions = nodeArray.map(node => {
    const inscriptionId = node.getAttribute('href').replace('/inscription/', '')
    return inscriptionId
  })

  res.status(200).json(inscriptions)
}
