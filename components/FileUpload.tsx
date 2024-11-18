// // components/FileUpload.tsx
// import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import axios from 'axios';

// // Define a type for the form data
// interface FormDataType {
//   title: string;
//   description: string;
//   contentType: string;
//   accessLevel: string;
//   uploaderId: string; 
//   historyCategory: string; 
// }

// export default function FileUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [formData, setFormData] = useState<FormDataType>({
//     title: '',
//     description: '',
//     contentType: 'TEXT',
//     accessLevel: 'PUBLIC',
//     uploaderId: '',
//     historyCategory: 'MODERN_HISTORY' 
//   });
//   const [uploadStatus, setUploadStatus] = useState<string>('');

//   // Limit file size to 10MB
//   const MAX_FILE_SIZE = 10 * 1024 * 1024;

//   useEffect(() => {
//     // Retrieve uploader ID from local storage
//     const uploaderId = localStorage.getItem('userId');
//     if (uploaderId) {
//       setFormData(prevState => ({
//         ...prevState,
//         uploaderId: uploaderId,
//       }));
//     } else {
//       setUploadStatus('Uploader ID not found. Please log in.');
//     }
//   }, []);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       if (selectedFile.size > MAX_FILE_SIZE) {
//         setUploadStatus('File size exceeds the 10MB limit.');
//         setFile(null);
//       } else {
//         setFile(selectedFile);
//         setUploadStatus('');
//       }
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       setUploadStatus('Please select a valid file to upload');
//       return;
//     }

//     // Validate contentType, accessLevel, and historyCategory
//     const validContentTypes = ['VIDEO', 'BOOK', 'TEXT', 'MUSIC', 'PHOTO'];
//     const validAccessLevels = ['PRIVATE', 'PUBLIC', 'RESTRICTED'];
//     const validHistoryCategories = ['MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'EARLY_HISTORY'];

//     if (!validContentTypes.includes(formData.contentType)) {
//       setUploadStatus('Invalid content type');
//       return;
//     }

//     if (!validAccessLevels.includes(formData.accessLevel)) {
//       setUploadStatus('Invalid access level');
//       return;
//     }

//     if (!validHistoryCategories.includes(formData.historyCategory)) {
//       setUploadStatus('Invalid history category');
//       return;
//     }

//     const form = new FormData();
//     form.append('file', file);
//     form.append('title', formData.title);
//     form.append('description', formData.description);
//     form.append('contentType', formData.contentType);
//     form.append('accessLevel', formData.accessLevel);
//     form.append('uploaderId', formData.uploaderId);
//     form.append('historyCategory', formData.historyCategory);

//     // Debug log
//     console.log('Submitting the following data:', {
//       file: file.name,
//       ...formData,
//     });

//     try {
//       setUploadStatus('Uploading...');
//       const response = await axios.post('/api/content/upload', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setUploadStatus('File uploaded successfully!');
//       console.log('Response:', response.data);
      
//       // Reset form
//       setFormData({
//         title: '',
//         description: '',
//         contentType: 'TEXT',
//         accessLevel: 'PUBLIC',
//         uploaderId: formData.uploaderId, 
//         historyCategory: 'MODERN_HISTORY', 
//       });
//       setFile(null);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         setUploadStatus(`Error uploading file: ${error.response.data.message}`);
//       } else {
//         setUploadStatus('Error uploading file');
//       }
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Upload a File</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description">Description</label>
//           <textarea
//             name="description"
//             id="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="contentType">Content Type</label>
//           <select
//             name="contentType"
//             id="contentType"
//             value={formData.contentType}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="TEXT">Text</option>
//             <option value="PHOTO">Image</option>
//             <option value="VIDEO">Video</option>
//             <option value="MUSIC">Music</option>
//             <option value="BOOK">Book</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="accessLevel">Access Level</label>
//           <select
//             name="accessLevel"
//             id="accessLevel"
//             value={formData.accessLevel}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="PUBLIC">Public</option>
//             <option value="PRIVATE">Private</option>
//             <option value="RESTRICTED">Restricted</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="historyCategory">History Category</label>
//           <select
//             name="historyCategory"
//             id="historyCategory"
//             value={formData.historyCategory}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="MODERN_HISTORY">Modern History</option>
//             <option value="MEDIEVAL_HISTORY">Medieval History</option>
//             <option value="EARLY_HISTORY">Early History</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="file">File</label>
//           <input type="file" id="file" onChange={handleFileChange} required />
//         </div>

//         <button type="submit">Upload</button>
//       </form>

//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// }




// // components/FileUpload.tsx
// import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import axios from 'axios';

// interface FormDataType {
//   title: string;
//   description: string;
//   contentType: string;
//   accessLevel: string;
//   uploaderId: string; 
//   historyCategory: string; 
// }

// export default function FileUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [formData, setFormData] = useState<FormDataType>({
//     title: '',
//     description: '',
//     contentType: 'TEXT',
//     accessLevel: 'PUBLIC',
//     uploaderId: '',
//     historyCategory: 'MODERN_HISTORY' 
//   });
//   const [uploadStatus, setUploadStatus] = useState<string>('');

//   const MAX_FILE_SIZE = 10 * 1024 * 1024;

//   useEffect(() => {
//     const uploaderId = localStorage.getItem('userId');
//     if (uploaderId) {
//       setFormData(prevState => ({
//         ...prevState,
//         uploaderId: uploaderId,
//       }));
//     } else {
//       setUploadStatus('Uploader ID not found. Please log in.');
//     }
//   }, []);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       if (selectedFile.size > MAX_FILE_SIZE) {
//         setUploadStatus('File size exceeds the 10MB limit.');
//         setFile(null);
//       } else {
//         setFile(selectedFile);
//         setUploadStatus('');
//       }
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       setUploadStatus('Please select a valid file to upload');
//       return;
//     }

//     const validContentTypes = ['VIDEO', 'BOOK', 'TEXT', 'MUSIC', 'PHOTO'];
//     const validAccessLevels = ['PRIVATE', 'PUBLIC', 'RESTRICTED'];
//     const validHistoryCategories = ['MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'EARLY_HISTORY'];

//     if (!validContentTypes.includes(formData.contentType)) {
//       setUploadStatus('Invalid content type');
//       return;
//     }

//     if (!validAccessLevels.includes(formData.accessLevel)) {
//       setUploadStatus('Invalid access level');
//       return;
//     }

//     if (!validHistoryCategories.includes(formData.historyCategory)) {
//       setUploadStatus('Invalid history category');
//       return;
//     }

//     const form = new FormData();
//     form.append('file', file);
//     form.append('title', formData.title);
//     form.append('description', formData.description);
//     form.append('contentType', formData.contentType);
//     form.append('accessLevel', formData.accessLevel);
//     form.append('uploaderId', formData.uploaderId);
//     form.append('historyCategory', formData.historyCategory);

//     console.log('Submitting the following data:', {
//       file: file.name,
//       ...formData,
//     });

//     try {
//       setUploadStatus('Uploading...');
//       const response = await axios.post('/api/content/upload', form, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setUploadStatus('File uploaded successfully!');
//       console.log('Response:', response.data);
      
//       setFormData({
//         title: '',
//         description: '',
//         contentType: 'TEXT',
//         accessLevel: 'PUBLIC',
//         uploaderId: formData.uploaderId, 
//         historyCategory: 'MODERN_HISTORY', 
//       });
//       setFile(null);
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         setUploadStatus(`Error uploading file: ${error.response.data.message}`);
//       } else {
//         setUploadStatus('Error uploading file');
//       }
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e5e5cb] p-6 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">Upload a File</h1>
//       <form onSubmit={handleSubmit} className="bg-[#e5e5cb] border border-[#3C2A21] shadow-lg rounded-lg p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-[#3C2A21] mb-1">Title</label>
//           <input
//             type="text"
//             name="title"
//             id="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//             className="border border-[#3C2A21] rounded-lg w-full p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="description" className="block text-[#3C2A21] mb-1">Description</label>
//           <textarea
//             name="description"
//             id="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             required
//             className="border border-[#3C2A21] rounded-lg w-full p-2"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="contentType" className="block text-[#3C2A21] mb-1">Content Type</label>
//           <select
//             name="contentType"
//             id="contentType"
//             value={formData.contentType}
//             onChange={handleInputChange}
//             required
//             className="border border-[#3C2A21] rounded-lg w-full p-2"
//           >
//             <option value="TEXT">Text</option>
//             <option value="PHOTO">Image</option>
//             <option value="VIDEO">Video</option>
//             <option value="MUSIC">Music</option>
//             <option value="BOOK">Book</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="accessLevel" className="block text-[#3C2A21] mb-1">Access Level</label>
//           <select
//             name="accessLevel"
//             id="accessLevel"
//             value={formData.accessLevel}
//             onChange={handleInputChange}
//             required
//             className="border border-[#3C2A21] rounded-lg w-full p-2"
//           >
//             <option value="PUBLIC">Public</option>
//             <option value="PRIVATE">Private</option>
//             <option value="RESTRICTED">Restricted</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="historyCategory" className="block text-[#3C2A21] mb-1">History Category</label>
//           <select
//             name="historyCategory"
//             id="historyCategory"
//             value={formData.historyCategory}
//             onChange={handleInputChange}
//             required
//             className="border border-[#3C2A21] rounded-lg w-full p-2"
//           >
//             <option value="MODERN_HISTORY">Modern History</option>
//             <option value="MEDIEVAL_HISTORY">Medieval History</option>
//             <option value="EARLY_HISTORY">Early History</option>
//           </select>
//         </div>

//         <div className="mb-4 col-span-2">
//           <label htmlFor="file" className="block text-[#3C2A21] mb-1">File</label>
//           <input 
//             type="file" 
//             id="file" 
//             onChange={handleFileChange} 
//             required
//             className="border border-[#3C2A21] rounded-lg w-full p-2"
//           />
//         </div>

//         <button type="submit" className="bg-[#3C2A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B3B31] transition col-span-2">
//           Upload
//         </button>
//       </form>

//       {uploadStatus && <p className="text-white mt-4">{uploadStatus}</p>}
//     </div>
//   );
// }

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

interface FormDataType {
  title: string;
  description: string;
  contentType: string;
  accessLevel: string;
  uploaderId: string; 
  historyCategory: string; 
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    description: '',
    contentType: 'TEXT',
    accessLevel: 'PUBLIC',
    uploaderId: '',
    historyCategory: 'MODERN_HISTORY' 
  });
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10 MB

  useEffect(() => {
    const uploaderId = localStorage.getItem('userId');
    if (uploaderId) {
      setFormData(prevState => ({
        ...prevState,
        uploaderId: uploaderId,
      }));
    } else {
      setUploadStatus('Uploader ID not found. Please log in.');
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > MAX_FILE_SIZE) {
        setUploadStatus('File size exceeds the 10MB limit.');
        setFile(null);
      } else {
        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
        const mimeType = selectedFile.type;
      
        const isValidType = validateFileType(fileExtension, mimeType);
        
        if (isValidType) {
          setFile(selectedFile);
          setUploadStatus('');
        } else {
          setUploadStatus('Invalid file type. Please upload a valid file.');
          setFile(null);
        }
      }
    }
  };

  const validateFileType = (fileExtension: string | undefined, mimeType: string): boolean => {
    const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'];
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv'];
    const bookExtensions = ['pdf', 'epub', 'mobi'];
    const textExtensions = ['txt', 'md', 'docx', 'rtf'];

    const validPhotoMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'];
    const validVideoMimeTypes = ['video/mp4', 'video/avi', 'video/x-matroska', 'video/webm', 'video/quicktime'];
    const validBookMimeTypes = ['application/pdf', 'application/epub+zip', 'application/x-mobi'];
    const validTextMimeTypes = ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (fileExtension) {
      const fileExtensionLower = fileExtension.toLowerCase();

      // Check file extension
      if (formData.contentType === 'PHOTO' && photoExtensions.includes(fileExtensionLower)) {
        return true;
      } 
      if (formData.contentType === 'VIDEO' && videoExtensions.includes(fileExtensionLower)) {
        return true;
      }
      if (formData.contentType === 'BOOK' && bookExtensions.includes(fileExtensionLower)) {
        return true;
      }
      if (formData.contentType === 'TEXT' && textExtensions.includes(fileExtensionLower)) {
        return true;
      }
    }

    // Check MIME type as fallback if extension is not enough
    if (mimeType) {
      switch (formData.contentType) {
        case 'PHOTO':
          return validPhotoMimeTypes.includes(mimeType);
        case 'VIDEO':
          return validVideoMimeTypes.includes(mimeType);
        case 'BOOK':
          return validBookMimeTypes.includes(mimeType);
        case 'TEXT':
          return validTextMimeTypes.includes(mimeType);
        default:
          return false;
      }
    }

    return false;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus('Please select a valid file to upload');
      return;
    }

    const validContentTypes = ['VIDEO', 'BOOK', 'TEXT', 'MUSIC', 'PHOTO'];
    const validAccessLevels = ['PRIVATE', 'PUBLIC', 'RESTRICTED'];
    const validHistoryCategories = ['MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'EARLY_HISTORY'];

    if (!validContentTypes.includes(formData.contentType)) {
      setUploadStatus('Invalid content type');
      return;
    }

    if (!validAccessLevels.includes(formData.accessLevel)) {
      setUploadStatus('Invalid access level');
      return;
    }

    if (!validHistoryCategories.includes(formData.historyCategory)) {
      setUploadStatus('Invalid history category');
      return;
    }

    const form = new FormData();
    form.append('file', file);
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('contentType', formData.contentType);
    form.append('accessLevel', formData.accessLevel);
    form.append('uploaderId', formData.uploaderId);
    form.append('historyCategory', formData.historyCategory);

    console.log('Submitting the following data:', {
      file: file.name,
      ...formData,
    });

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('/api/content/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('File uploaded successfully!');
      console.log('Response:', response.data);
      
      setFormData({
        title: '',
        description: '',
        contentType: 'TEXT',
        accessLevel: 'PUBLIC',
        uploaderId: formData.uploaderId, 
        historyCategory: 'MODERN_HISTORY', 
      });
      setFile(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setUploadStatus(`Error uploading file: ${error.response.data.message}`);
      } else {
        setUploadStatus('Error uploading file');
      }
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e5e5cb] p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">Upload a File</h1>
      <form onSubmit={handleSubmit} className="bg-[#e5e5cb] border border-[#3C2A21] shadow-lg rounded-lg p-6 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-[#3C2A21] mb-1">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="border border-[#3C2A21] bg-[#e5e5cb] rounded-lg w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-[#3C2A21] mb-1">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="border border-[#3C2A21] bg-[#e5e5cb] rounded-lg w-full p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="contentType" className="block text-[#3C2A21] mb-1">Content Type</label>
          <select
            name="contentType"
            id="contentType"
            value={formData.contentType}
            onChange={handleInputChange}
            required
            className="border border-[#3C2A21] bg-[#e5e5cb] rounded-lg w-full p-2"
          >
            <option value="TEXT">Text</option>
            <option value="PHOTO">Image</option>
            <option value="VIDEO">Video</option>
            <option value="MUSIC">Music</option>
            <option value="BOOK">Book</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="accessLevel" className="block text-[#3C2A21] mb-1">Access Level</label>
          <select
            name="accessLevel"
            id="accessLevel"
            value={formData.accessLevel}
            onChange={handleInputChange}
            required
            className="border border-[#3C2A21]  bg-[#e5e5cb] rounded-lg w-full p-2"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
            <option value="RESTRICTED">Restricted</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="historyCategory" className="block text-[#3C2A21] mb-1">History Category</label>
          <select
            name="historyCategory"
            id="historyCategory"
            value={formData.historyCategory}
            onChange={handleInputChange}
            required
            className="border border-[#3C2A21] bg-[#e5e5cb] rounded-lg w-full p-2"
          >
            <option value="MODERN_HISTORY">Modern History</option>
            <option value="MEDIEVAL_HISTORY">Medieval History</option>
            <option value="EARLY_HISTORY">Early History</option>
          </select>
        </div>

        <div className="mb-4 col-span-2">
          <label htmlFor="file" className="block text-[#3C2A21] mb-1">File</label>
          <input 
            type="file" 
            id="file" 
            onChange={handleFileChange} 
            required
            className="border border-[#3C2A21] bg-[#e5e5cb] rounded-lg w-full p-2"
          />
        </div>

        <button type="submit" className="bg-[#3C2A21] text-white px-4 py-2 rounded-lg hover:bg-[#4B3B31] transition col-span-2">
          Upload
        </button>
      </form>

      {uploadStatus && <p className="text-white mt-4">{uploadStatus}</p>}
    </div>
  );
}
