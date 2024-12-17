// import axios from 'axios';
// import React, { useState } from 'react';

// // TypeScript interface for form data
// interface VideoFormData {
//     title: string;
//     description: string;
//     fileUrl: string;
//     accessLevel: string;
//     category: string;
//     publisher: string;
//     language: string;
//     subtitles: string;
//     duration: string;
//     publicationDate: string;
//     preservationStatus: string;
//     primarySource: boolean;
//     eventDate: string;
//     location: string;
//     eventType: string;
//     significance: string;
//     historicalFigures: string;
//     director: string;
//     producer: string;
//     cast: string;
//     relatedArtifacts: string;
//     ageRating: string;
// }

// const UploadVideo = () => {
//     const [formData, setFormData] = useState<VideoFormData>({
//         title: '',
//         description: '',
//         fileUrl: '',
//         accessLevel: 'PRIVATE',
//         category: 'MODERN_HISTORY',
//         publisher: '',
//         language: '',
//         subtitles: '',
//         duration: '',
//         publicationDate: '',
//         preservationStatus: '',
//         primarySource: false,
//         eventDate: '',
//         location: '',
//         eventType: '',
//         significance: '',
//         historicalFigures: '',
//         director: '',
//         producer: '',
//         cast: '',
//         relatedArtifacts: '',
//         ageRating: '',
//     });

//     // Handle form input changes
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, type } = e.target;
//         if (type === 'checkbox') {
//             const target = e.target as HTMLInputElement; 
//             setFormData({
//                 ...formData,
//                 [name]: target.checked, 
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: e.target.value,
//             });
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Get uploaderId and institutionId from localStorage
//         const uploaderId = localStorage.getItem('userId');
//         const institutionId = localStorage.getItem('institutionId');

//         // Ensure uploaderId and institutionId are retrieved
//         if (!uploaderId || !institutionId) {
//             console.error("Uploader ID or Institution ID missing from localStorage");
//             return;
//         }

//         // Convert subtitles, historicalFigures, and cast to arrays
//         const subtitlesArray = formData.subtitles.split(',').map(subtitle => subtitle.trim());
//         const historicalFiguresArray = formData.historicalFigures.split(',').map(figure => figure.trim());
//         const castArray = formData.cast.split(',').map(cast => cast.trim());

//         // Convert relatedArtifacts to an array
//         const relatedArtifactsArray = formData.relatedArtifacts.split(',').map(artifact => artifact.trim());

//         // Ensure the publicationDate and eventDate are in ISO 8601 format
//         const formattedPublicationDate = new Date(formData.publicationDate).toISOString();
//         const formattedEventDate = new Date(formData.eventDate).toISOString();  // Convert eventDate

//         try {
//             const response = await axios.post('/api/content/upload', {
//                 ...formData,
//                 publicationDate: formattedPublicationDate, // Pass the formatted publicationDate
//                 eventDate: formattedEventDate, // Pass the formatted eventDate
//                 subtitles: subtitlesArray,  // Pass subtitles as an array
//                 historicalFigures: historicalFiguresArray,  // Pass historicalFigures as an array
//                 cast: castArray,  // Pass cast as an array
//                 relatedArtifacts: relatedArtifactsArray, // Pass relatedArtifacts as an array
//                 uploaderId,
//                 institutionId,
//             });
//             console.log('Upload successful:', response.data);
//         } catch (error) {
//             console.error('Error uploading video:', error);
//         }
//     };


//     return (
//         <div>
//             <h1>Upload New Video</h1>
//             <form onSubmit={handleSubmit}>
//                 <h2>Common Fields</h2>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                 />
//                 <br />
//                 <label>
//                     Description:
//                     <input
//                         type="text"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     File URL:
//                     <input
//                         type="text"
//                         name="fileUrl"
//                         value={formData.fileUrl}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Access Level:
//                     <select
//                         name="accessLevel"
//                         value={formData.accessLevel}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="PRIVATE">Private</option>
//                         <option value="PUBLIC">Public</option>
//                         <option value="RESTRICTED">Restricted</option>
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     Category:
//                     <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="MODERN_HISTORY">Modern History</option>
//                         <option value="MEDIEVAL_HISTORY">Medieval History</option>
//                         <option value="ANCIENT_HISTORY">Ancient History</option>
//                         <option value="ECONOMIC_HISTORY">Economic History</option>
//                         <option value="POLITICAL_HISTORY">Political History</option>
//                         <option value="ETHIOPIAN_REVOLUTION">Ethiopian Revolution</option>
//                         <option value="ETHIOPIAN_NATIONALISM">Ethiopian Nationalism</option>
//                         <option value="ETHIOPIAN_LITERATURE">Ethiopian Literature</option>
//                     </select>
//                 </label>
//                 <br />

//                 <h2>Video-Specific Fields</h2>
//                 <label>
//                     Publisher:
//                     <input
//                         type="text"
//                         name="publisher"
//                         value={formData.publisher}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Language:
//                     <input
//                         type="text"
//                         name="language"
//                         value={formData.language}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Subtitles:
//                     <input
//                         type="text"
//                         name="subtitles"
//                         value={formData.subtitles}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Duration:
//                     <input
//                         type="text"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Publication Date:
//                     <input
//                         type="text"
//                         name="publicationDate"
//                         value={formData.publicationDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <br />
//                 <label>
//                     Preservation Status:
//                     <input
//                         type="text"
//                         name="preservationStatus"
//                         value={formData.preservationStatus}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Primary Source:
//                     <input
//                         type="checkbox"
//                         name="primarySource"
//                         checked={formData.primarySource}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Event Date:
//                     <input
//                         type="date"
//                         name="eventDate"
//                         value={formData.eventDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Location:
//                     <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Event Type:
//                     <input
//                         type="text"
//                         name="eventType"
//                         value={formData.eventType}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Significance:
//                     <input
//                         type="text"
//                         name="significance"
//                         value={formData.significance}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Historical Figures:
//                     <input
//                         type="text"
//                         name="historicalFigures"
//                         value={formData.historicalFigures}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Director:
//                     <input
//                         type="text"
//                         name="director"
//                         value={formData.director}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Producer:
//                     <input
//                         type="text"
//                         name="producer"
//                         value={formData.producer}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cast:
//                     <input
//                         type="text"
//                         name="cast"
//                         value={formData.cast}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Related Artifacts:
//                     <input
//                         type="text"
//                         name="relatedArtifacts"
//                         value={formData.relatedArtifacts}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Age Rating:
//                     <input
//                         type="text"
//                         name="ageRating"
//                         value={formData.ageRating}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Upload Video</button>
//             </form>
//         </div>
//     );
// };

// export default UploadVideo;


// import axios from 'axios';
// import React, { useState } from 'react';

// // TypeScript interface for form data
// interface VideoFormData {
//     title: string;
//     description: string;
//     fileUrl: string;
//     accessLevel: string;
//     category: string;
//     publisher: string;
//     copyrightHolder?: string;
//     language: string;
//     subtitles: string;
//     duration?: string;
//     publicationDate: string;
//     preservationStatus?: string;
//     primarySource?: boolean;
//     eventDate?: string;
//     location?: string;
//     eventType?: string;
//     significance?: string;
//     historicalFigures: string;
//     director?: string;
//     producer?: string;
//     cameramen: string;
//     cinematographer?: string;
//     cast: string;
//     relatedArtifacts: string;
//     ageRating?: string;
//     coverImage?: string;
// }

// const UploadVideo = () => {
//     const [formData, setFormData] = useState<VideoFormData>({
//         title: '',
//         description: '',
//         fileUrl: '',
//         accessLevel: 'PRIVATE',
//         category: 'MODERN_HISTORY',
//         publisher: '',
//         copyrightHolder: '',
//         language: '',
//         subtitles: '',
//         duration: '',
//         publicationDate: '',
//         preservationStatus: '',
//         primarySource: false,
//         eventDate: '',
//         location: '',
//         eventType: '',
//         significance: '',
//         historicalFigures: '',
//         director: '',
//         producer: '',
//         cameramen: '',
//         cinematographer: '',
//         cast: '',
//         relatedArtifacts: '',
//         ageRating: '',
//         coverImage: '',
//     });

//     // Handle form input changes
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, type } = e.target;
//         if (type === 'checkbox') {
//             const target = e.target as HTMLInputElement;
//             setFormData({
//                 ...formData,
//                 [name]: target.checked,
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: e.target.value,
//             });
//         }
//     };

//     const handleFileChange = async (
//         e: React.ChangeEvent<HTMLInputElement>,
//         fieldName: 'fileUrl' | 'coverImage'
//     ) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('/api/upload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [fieldName]: response.data.fileUrl, // Assuming your API returns the file URL
//             }));
//             console.log(`${fieldName} uploaded successfully:`, response.data.fileUrl);
//         } catch (error) {
//             console.error(`Error uploading ${fieldName}:`, error);
//         }
//     };  


//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Get uploaderId and institutionId from localStorage
//         const uploaderId = localStorage.getItem('userId');
//         const institutionId = localStorage.getItem('institutionId');

//         // Ensure uploaderId and institutionId are retrieved
//         if (!uploaderId || !institutionId) {
//             console.error("Uploader ID or Institution ID missing from localStorage");
//             return;
//         }

//         // Convert subtitles, historicalFigures, cameramen, cast, and relatedArtifacts to arrays
//         const subtitlesArray = formData.subtitles.split(',').map(subtitle => subtitle.trim());
//         const historicalFiguresArray = formData.historicalFigures.split(',').map(figure => figure.trim());
//         const cameramenArray = formData.cameramen.split(',').map(cameraman => cameraman.trim());
//         const castArray = formData.cast.split(',').map(cast => cast.trim());
//         const relatedArtifactsArray = formData.relatedArtifacts.split(',').map(artifact => artifact.trim());

//         // Ensure the publicationDate and eventDate are in ISO 8601 format
//         const formattedPublicationDate = new Date(formData.publicationDate).toISOString();
//         const formattedEventDate = formData.eventDate ? new Date(formData.eventDate).toISOString() : null; // Handle optional eventDate

//         try {
//             const response = await axios.post('/api/content/upload', {
//                 ...formData,
//                 publicationDate: formattedPublicationDate, // Pass the formatted publicationDate
//                 eventDate: formattedEventDate, // Pass the formatted eventDate (if available)
//                 subtitles: subtitlesArray,  // Pass subtitles as an array
//                 historicalFigures: historicalFiguresArray,  // Pass historicalFigures as an array
//                 cameramen: cameramenArray,  // Pass cameramen as an array
//                 cast: castArray,  // Pass cast as an array
//                 relatedArtifacts: relatedArtifactsArray, // Pass relatedArtifacts as an array
//                 uploaderId,
//                 institutionId,
//             });
//             console.log('Upload successful:', response.data);
//         } catch (error) {
//             console.error('Error uploading video:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Upload New Video</h1>
//             <form onSubmit={handleSubmit}>
//                 <h2>Common Fields</h2>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                 />
//                 <br />
//                 <label>
//                     Description:
//                     <input
//                         type="text"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                    <label>
//                     File:
//                     <input
//                         type="file"
//                         name="fileUrl"
//                         onChange={(e) => handleFileChange(e, 'fileUrl')}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Access Level:
//                     <select
//                         name="accessLevel"
//                         value={formData.accessLevel}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="PRIVATE">Private</option>
//                         <option value="PUBLIC">Public</option>
//                         <option value="RESTRICTED">Restricted</option>
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     Category:
//                     <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="MODERN_HISTORY">Modern History</option>
//                         <option value="MEDIEVAL_HISTORY">Medieval History</option>
//                         <option value="ANCIENT_HISTORY">Ancient History</option>
//                         <option value="ECONOMIC_HISTORY">Economic History</option>
//                         <option value="POLITICAL_HISTORY">Political History</option>
//                         <option value="ETHIOPIAN_REVOLUTION">Ethiopian Revolution</option>
//                         <option value="ETHIOPIAN_NATIONALISM">Ethiopian Nationalism</option>
//                         <option value="ETHIOPIAN_LITERATURE">Ethiopian Literature</option>
//                     </select>
//                 </label>
//                 <br />

//                 <h2>Video-Specific Fields</h2>
//                 <label>
//                     Publisher:
//                     <input
//                         type="text"
//                         name="publisher"
//                         value={formData.publisher}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Copyright Holder:
//                     <input
//                         type="text"
//                         name="copyrightHolder"
//                         value={formData.copyrightHolder}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Language:
//                     <input
//                         type="text"
//                         name="language"
//                         value={formData.language}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Subtitles (comma separated):
//                     <input
//                         type="text"
//                         name="subtitles"
//                         value={formData.subtitles}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Duration:
//                     <input
//                         type="text"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Publication Date:
//                     <input
//                         type="date"
//                         name="publicationDate"
//                         value={formData.publicationDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <br />
//                 <label>
//                     Preservation Status:
//                     <input
//                         type="text"
//                         name="preservationStatus"
//                         value={formData.preservationStatus}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Primary Source:
//                     <input
//                         type="checkbox"
//                         name="primarySource"
//                         checked={formData.primarySource}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Event Date:
//                     <input
//                         type="date"
//                         name="eventDate"
//                         value={formData.eventDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Location:
//                     <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Event Type:
//                     <input
//                         type="text"
//                         name="eventType"
//                         value={formData.eventType}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Significance:
//                     <input
//                         type="text"
//                         name="significance"
//                         value={formData.significance}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Historical Figures (comma separated):
//                     <input
//                         type="text"
//                         name="historicalFigures"
//                         value={formData.historicalFigures}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Director:
//                     <input
//                         type="text"
//                         name="director"
//                         value={formData.director}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Producer:
//                     <input
//                         type="text"
//                         name="producer"
//                         value={formData.producer}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cameramen (comma separated):
//                     <input
//                         type="text"
//                         name="cameramen"
//                         value={formData.cameramen}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cinematographer:
//                     <input
//                         type="text"
//                         name="cinematographer"
//                         value={formData.cinematographer}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cast (comma separated):
//                     <input
//                         type="text"
//                         name="cast"
//                         value={formData.cast}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Related Artifacts (comma separated):
//                     <input
//                         type="text"
//                         name="relatedArtifacts"
//                         value={formData.relatedArtifacts}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Age Rating:
//                     <input
//                         type="text"
//                         name="ageRating"
//                         value={formData.ageRating}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cover Image:
//                     <input
//                         type="file"
//                         name="coverImage"
//                         onChange={(e) => handleFileChange(e, 'coverImage')}
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default UploadVideo;


// import axios from 'axios';
// import React, { useState } from 'react';

// // TypeScript interface for form data
// interface VideoFormData {
//     title: string;
//     description: string;
//     fileUrl: string;
//     accessLevel: string;
//     category: string;
//     alternativeTitle: string; 
//     language: string;
//     subtitles: string;
//     genre: string; 
//     copyrightHolder?: string;
//     significance?: string;
//     historicalFigures: string;
//     publisher: string;
//     director?: string;
//     producer?: string;
//     cameraman: string; 
//     cinematographer?: string;
//     cast: string;
//     eventType?: string;
//     eventDate?: string;
//     preservationStatus?: string;
//     source?: string; 
//     ageRating?: string;
//     location?: string;
//     coverImage?: string;
//     resolution: string; 
//     duration?: string;
//     relatedArtifacts: string;
//     publicationDate: string;
// }

// const UploadVideo = () => {
//     const [formData, setFormData] = useState<VideoFormData>({
//         title: '',
//         description: '',
//         fileUrl: '',
//         accessLevel: 'PRIVATE',
//         category: 'MODERN_HISTORY',
//         alternativeTitle: '', 
//         language: '',
//         subtitles: '',
//         genre: '', 
//         copyrightHolder: '',
//         significance: '',
//         historicalFigures: '',
//         publisher: '',
//         director: '',
//         producer: '',
//         cameraman: '', 
//         cinematographer: '',
//         cast: '',
//         eventType: '',
//         eventDate: '',
//         preservationStatus: '',
//         source: '', 
//         ageRating: '',
//         location: '',
//         coverImage: '',
//         resolution: '', 
//         duration: '',
//         relatedArtifacts: '',
//         publicationDate: '',
//     });

//     // Handle form input changes
//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, type } = e.target;
//         if (type === 'checkbox') {
//             const target = e.target as HTMLInputElement;
//             setFormData({
//                 ...formData,
//                 [name]: target.checked,
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: e.target.value,
//             });
//         }
//     };

//     const handleFileChange = async (
//         e: React.ChangeEvent<HTMLInputElement>,
//         fieldName: 'fileUrl' | 'coverImage'
//     ) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('/api/upload', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [fieldName]: response.data.fileUrl, // Assuming your API returns the file URL
//             }));
//             console.log(`${fieldName} uploaded successfully:`, response.data.fileUrl);
//         } catch (error) {
//             console.error(`Error uploading ${fieldName}:`, error);
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         // Get uploaderId and institutionId from localStorage
//         const uploaderId = localStorage.getItem('userId');
//         const institutionId = localStorage.getItem('institutionId');

//         if (!uploaderId || !institutionId) {
//             console.error("Uploader ID or Institution ID missing from localStorage");
//             return;
//         }

//         // Split attributes into arrays where necessary
//         const subtitlesArray = formData.subtitles.split(',').map(subtitle => subtitle.trim());
//         const historicalFiguresArray = formData.historicalFigures.split(',').map(figure => figure.trim());
//         const cameramanArray = formData.cameraman.split(',').map(cameraman => cameraman.trim());
//         const castArray = formData.cast.split(',').map(cast => cast.trim());
//         const relatedArtifactsArray = formData.relatedArtifacts.split(',').map(artifact => artifact.trim());

//         const formattedPublicationDate = new Date(formData.publicationDate).toISOString();
//         const formattedEventDate = formData.eventDate ? new Date(formData.eventDate).toISOString() : null;

//         try {
//             const response = await axios.post('/api/content/upload', {
//                 ...formData,
//                 publicationDate: formattedPublicationDate,
//                 eventDate: formattedEventDate,
//                 subtitles: subtitlesArray,
//                 historicalFigures: historicalFiguresArray,
//                 cameraman: cameramanArray, 
//                 cast: castArray,
//                 relatedArtifacts: relatedArtifactsArray,
//                 uploaderId,
//                 institutionId,
//             });
//             console.log('Upload successful:', response.data);
//         } catch (error) {
//             console.error('Error uploading video:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Upload New Video</h1>
//             <form onSubmit={handleSubmit}>
//                 <h2>Common Fields</h2>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                     required
//                 />
//                 <br />
//                 <label>
//                     Description:
//                     <input
//                         type="text"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     File:
//                     <input
//                         type="file"
//                         name="fileUrl"
//                         onChange={(e) => handleFileChange(e, 'fileUrl')}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Access Level:
//                     <select
//                         name="accessLevel"
//                         value={formData.accessLevel}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="PRIVATE">Private</option>
//                         <option value="PUBLIC">Public</option>
//                         <option value="RESTRICTED">Restricted</option>
//                     </select>
//                 </label>
//                 <br />
//                 <label>
//                     Category:
//                     <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="MODERN_HISTORY">Modern History</option>
//                         <option value="MEDIEVAL_HISTORY">Medieval History</option>
//                         <option value="ANCIENT_HISTORY">Ancient History</option>
//                         <option value="ECONOMIC_HISTORY">Economic History</option>
//                         <option value="POLITICAL_HISTORY">Political History</option>
//                         <option value="ETHIOPIAN_REVOLUTION">Ethiopian Revolution</option>
//                         <option value="ETHIOPIAN_NATIONALISM">Ethiopian Nationalism</option>
//                         <option value="ETHIOPIAN_LITERATURE">Ethiopian Literature</option>
//                     </select>
//                 </label>
//                 <br />

//                 <h2>Video-Specific Fields</h2>
//                 <label>
//                     Publisher:
//                     <input
//                         type="text"
//                         name="publisher"
//                         value={formData.publisher}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Copyright Holder:
//                     <input
//                         type="text"
//                         name="copyrightHolder"
//                         value={formData.copyrightHolder}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Language:
//                     <input
//                         type="text"
//                         name="language"
//                         value={formData.language}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                 AlternativeTitle:
//                     <input
//                         type="text"
//                         name="AlternativeTitle"
//                         value={formData.alternativeTitle}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Subtitles (comma separated):
//                     <input
//                         type="text"
//                         name="subtitles"
//                         value={formData.subtitles}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Duration:
//                     <input
//                         type="text"
//                         name="duration"
//                         value={formData.duration}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                 Genre:
//                     <input
//                         type="text"
//                         name="Gener"
//                         value={formData.genre}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Publication Date:
//                     <input
//                         type="date"
//                         name="publicationDate"
//                         value={formData.publicationDate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <br />
//                 <label>
//                     Preservation Status:
//                     <input
//                         type="text"
//                         name="preservationStatus"
//                         value={formData.preservationStatus}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                    Source:
//                     <input
//                         type="text"
//                         name="source"
//                         value={formData.source}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Event Date:
//                     <input
//                         type="date"
//                         name="eventDate"
//                         value={formData.eventDate}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Location:
//                     <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Event Type:
//                     <input
//                         type="text"
//                         name="eventType"
//                         value={formData.eventType}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Significance:
//                     <input
//                         type="text"
//                         name="significance"
//                         value={formData.significance}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Historical Figures (comma separated):
//                     <input
//                         type="text"
//                         name="historicalFigures"
//                         value={formData.historicalFigures}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Director:
//                     <input
//                         type="text"
//                         name="director"
//                         value={formData.director}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Producer:
//                     <input
//                         type="text"
//                         name="producer"
//                         value={formData.producer}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cameraman (comma separated):
//                     <input
//                         type="text"
//                         name="cameraman"
//                         value={formData.cameraman}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cinematographer:
//                     <input
//                         type="text"
//                         name="cinematographer"
//                         value={formData.cinematographer}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cast (comma separated):
//                     <input
//                         type="text"
//                         name="cast"
//                         value={formData.cast}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Related Artifacts (comma separated):
//                     <input
//                         type="text"
//                         name="relatedArtifacts"
//                         value={formData.relatedArtifacts}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Age Rating:
//                     <input
//                         type="text"
//                         name="ageRating"
//                         value={formData.ageRating}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Cover Image:
//                     <input
//                         type="file"
//                         name="coverImage"
//                         onChange={(e) => handleFileChange(e, 'coverImage')}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Resolution:
//                     <input
//                         type="text"
//                         name="resolution"
//                         value={formData.resolution}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// };

// export default UploadVideo;

// import { useState } from 'react';

// const UploadVideoForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [accessLevel, setaccessLevel] = useState('');
//   const [category, setcategory] = useState('');
//   const [alternativeTitle, setAlternativeTitle] = useState('');
//   const [language, setLanguage] = useState('');
//   const [subtitles, setSubtitles] = useState('');
//   const [genre, setGenre] = useState('');
//   const [publisher, setPublisher] = useState('');
//   const [director, setDirector] = useState('');
//   const [producer, setProducer] = useState('');
//   const [cinematographer, setCinematographer] = useState('');
//   const [cast, setCast] = useState('');
//   const [eventType, setEventType] = useState('');
//   const [eventDate, setEventDate] = useState('');
//   const [preservationStatus, setPreservationStatus] = useState('');
//   const [source, setSource] = useState('');
//   const [ageRating, setAgeRating] = useState('');
//   const [location, setLocation] = useState('');
//   const [resolution, setResolution] = useState('');
//   const [duration, setDuration] = useState('');
//   const [relatedArtifacts, setrelatedArtifacts] = useState('');
//   const [publicationDate, setPublicationDate] = useState('');

//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setVideoFile(e.target.files[0]);
//     }
//   };

//   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setCoverImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Get uploaderId and institutionId from localStorage
//     const uploaderId = localStorage.getItem('uploaderId');
//     const institutionId = localStorage.getItem('institutionId');

//     if (!uploaderId || !institutionId || !videoFile || !coverImageFile) {
//       alert('Please provide all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('accessLevel', accessLevel);
//     formData.append('category', category);
//     formData.append('alternativeTitle', alternativeTitle);
//     formData.append('language', language);
//     formData.append('subtitles', subtitles);
//     formData.append('genre', genre);
//     formData.append('publisher', publisher);
//     formData.append('director', director);
//     formData.append('producer', producer);
//     formData.append('cinematographer', cinematographer);
//     formData.append('cast', cast);
//     formData.append('eventType', eventType);
//     formData.append('eventDate', eventDate);
//     formData.append('preservationStatus', preservationStatus);
//     formData.append('source', source);
//     formData.append('ageRating', ageRating);
//     formData.append('location', location);
//     formData.append('resolution', resolution);
//     formData.append('duration', duration);
//     formData.append('publicationDate', publicationDate);

//     formData.append('uploaderId', uploaderId); // from localStorage
//     formData.append('institutionId', institutionId); // from localStorage

//     formData.append('video', videoFile); // video file
//     formData.append('coverImage', coverImageFile); // cover image file

//     try {
//       const res = await fetch('/api/upload-video', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         alert('Upload successful');
//       } else {
//         const errorData = await res.json();
//         alert(errorData.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred during the upload.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="video">Video</label>
//         <input type="file" id="video" onChange={handleVideoChange} required />
//       </div>
//       <div>
//         <label htmlFor="coverImage">Cover Image</label>
//         <input type="file" id="coverImage" onChange={handleCoverImageChange} required />
//       </div>
//       <div>
//         <label htmlFor="alternativeTitle">Alternative Title</label>
//         <input
//           type="text"
//           id="alternativeTitle"
//           value={alternativeTitle}
//           onChange={(e) => setAlternativeTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="language">Language</label>
//         <input
//           type="text"
//           id="language"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="subtitles">Subtitles</label>
//         <input
//           type="text"
//           id="subtitles"
//           value={subtitles}
//           onChange={(e) => setSubtitles(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="genre">Genre</label>
//         <input
//           type="text"
//           id="genre"
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//         />
//       </div>
      
//       {/* Add other fields similarly */}
//       <button type="submit">Upload Video</button>
//     </form>
//   );
// };

// export default UploadVideoForm;


// import { useState } from 'react';

// const UploadVideoForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [accessLevel, setAccessLevel] = useState('PUBLIC');
//   const [category, setCategory] = useState('MODERN_HISTORY');
//   const [alternativeTitle, setAlternativeTitle] = useState('');
//   const [language, setLanguage] = useState('');
//   const [subtitles, setSubtitles] = useState('');
//   const [genre, setGenre] = useState('');
//   const [copyrightHolder, setCopyrightHolder] = useState('');
//   const [significance, setSignificance] = useState('');
//   const [historicalFigures, setHistoricalFigures] = useState('');
//   const [publisher, setPublisher] = useState('');
//   const [director, setDirector] = useState('');
//   const [producer, setProducer] = useState('');
//   const [cameraman, setCameraman] = useState('');
//   const [cinematographer, setCinematographer] = useState('');
//   const [cast, setCast] = useState('');
//   const [eventType, setEventType] = useState('');
//   const [eventDate, setEventDate] = useState('');
//   const [preservationStatus, setPreservationStatus] = useState('');
//   const [source, setSource] = useState('');
//   const [ageRating, setAgeRating] = useState('');
//   const [location, setLocation] = useState('');
//   const [resolution, setResolution] = useState('');
//   const [duration, setDuration] = useState('');
//   const [relatedArtifacts, setRelatedArtifacts] = useState('');
//   const [publicationDate, setPublicationDate] = useState('');

//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setVideoFile(e.target.files[0]);
//     }
//   };

//   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setCoverImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const uploaderId = localStorage.getItem('userId');
//     const institutionId = localStorage.getItem('institutionId');

//     if (!uploaderId || !institutionId) {
//       alert('Uploader ID or Institution ID is missing in localStorage.');
//       return;
//     }

//     if ( !videoFile ) {
//       alert('Please provide all video fields.');
//       return;
//     }
//     if ( !videoFile || !coverImageFile) {
//       alert('Please provide all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('accessLevel', accessLevel);
//     formData.append('category', category);
//     formData.append('alternativeTitle', alternativeTitle);
//     formData.append('language', language);
//     formData.append('subtitles', JSON.stringify(subtitles.split(',')));  // Storing as an array
//     formData.append('genre', genre);
//     formData.append('copyrightHolder', copyrightHolder);
//     formData.append('significance', significance);
//     formData.append('historicalFigures', JSON.stringify(historicalFigures.split(',')));  // Storing as an array
//     formData.append('publisher', publisher);
//     formData.append('director', director);
//     formData.append('producer', producer);
//     formData.append('cameraman', JSON.stringify(cameraman.split(',')));  // Storing as an array
//     formData.append('cinematographer', cinematographer);
//     formData.append('cast', JSON.stringify(cast.split(',')));  // Storing as an array
//     formData.append('eventType', eventType);
//     formData.append('eventDate', eventDate);
//     formData.append('preservationStatus', preservationStatus);
//     formData.append('source', source);
//     formData.append('ageRating', ageRating);
//     formData.append('location', location);
//     formData.append('resolution', resolution);
//     formData.append('duration', duration);
//     formData.append('relatedArtifacts', JSON.stringify(relatedArtifacts.split(',')));  // Storing as an array
//     formData.append('publicationDate', publicationDate);

//     formData.append('uploaderId', uploaderId);
//     formData.append('institutionId', institutionId);
//     formData.append('video', videoFile);
//     formData.append('coverImage', coverImageFile);

//     try {
//       const res = await fetch('/api/content/upload-video', {
//         method: 'POST',
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         alert('Upload successful');
//       } else {
//         const errorData = await res.json();
//         alert(errorData.message || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred during the upload.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="video">Video</label>
//         <input type="file" id="video" onChange={handleVideoChange} required />
//       </div>
//       <div>
//         <label htmlFor="coverImage">Cover Image</label>
//         <input type="file" id="coverImage" onChange={handleCoverImageChange} required />
//       </div>
//       <div>
//         <label htmlFor="alternativeTitle">Alternative Title</label>
//         <input
//           type="text"
//           id="alternativeTitle"
//           value={alternativeTitle}
//           onChange={(e) => setAlternativeTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="language">Language</label>
//         <input
//           type="text"
//           id="language"
//           value={language}
//           onChange={(e) => setLanguage(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="subtitles">Subtitles (comma-separated)</label>
//         <input
//           type="text"
//           id="subtitles"
//           value={subtitles}
//           onChange={(e) => setSubtitles(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="copyrightHolder">Copyright Holder</label>
//         <input
//           type="text"
//           id="copyrightHolder"
//           value={copyrightHolder}
//           onChange={(e) => setCopyrightHolder(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="significance">Significance</label>
//         <input
//           type="text"
//           id="significance"
//           value={significance}
//           onChange={(e) => setSignificance(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="historicalFigures">Historical Figures (comma-separated)</label>
//         <input
//           type="text"
//           id="historicalFigures"
//           value={historicalFigures}
//           onChange={(e) => setHistoricalFigures(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="publisher">Publisher</label>
//         <input
//           type="text"
//           id="publisher"
//           value={publisher}
//           onChange={(e) => setPublisher(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="director">Director</label>
//         <input
//           type="text"
//           id="director"
//           value={director}
//           onChange={(e) => setDirector(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="producer">Producer</label>
//         <input
//           type="text"
//           id="producer"
//           value={producer}
//           onChange={(e) => setProducer(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="cameraman">Cameraman (comma-separated)</label>
//         <input
//           type="text"
//           id="cameraman"
//           value={cameraman}
//           onChange={(e) => setCameraman(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="cinematographer">Cinematographer</label>
//         <input
//           type="text"
//           id="cinematographer"
//           value={cinematographer}
//           onChange={(e) => setCinematographer(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="cast">Cast (comma-separated)</label>
//         <input
//           type="text"
//           id="cast"
//           value={cast}
//           onChange={(e) => setCast(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="eventType">Event Type</label>
//         <input
//           type="text"
//           id="eventType"
//           value={eventType}
//           onChange={(e) => setEventType(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="eventDate">Event Date</label>
//         <input
//           type="date"
//           id="eventDate"
//           value={eventDate}
//           onChange={(e) => setEventDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="preservationStatus">Preservation Status</label>
//         <input
//           type="text"
//           id="preservationStatus"
//           value={preservationStatus}
//           onChange={(e) => setPreservationStatus(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="source">Source</label>
//         <input
//           type="text"
//           id="source"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="ageRating">Age Rating</label>
//         <input
//           type="text"
//           id="ageRating"
//           value={ageRating}
//           onChange={(e) => setAgeRating(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="location">Location</label>
//         <input
//           type="text"
//           id="location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="resolution">Resolution</label>
//         <input
//           type="text"
//           id="resolution"
//           value={resolution}
//           onChange={(e) => setResolution(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="duration">Duration</label>
//         <input
//           type="text"
//           id="duration"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="relatedArtifacts">Related Artifacts (comma-separated)</label>
//         <input
//           type="text"
//           id="relatedArtifacts"
//           value={relatedArtifacts}
//           onChange={(e) => setRelatedArtifacts(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="publicationDate">Publication Date</label>
//         <input
//           type="date"
//           id="publicationDate"
//           value={publicationDate}
//           onChange={(e) => setPublicationDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="accessLevel">Access Level</label>
//         <select
//           id="accessLevel"
//           value={accessLevel}
//           onChange={(e) => setAccessLevel(e.target.value)}
//         >
//           <option value="PUBLIC">Public</option>
//           <option value="PRIVATE">Private</option>
//           <option value="RESTRICTED">Restricted</option>
//         </select>
//       </div>
//       <div>
//         <label htmlFor="category">Category</label>
//         <select
//           id="category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="MODERN_HISTORY">Modern History</option>
//           <option value="MEDIEVAL_HISTORY">Medieval History</option>
//           <option value="ANCIENT_HISTORY">Ancient History</option>
//           <option value="ECONOMIC_HISTORY">Economic History</option>
//           <option value="POLITICAL_HISTORY">Political History</option>
//           <option value="ETHIOPIAN_REVOLUTION">Ethiopian Revolution</option>
//           <option value="ETHIOPIAN_NATIONALISM">Ethiopian Nationalism</option>
//           <option value="ETHIOPIAN_LITERATURE">Ethiopian Literature</option>
//         </select>
//       </div>
//       <button type="submit">Upload Video</button>
//     </form>
//   );
// };

// export default UploadVideoForm;


"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { faArrows } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import CustomDropdown from "./CustomDropdown";
import CustomRadioButton from "./CustomRadioButton";
import DatePicker from "./DatePicker";
import DynamicFields from "./DynamicFields";
import InputField from "./InputField";
import TimePicker from "./TimePicker";


// Validation schema using Yup
const videoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  //alternativeTitle: Yup.string().required("AlternativeTitle is required"),
  description: Yup.string().required("Description is required"),
  publisher: Yup.string().required("Publisher is required"),
  copyrightHolder: Yup.string().required("Copyright Holder is required"),
  language: Yup.string().required("Language is required"),
  subtitles: Yup.string().optional(),
  duration: Yup.string().required("Duration is required"),
  director: Yup.string().optional(),
  producer: Yup.string().optional(),
  cameraman: Yup.string().optional(),
  cinematographer: Yup.string().optional(),
  cast: Yup.string().optional(),
  preservationStatus: Yup.string().required("Preservation Status is required"),
  source: Yup.string().required("Source is required"),
  eventDate: Yup.string().required("Event Date is required"),
  //publicationDate: Yup.string().required(" publication Date is required"),
  location: Yup.string().required("Location is required"),
  eventType: Yup.string().required("Event Type is required"),
  significance: Yup.string().required("Significance is required"),
  historicalFigures: Yup.string().required("Historical Figures is required"),
  //accessLevel: Yup.string().required("AccessLevel is required"),
  ageRating: Yup.string().required("Age Rating is required"),
  videoUrl: Yup.mixed()
    .required("Video URL is required")
    .test("fileType", "Unsupported file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("video/");
    }),
  coverImage: Yup.mixed()
    .required("Cover Image is required")
    .test("fileType", "Unsupported file type", (value) => {
      const file = value as File;
      return file && file.type.startsWith("image/");
    }),
});

const UploadVideoPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    alternativeTitle:"",
    description: "",
    publisher: "",
    copyrightHolder: "",
    language: "",
    resolution: "",
    subtitles: "",
    videoUrl: null,
    coverImage: null,
    duration: "",
    preservationStatus: "",
    source: "",
    eventDate: "",
    location: "",
    eventType: "",
    significance: "",
    historicalFigures: "",
    director: "",
    producer: "",
    cameraman: "",
    cinematographer: "",
    cast: "",
    relatedArtifacts: "",
    accessLevel:"",
    ageRating: "",
    publicationDate:""
  });

  const [errors, setFormErrors] = useState<Record<string, string>>({});
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "success" as "success" | "error" | "warning",
    visible: false,
  });

  const handleInputChange = (value: string, field: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // Clear the error for the field that is being changed
    if (errors[field]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (errors[field]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

const handleRadioChange = (field: "source", value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = fieldName === "videoUrl" && file.type.startsWith("video/");
    const isImage = fieldName === "coverImage" && file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setFormErrors((prev) => ({
        ...prev,
        [fieldName]: fieldName === "videoUrl" ? "Unsupported video file type." : "Unsupported image file type.",
      }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, [fieldName]: "" })); // Clear previous error for this field

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleCastValuesChange = (values: string[], field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: values.join(", "),
    }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prevData) => ({
      ...prevData,
      eventDate: date,
    }));

    if (errors["eventDate"]) {
      setFormErrors((prev) => ({ ...prev, eventDate: 'undefined' }));
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Clear errors and enable loading state
  //     setIsLoading(true);
  
  //     // Validate form data with Yup
  //     await videoSchema.validate(formData, { abortEarly: false });
  
  //     // Simulate a network request (replace with your actual API call)
  //     console.log("Form Submitted:", formData);
  
  //     // Reset the form after successful submission

  //     setFormData({
  //       title: "",
  //       alternativeTitle:"",
  //       description: "",
  //       publisher: "",
  //       copyrightHolder: "",
  //       language: "",
  //       resolution: "",
  //       subtitles: "",
  //       videoUrl: null,
  //       coverImage: null,
  //       duration: "",
  //       preservationStatus: "",
  //       source: "",
  //       eventDate: "",
  //       location: "",
  //       eventType: "",
  //       significance: "",
  //       historicalFigures: "",
  //       director: "",
  //       producer: "",
  //       cameraman: "",
  //       cinematographer: "",
  //       cast: "",
  //       relatedArtifacts: "",
  //       accessLevel:"",
  //       ageRating: "",
  //       publicationDate:"",
  //     });

  //     setNotification({
  //       message: "Form submitted successfully!",
  //       type: "success",
  //       visible: true,
  //     });
  //   } catch (error) {
  //     console.log("Validation Errors:", error); // Log validation errors if needed
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {
      // Clear errors and enable loading state
      setIsLoading(true);
  
      // Validate form data with Yup
      await videoSchema.validate(formData, { abortEarly: false });
  
      // Create a new FormData object to send files and other data
      const formDataToSend = new FormData();
  
      // Add all form data to FormData object
      formDataToSend.append('title', formData.title);
      formDataToSend.append('alternativeTitle', formData.alternativeTitle);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('publisher', formData.publisher);
      formDataToSend.append('copyrightHolder', formData.copyrightHolder);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('resolution', formData.resolution);
      formDataToSend.append('subtitles', JSON.stringify(formData.subtitles)); // If it's an array, stringifying it
      formDataToSend.append('duration', formData.duration);
      formDataToSend.append('preservationStatus', formData.preservationStatus);
      formDataToSend.append('source', formData.source);
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('eventType', formData.eventType);
      formDataToSend.append('significance', formData.significance);
      formDataToSend.append('historicalFigures', JSON.stringify(formData.historicalFigures)); // If it's an array, stringifying it
      formDataToSend.append('director', JSON.stringify(formData.director));
      formDataToSend.append('producer', JSON.stringify(formData.producer));
      formDataToSend.append('cameraman', JSON.stringify(formData.cameraman));
      formDataToSend.append('cinematographer', JSON.stringify(formData.cinematographer));
      formDataToSend.append('cast', JSON.stringify(formData.cast));
      formDataToSend.append('relatedArtifacts', JSON.stringify(formData.relatedArtifacts));
      formDataToSend.append('accessLevel', formData.accessLevel);
      formDataToSend.append('ageRating', formData.ageRating);
      formDataToSend.append('publicationDate', formData.publicationDate);
  
      // Retrieve uploaderId and institutionId from localStorage
      const uploaderId = localStorage.getItem('userId');
      const institutionId = localStorage.getItem('institutionId');
  
      // Add these values to the form data
      if (uploaderId && institutionId) {
        formDataToSend.append('uploaderId', uploaderId);
        formDataToSend.append('institutionId', institutionId);
      } else {
        throw new Error('Uploader ID and Institution ID are required');
      }
  
      // Add files (video and cover image) to FormData object
      if (formData.videoUrl) {
        formDataToSend.append('videoUrl', formData.videoUrl); // Assuming formData.videoUrl is a file
      } else {
        throw new Error('Video is required');
      }
  
      if (formData.coverImage) {
        formDataToSend.append('coverImage', formData.coverImage); // Assuming formData.coverImage is a file
      } else {
        throw new Error('Cover Image is required');
      }
  
      // Make the POST request to your API (backend)
      const response = await fetch('/api/content/upload-video', {
        method: 'POST',
        body: formDataToSend,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Handle success response
        console.log('Form Submitted Successfully:', result);
        setNotification({
          message: 'Form submitted successfully!',
          type: 'success',
          visible: true,
        });
  
        // Reset the form after successful submission
        setFormData({
          title: "",
          alternativeTitle: "",
          description: "",
          publisher: "",
          copyrightHolder: "",
          language: "",
          resolution: "",
          subtitles: "",
          videoUrl: null,
          coverImage: null,
          duration: "",
          preservationStatus: "",
          source: "",
          eventDate: "",
          location: "",
          eventType: "",
          significance: "",
          historicalFigures: "",
          director: "",
          producer: "",
          cameraman: "",
          cinematographer: "",
          cast: "",
          relatedArtifacts: "",
          accessLevel: "",
          ageRating: "",
          publicationDate: "",
        });
      } else {
        throw new Error(result.message || 'An error occurred during form submission');
      }
    } catch (error: unknown) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        console.log('Validation Errors:', error.message); // Log error message
        setNotification({
          message: error.message || 'Form submission failed',
          type: 'error',
          visible: true,
        });
      } else {
        // Handle the case where error is not an instance of Error (optional)
        console.log('An unknown error occurred');
        setNotification({
          message: 'An unknown error occurred',
          type: 'error',
          visible: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  useEffect(() => {
    const validateForm = async () => {
      try {
        await videoSchema.validate(formData, { abortEarly: false });
        setIsEnabled(true);
      } catch {
        setIsEnabled(false);
      }
    };

    validateForm();
  }, [formData]);

const closeNotification = () => {
    setNotification((prev) => ({ ...prev, visible: false }));
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        
        <Button onClick={() => router.push("/uploader-dashboard/videos")} variant="view" className="flex items-center">
          <FontAwesomeIcon icon={faArrows} className="mr-1" />
          Back to Video Lists
        </Button>
      </div>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 */}
          <div className="flex flex-col space-y-4 font-medium">
            <InputField
              id="title"
              type="text"
              label="Title"
              required
              value={formData.title}
              onChange={(value) => handleInputChange(value, "title")}
              placeholder="Enter title"
            />
            <InputField
              id="alternativeTitle"
              type="text"
              label="Alternative Title"
              value={formData.alternativeTitle}
              onChange={(value) => handleInputChange(value, "alternativeTitle")}
              placeholder="Enter alternative title"
            />
            <InputField
              id="description"
              type="textarea"
              label="Description"
              required
              value={formData.description}
              onChange={(value) => handleInputChange(value, "description")}
              placeholder="Enter description"
            />
            <InputField
              id="publisher"
              type="text"
              label="Publisher"
              required
              value={formData.publisher}
              onChange={(value) => handleInputChange(value, "publisher")}
              placeholder="Enter publisher"
            />
            <InputField
              id="copyrightHolder"
              type="text"
              label="Copyright Holder"
              required
              value={formData.copyrightHolder}
              onChange={(value) => handleInputChange(value, "copyrightHolder")}
              placeholder="Enter copyright Holder"
            />
            <CustomDropdown
              label="Language"
              required
              selectedOption={String(formData.language)}
              onOptionSelect={(value) => handleDropdownChange("language", String(value))}
              options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
            />
            <DynamicFields
              fieldLabel="Subtitle"
              placeholder="Enter Subtitle"
              onChange={(values) => handleCastValuesChange(values, "subtitles")}
            />
            <DatePicker
              label="Event Date"
              required
              name="eventDate"
              value={formData.eventDate}
              onChange={handleDateChange}
            />
            <CustomDropdown
              label="Event Type"
              required
              selectedOption={String(formData.eventType)}
              onOptionSelect={(value) => handleDropdownChange("eventType", String(value))}
              options={["WAR", "POLITICS", "RELIGION", "CULTURE", "FAMINE_CRISIS", "CIVIL_RIGHTS", "ECONOMY", 
    "DIPLOMACY", "LEADERSHIP", "ETHNIC_MOVMENTS"]}
            />
            <InputField
              id="significance"
              type="textarea"
              label="Significance"
              required
              value={formData.significance}
              onChange={(value) => handleInputChange(value, "significance")}
              placeholder="Enter significance"
            />
            
            <DynamicFields
              fieldLabel="Historical Figures"
              required
              placeholder="Enter historical figures"
              onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
            />
          </div>

{/* Column 2 */}
          <div className="flex flex-col space-y-4">
          <CustomDropdown
              label="Acess Level"
              required
              selectedOption={String(formData.accessLevel)}
              onOptionSelect={(value) => handleDropdownChange("accessLevel", String(value))}
              options={["PRIVATE", "PUBLIC", "RESTRICTED"]}
            />
            <CustomDropdown
              label="Age Rating"
              required
              selectedOption={String(formData.ageRating)}
              onOptionSelect={(value) => handleDropdownChange("ageRating", String(value))}
              options={["General Audience", "Parental Guidance", "PG-13", "Restricted"]}
            />
            <DatePicker
              label="Publication Date"
              required
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleDateChange}
            />
            <DynamicFields
              fieldLabel="Director"
              placeholder="Enter director name"
              onChange={(values) => handleCastValuesChange(values, "director")}
            />
            <DynamicFields
              fieldLabel="Producer"
              placeholder="Enter producer name"
              onChange={(values) => handleCastValuesChange(values, "producer")}
            />
            <DynamicFields
              fieldLabel="Cameraman"
              placeholder="Enter cameraman name"
              onChange={(values) => handleCastValuesChange(values, "cameraman")}
            />
            <DynamicFields
              fieldLabel="Cinematographer"
              placeholder="Enter cinematographer name"
              onChange={(values) => handleCastValuesChange(values, "cinematographer")}
            />
            <DynamicFields
              fieldLabel="Cast"
              placeholder="Enter cast name"
              onChange={(values) => handleCastValuesChange(values, "cast")}
            />
            <CustomDropdown
              label="Preservation Status"
              required
              selectedOption={String(formData.preservationStatus)}
              onOptionSelect={(value) => handleDropdownChange("preservationStatus", String(value))}
              options={["Restored", "Good Condition", "Damaged"]}
            />
            <div className="col-span-2">
              <div className="flex items-center">
                <label className="block text-md text-[#3e251c] font-medium mb-2 ml-1">Source</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <CustomRadioButton
                name="source"
                label="Primary"
                value="Primary"
                checked={formData.source === "Primary"}
                onChange={() => handleRadioChange("source", "Primary")}
              />
              <CustomRadioButton
                name="source"
                label="Secondary"
                value="Secondary"
                checked={formData.source === "Secondary"}
                onChange={() => handleRadioChange("source", "Secondary")}
              />
            </div>
          </div>

{/* Column 3 */}
          <div className="flex flex-col space-y-4">
            <InputField
              id="location"
              type="text"
              label="Location"
              required
              value={formData.location}
              onChange={(value) => handleInputChange(value, "location")}
              placeholder="Enter location"
            />
            <div>
              <div className="flex items-center">
                <label htmlFor="videoUrl" className="block mb-2">Upload Video</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <input 
                type="file" 
                accept="video/*" 
                onChange={(e) => handleFileChange(e, "videoUrl")} 
              />
              {errors.videoUrl && <p className="text-red-500">{errors.videoUrl}</p>}
            </div>
            <div>
              <div className="flex items-center">
                <label htmlFor="coverImage" className="block mb-2">Upload Cover Image</label>
                <span className="text-red-700 text-2xl ml-1">*</span>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e, "coverImage")} 
              />
              {errors.coverImage && <p className="text-red-500">{errors.coverImage}</p>}
            </div>
            <CustomDropdown
              label="Resolution"
              selectedOption={String(formData.resolution)}
              onOptionSelect={(value) => handleDropdownChange("resolution", String(value))}
              options={["144p", "240p", "360p", "480p", "720p", "1080p", "2K", "4K (UHD)", "8K (UHD)"]}
            />
            <TimePicker
              label="Duration"
              require
              name="duration"
              value={formData.duration}
              onChange={(value) => handleInputChange(value, "duration")}
            />
            <DynamicFields
              fieldLabel="Related Artifact"
              placeholder="Enter Artifact URL"
              onChange={(values) => handleCastValuesChange(values, "relatedArtifacts")}
            />
            <Button
              disabled={!isEnabled || isLoading}
              loading={isLoading}
              onClick={handleSubmit}
              className="mt-2"
              variant="view"
              size="md"
            >
              Submit
            </Button>
            <Button variant="border" onClick={() => router.push("/uploader-dashboard/videos")}
              className="mt-4 mb-12">
              Cancel
            </Button>
          </div>
        </div>
      </form>

      {/* Notification Component */}
      {/* <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      /> */}
    </div>
  );
};

export default UploadVideoPage;