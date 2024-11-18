// // // components/InstitutionContentList.tsx
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // interface Content {
// //     id: number;
// //     title: string;
// //     description: string;
// //     uploader: {
// //         firstName: string;
// //         lastName: string;
// //         email: string;
// //     };
// // }

// // const InstitutionContentList = ({ institutionId }: { institutionId: number }) => {
// //     const [contentList, setContentList] = useState<Content[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState('');

// //     useEffect(() => {
// //         const fetchContent = async () => {
// //             try {
// //                 const response = await axios.get(`/api/institutions/content?institutionId=${institutionId}`);
// //                 setContentList(response.data);
// //             } catch (error) {
// //                 if (axios.isAxiosError(error) && error.response) {
// //                     setError(error.response.data.message);
// //                 } else {
// //                     setError('An unexpected error occurred. Please try again later.');
// //                 }
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchContent();
// //     }, [institutionId]);

// //     if (loading) {
// //         return <div>Loading content...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-red-500">{error}</div>;
// //     }

// //     return (
// //         <div>
// //             <h2>Uploaded Content</h2>
// //             <ul>
// //                 {contentList.map((content) => (
// //                     <li key={content.id}>
// //                         <h3>{content.title}</h3>
// //                         <p>{content.description}</p>
// //                         <p>Uploaded by: {content.uploader.firstName} {content.uploader.lastName}</p>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // };

// // export default InstitutionContentList;
// // components/InstitutionContentList.tsx

// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // interface Content {
// //   id: number;
// //   title: string;
// //   description: string;
// //   fileUrl: string;
// //   uploader: {
// //     firstName: string;
// //     lastName: string;
// //   };
// // }

// // interface InstitutionContentListProps {
// //   institutionId: number;
// // }

// // const InstitutionContentList: React.FC<InstitutionContentListProps> = ({ institutionId }) => {
// //   const [contentList, setContentList] = useState<Content[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchContent = async () => {
// //       try {
// //         const response = await axios.get('/api/institutions/content', {
// //           params: { institutionId },
// //         });
// //         setContentList(response.data);
// //       } catch (err) {
// //         setError('Failed to fetch content');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchContent();
// //   }, [institutionId]);

// //   if (loading) return <div>Loading...</div>;
// //   if (error) return <div>{error}</div>;

// //   return (
// //     <div>
// //       <h2>Uploaded Content</h2>
// //       <ul>
// //         {contentList.map(content => (
// //           <li key={content.id}>
// //             <h3>{content.title}</h3>
// //             <p>{content.description}</p>
// //             <p>Uploaded by: {content.uploader.firstName} {content.uploader.lastName}</p>
// //             <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">View Content</a>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default InstitutionContentList;
// // components/InstitutionContentList.tsx
// // components/InstitutionContentList.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ConfirmationDialog from './ConfirmationDialog';

// interface Content {
//     id: number;
//     title: string;
//     description: string;
//     fileUrl: string;
//     contentType: string;
//     accessLevel: string;
// }

// const InstitutionContentList = ({ institutionId }: { institutionId: number }) => {
//     const [contentList, setContentList] = useState<Content[]>([]);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedContentId, setSelectedContentId] = useState<number | null>(null);

//     useEffect(() => {
//         const fetchContent = async () => {
//             try {
//                 const response = await axios.get('/api/institutions/content', {
//                     params: { institutionId }
//                 });
//                 setContentList(response.data);
//             } catch (error) {
//                 console.error('Error fetching content:', error);
//             }
//         };

//         if (institutionId) {
//             fetchContent();
//         } else {
//             console.error('Institution ID is not available');
//         }
//     }, [institutionId]);

   

//     const handleDeleteConfirmation = (id: number) => {
//         setSelectedContentId(id);
//         setIsDialogOpen(true);
//     };

//     const handleDelete = async () => {
//         if (selectedContentId !== null) {
//             await axios.delete('/api/content/delete', { data: { id: selectedContentId } });
//             setContentList((prev) => prev.filter((item) => item.id !== selectedContentId));
//             setIsDialogOpen(false);
//             setSelectedContentId(null);
//         }
//     };

//     return (
//         <div>
//             <h2>Uploaded Content</h2>
//             <ul>
//                 {contentList.map((content) => (
//                     <li key={content.id}>
//                         <h3>{content.title}</h3>
//                         <p>{content.description}</p>
//                         <a href={content.fileUrl} target="_blank" rel="noopener noreferrer">View File</a>
                        
//                         <button onClick={() => handleDeleteConfirmation(content.id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//             <ConfirmationDialog 
//                 isOpen={isDialogOpen} 
//                 onConfirm={handleDelete} 
//                 onCancel={() => setIsDialogOpen(false)} 
//             />
//         </div>
//     );
// };

// export default InstitutionContentList;





// components/InstitutionContentList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationDialog from './ConfirmationDialog';
import '../src/app/globals.css';

interface Content {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    contentType: string;
    accessLevel: string;
}

const InstitutionContentList = ({ institutionId }: { institutionId: number }) => {
    const [contentList, setContentList] = useState<Content[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState<number | null>(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get('/api/institutions/content', {
                    params: { institutionId }
                });
                setContentList(response.data);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        if (institutionId) {
            fetchContent();
        } else {
            console.error('Institution ID is not available');
        }
    }, [institutionId]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? contentList.length - 1 : prevIndex - 1
        );
    };

    const handleDeleteConfirmation = (id: number) => {
        setSelectedContentId(id);
        setIsDialogOpen(true);
    };

    const handleDelete = async () => {
        if (selectedContentId !== null) {
            await axios.delete('/api/content/delete', { data: { id: selectedContentId } });
            setContentList((prev) => prev.filter((item) => item.id !== selectedContentId));
            setIsDialogOpen(false);
            setSelectedContentId(null);
            setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        }
    };

    if (contentList.length === 0) {
        return <p className="text-center text-gray-500">No content available</p>;
    }

    const currentContent = contentList[currentIndex];

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-[#e5e5cb] rounded-lg border-2 border-[#3C2A21] shadow-lg">
            <h2 className="text-3xl text-[#3C2A21] text-center mb-4">Uploaded Content</h2>
            <div className="mb-6 p-4 bg-[#e5e5cb] rounded-lg shadow-md border border-[#3C2A21]">
                <h3 className="text-2xl text-[#3C2A21]">{currentContent.title}</h3>
                <p className="text-[#3C2A21]">{currentContent.description}</p>
                <a
                    href={currentContent.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3C2A21]underline mt-4 block"
                    
                >
                    View File
                </a>
                <div className="mt-4">
                    <button
                        onClick={() => handleDeleteConfirmation(currentContent.id)}
                        className="bg-[#3C2A21] text-white py-2 px-4 rounded hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevious}
                    disabled={contentList.length <= 1}
                    className="bg-[#3C2A21] text-white py-2 px-6 rounded hover:bg-[#3C2A21] disabled:opacity-50 transition"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={contentList.length <= 1}
                    className="bg-[#3C2A21] text-white py-2 px-6 rounded hover:bg-[#3C2A21] disabled:opacity-50 transition"
                >
                    Next
                </button>
            </div>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                onConfirm={handleDelete}
                onCancel={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

export default InstitutionContentList;
