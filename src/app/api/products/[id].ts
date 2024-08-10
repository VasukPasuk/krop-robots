import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query;

  if (req.method === 'GET') {
    res.status(200).json({ message: `Product: ${name}` });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}