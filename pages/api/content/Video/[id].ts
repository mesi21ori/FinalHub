// pages/api/content/update-active/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updateVideoStatus } from './db';

const updateActiveStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; // Get the ID from the URL
  const { isActive } = req.body; // Get the new status from the request body

  if (req.method === 'PATCH') {
    try {
      // Call a function to update the database
      const updatedContent = await updateVideoStatus(Number(id), isActive);

      if (updatedContent) {
        return res.status(200).json(updatedContent);
      } else {
        return res.status(404).json({ message: 'Content not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error updating status' });
    }
  } else {
    // Only allow PATCH method
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default updateActiveStatus;
