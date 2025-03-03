import React from 'react';
import Button from './Button'; // Import the Button component

interface DocumentViewerProps {
  documentUrl: string;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#f7f4f0] p-4 rounded shadow-xl max-w-4xl w-full relative">
        <Button
          onClick={onClose}  
          variant="view" 
          className="absolute top-0 right-0 mt-6 mr-4 text-white p-2" 
        >
          Close Document
        </Button>
        <iframe
          src={documentUrl}
          title="Document Viewer"
          width="100%"
          height="600"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default DocumentViewer;