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


import axios from 'axios';
import React, { useState } from 'react';

// TypeScript interface for form data
interface VideoFormData {
    title: string;
    description: string;
    fileUrl: string;
    accessLevel: string;
    category: string;
    publisher: string;
    copyrightHolder?: string;
    language: string;
    subtitles: string;
    duration?: string;
    publicationDate: string;
    preservationStatus?: string;
    primarySource?: boolean;
    eventDate?: string;
    location?: string;
    eventType?: string;
    significance?: string;
    historicalFigures: string;
    director?: string;
    producer?: string;
    cameramen: string;
    cinematographer?: string;
    cast: string;
    relatedArtifacts: string;
    ageRating?: string;
    coverImage?: string;
}

const UploadVideo = () => {
    const [formData, setFormData] = useState<VideoFormData>({
        title: '',
        description: '',
        fileUrl: '',
        accessLevel: 'PRIVATE',
        category: 'MODERN_HISTORY',
        publisher: '',
        copyrightHolder: '',
        language: '',
        subtitles: '',
        duration: '',
        publicationDate: '',
        preservationStatus: '',
        primarySource: false,
        eventDate: '',
        location: '',
        eventType: '',
        significance: '',
        historicalFigures: '',
        director: '',
        producer: '',
        cameramen: '',
        cinematographer: '',
        cast: '',
        relatedArtifacts: '',
        ageRating: '',
        coverImage: '',
    });

    // Handle form input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData({
                ...formData,
                [name]: target.checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: e.target.value,
            });
        }
    };

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        fieldName: 'fileUrl' | 'coverImage'
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setFormData((prevData) => ({
                ...prevData,
                [fieldName]: response.data.fileUrl, // Assuming your API returns the file URL
            }));
            console.log(`${fieldName} uploaded successfully:`, response.data.fileUrl);
        } catch (error) {
            console.error(`Error uploading ${fieldName}:`, error);
        }
    };  


    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Get uploaderId and institutionId from localStorage
        const uploaderId = localStorage.getItem('userId');
        const institutionId = localStorage.getItem('institutionId');

        // Ensure uploaderId and institutionId are retrieved
        if (!uploaderId || !institutionId) {
            console.error("Uploader ID or Institution ID missing from localStorage");
            return;
        }

        // Convert subtitles, historicalFigures, cameramen, cast, and relatedArtifacts to arrays
        const subtitlesArray = formData.subtitles.split(',').map(subtitle => subtitle.trim());
        const historicalFiguresArray = formData.historicalFigures.split(',').map(figure => figure.trim());
        const cameramenArray = formData.cameramen.split(',').map(cameraman => cameraman.trim());
        const castArray = formData.cast.split(',').map(cast => cast.trim());
        const relatedArtifactsArray = formData.relatedArtifacts.split(',').map(artifact => artifact.trim());

        // Ensure the publicationDate and eventDate are in ISO 8601 format
        const formattedPublicationDate = new Date(formData.publicationDate).toISOString();
        const formattedEventDate = formData.eventDate ? new Date(formData.eventDate).toISOString() : null; // Handle optional eventDate

        try {
            const response = await axios.post('/api/content/upload', {
                ...formData,
                publicationDate: formattedPublicationDate, // Pass the formatted publicationDate
                eventDate: formattedEventDate, // Pass the formatted eventDate (if available)
                subtitles: subtitlesArray,  // Pass subtitles as an array
                historicalFigures: historicalFiguresArray,  // Pass historicalFigures as an array
                cameramen: cameramenArray,  // Pass cameramen as an array
                cast: castArray,  // Pass cast as an array
                relatedArtifacts: relatedArtifactsArray, // Pass relatedArtifacts as an array
                uploaderId,
                institutionId,
            });
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    return (
        <div>
            <h1>Upload New Video</h1>
            <form onSubmit={handleSubmit}>
                <h2>Common Fields</h2>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <br />
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                   <label>
                    File:
                    <input
                        type="file"
                        name="fileUrl"
                        onChange={(e) => handleFileChange(e, 'fileUrl')}
                        required
                    />
                </label>
                <br />
                <label>
                    Access Level:
                    <select
                        name="accessLevel"
                        value={formData.accessLevel}
                        onChange={handleChange}
                        required
                    >
                        <option value="PRIVATE">Private</option>
                        <option value="PUBLIC">Public</option>
                        <option value="RESTRICTED">Restricted</option>
                    </select>
                </label>
                <br />
                <label>
                    Category:
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="MODERN_HISTORY">Modern History</option>
                        <option value="MEDIEVAL_HISTORY">Medieval History</option>
                        <option value="ANCIENT_HISTORY">Ancient History</option>
                        <option value="ECONOMIC_HISTORY">Economic History</option>
                        <option value="POLITICAL_HISTORY">Political History</option>
                        <option value="ETHIOPIAN_REVOLUTION">Ethiopian Revolution</option>
                        <option value="ETHIOPIAN_NATIONALISM">Ethiopian Nationalism</option>
                        <option value="ETHIOPIAN_LITERATURE">Ethiopian Literature</option>
                    </select>
                </label>
                <br />

                <h2>Video-Specific Fields</h2>
                <label>
                    Publisher:
                    <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Copyright Holder:
                    <input
                        type="text"
                        name="copyrightHolder"
                        value={formData.copyrightHolder}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Language:
                    <input
                        type="text"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Subtitles (comma separated):
                    <input
                        type="text"
                        name="subtitles"
                        value={formData.subtitles}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Duration:
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Publication Date:
                    <input
                        type="date"
                        name="publicationDate"
                        value={formData.publicationDate}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <label>
                    Preservation Status:
                    <input
                        type="text"
                        name="preservationStatus"
                        value={formData.preservationStatus}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Primary Source:
                    <input
                        type="checkbox"
                        name="primarySource"
                        checked={formData.primarySource}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Event Date:
                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Event Type:
                    <input
                        type="text"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Significance:
                    <input
                        type="text"
                        name="significance"
                        value={formData.significance}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Historical Figures (comma separated):
                    <input
                        type="text"
                        name="historicalFigures"
                        value={formData.historicalFigures}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Director:
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Producer:
                    <input
                        type="text"
                        name="producer"
                        value={formData.producer}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Cameramen (comma separated):
                    <input
                        type="text"
                        name="cameramen"
                        value={formData.cameramen}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Cinematographer:
                    <input
                        type="text"
                        name="cinematographer"
                        value={formData.cinematographer}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Cast (comma separated):
                    <input
                        type="text"
                        name="cast"
                        value={formData.cast}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Related Artifacts (comma separated):
                    <input
                        type="text"
                        name="relatedArtifacts"
                        value={formData.relatedArtifacts}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Age Rating:
                    <input
                        type="text"
                        name="ageRating"
                        value={formData.ageRating}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Cover Image:
                    <input
                        type="file"
                        name="coverImage"
                        onChange={(e) => handleFileChange(e, 'coverImage')}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UploadVideo;


