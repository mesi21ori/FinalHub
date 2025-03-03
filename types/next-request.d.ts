// types/next-request.d.ts
import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';

export interface NextApiRequestWithFile extends NextApiRequest {
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  };
}

// Extend the NextApiRequest type to include the file property
declare module 'next' {
  interface NextApiRequest {
    file?: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    };
    body: {
      email: string;
      password: string;
      username: string;
      institutionId?: number;
      subscriptionId?: string;
    };
  }
}

// Extend the IncomingMessage type for multer compatibility
export interface MulterRequest extends IncomingMessage {
  file: Express.Multer.File;
}
