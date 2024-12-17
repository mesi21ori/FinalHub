// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import '../src/app/globals.css';


// interface Content {
//     id: number;
//     title: string;
//     description: string;
//     fileUrl: string;
//     contentType: string;
//     accessLevel: string;
//     category?: string;
// }

// const filterContent = (
//     contentList: Content[],
//     searchTerm: string,
//     searchFields: (keyof Content)[]
// ): Content[] => {
//     if (!searchTerm) return contentList;
//     return contentList.filter(content =>
//         searchFields.some(field =>
//             content[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );
// };

// const AllContent = () => {
//     const [contentList, setContentList] = useState<Content[]>([]);
//     const [filteredContent, setFilteredContent] = useState<Content[]>([]);
//     const [activeCategory, setActiveCategory] = useState<string>('all');
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [historyFilter, setHistoryFilter] = useState<string>('');
//     const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
//     const [showHistoryMenu, setShowHistoryMenu] = useState<boolean>(false);
//     const accountMenuRef = useRef<HTMLDivElement>(null);
//     const historyMenuRef = useRef<HTMLDivElement>(null);
//     const router = useRouter();

//     useEffect(() => {
//         const fetchAllContent = async () => {
//             try {
//                 const response = await axios.get('/api/content/all');
//                 setContentList(response.data);
//                 setFilteredContent(response.data);
//             } catch (error) {
//                 console.error("Error fetching content:", error);
//             }
//         };

//         fetchAllContent();
//     }, []);

//     const normalizeContentType = (contentType: string) => {
//         return contentType.toLowerCase();
//     };

//     // Filter contents based on selected category and history
//     const filterContents = () => {
//         let newFilteredContent = contentList;

//         // Filter by active category
//         if (activeCategory !== 'all') {
//             newFilteredContent = newFilteredContent.filter(
//                 (content) => normalizeContentType(content.contentType) === activeCategory
//             );
//         }

//         // Filter by history category
//         if (historyFilter) {
//             newFilteredContent = newFilteredContent.filter(content =>
//                 content.category?.toLowerCase() === historyFilter.toLowerCase()
//             );
//         }

//         // Filter by search term
//         newFilteredContent = filterContent(newFilteredContent, searchTerm, ['title', 'description']);

//         setFilteredContent(newFilteredContent);
//     };

//     useEffect(() => {
//         filterContents();
//     }, [searchTerm, contentList, activeCategory, historyFilter]);

//     const handleClickOutside = (event: MouseEvent) => {
//         if (historyMenuRef.current && !historyMenuRef.current.contains(event.target as Node)) {
//             setShowHistoryMenu(false);
//         }
//         if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
//             setShowAccountMenu(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const renderContent = (content: Content) => {
//         return (

//             <div className="relative bg-[#E5E5CB] rounded-xl shadow-lg overflow-hidden w-[300px] h-[350px]">
//                 <div className="relative">
//                     <img
//                         src={content.fileUrl}
//                         alt={content.title}
//                         className="w-full h-[200px] object-cover"
//                     />
//                     <span className="absolute top-2 right-2 bg-[#3C2A21] text-white text-xs px-2 py-1 rounded-full">
//                         {content.accessLevel}
//                     </span>
//                 </div>
//                 <div className="p-4 flex flex-col h-[150px]">
//                     <div className="flex-1">
//                         <h3 className="text-xl font-bold text-center text-[#3C2A21]">
//                             {content.title}
//                         </h3>
//                         <p className="text-gray-700 mt-2 text-center line-clamp-2">
//                             {content.description}
//                         </p>
//                     </div>
//                     <div className="mt-auto flex justify-end">
//                         <button
//                             onClick={() => handleMoreDetails(content)}
//                             className="bg-[#3C2A21] text-white py-1 px-4 rounded-full hover:bg-[#5A3A30] transition"
//                         >
//                             More Details
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     };
//     const handleMoreDetails = async (content: Content) => {
//         const userRole = localStorage.getItem('userRole');
//         const userId = localStorage.getItem('userId');
    
//         if (!userId || !userRole) {
//             alert("User is not authenticated.");
//             return;
//         }
    
//         try {
//             if (content.accessLevel.toLowerCase() === 'public') {
//                 // Public content is directly accessible
//                 router.push(`/content/${content.id}`);
//             } else if (content.accessLevel.toLowerCase() === 'private') {
//                 // Check for active subscription
//                 const response = await axios.get(`/api/users/check-subscription`, {
//                     params: { userId },
//                 });
    
//                 if (response.data.hasActiveSubscription) {
//                     // User has an active subscription, proceed to content
//                     router.push(`/content/${content.id}`);
//                 } else {
//                     // User doesn't have a subscription, redirect to upgrade
             
//                     router.push('/upgrade');
//                 }
//             } else if (content.accessLevel.toLowerCase() === 'restricted') {
//                 // Existing restricted content logic
//                 const response = await axios.get(`/api/users/check-request-status`, {
//                     params: { userId: userId, contentId: content.id },
//                 });
    
//                 console.log('API Response:', response.data);
//                 const requestStatus = response.data.status.toLowerCase();
    
//                 switch (requestStatus) {
//                     case 'pending':
//                         alert("Your request is still pending. Please wait for approval.");
//                         break;
//                     case 'rejected':
//                         alert("Your request was rejected. Please add more details and submit again.");
//                         router.push(`/RequestAccess?contentId=${content.id}`);
//                         break;
//                     case 'approved':
//                         router.push(`/content/${content.id}`);
//                         break;
//                     case 'none':
//                         router.push(`/RequestAccess?contentId=${content.id}`);
//                         break;
//                     default:
//                         alert("Unknown request status.");
//                 }
//             } else {
//                 console.warn('Unknown access level:', content.accessLevel);
//             }
//         } catch (error) {
//             console.error("Error processing request:", error);
//             alert("An error occurred while processing your request.");
//         }
//     };
    

//     return (
//         <div className="min-h-screen bg-[#E5E5CB] pt-16">
//             <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-2 bg-[#3C2A21] text-[#D5CEA3] z-10">
//                 <h1 className="font-bold text-lg">Logo</h1>
//                 <input
//                     type="text"
//                     placeholder="Search by title or description..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="px-2 py-1 rounded bg-[#3C2A21] text-[#D5CEA3] focus:outline-none w-32"
//                 />
//                 <div className="flex space-x-2">
//                     <button onClick={() => { setActiveCategory('all'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'all' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
//                         All
//                     </button>
//                     <button onClick={() => { setActiveCategory('photo'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'photo' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
//                         Photos
//                     </button>
//                     <button onClick={() => { setActiveCategory('video'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'video' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
//                         Videos
//                     </button>
//                     <button onClick={() => { setActiveCategory('book'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'book' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
//                         Books
//                     </button>
//                     <button onClick={() => { setActiveCategory('music'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'music' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
//                         Music
//                     </button>
//                 </div>

//                 {/* Account Menu */}
//                 <div className="relative" ref={accountMenuRef}>
//                     <button onClick={() => setShowAccountMenu(prev => !prev)} className="bg-[#3C2A21] text-[#D5CEA3] rounded px-2">
//                         Account
//                     </button>
//                     {showAccountMenu && (
//                         <div className="absolute right-0 w-40 mt-2 bg-white rounded shadow-lg">
//                             <button onClick={() => router.push('/dashboard')} className="block px-4 py-2 hover:bg-gray-200">View Account</button>
//                             <button onClick={() => router.push('/signin')} className="block px-4 py-2 hover:bg-gray-200">Logout</button>
//                         </div>
//                     )}
//                 </div>
//             </nav>

//             <div className="flex flex-wrap justify-center p-4">
//                 {filteredContent.length > 0 ? (
//                     filteredContent.map((content) => (
//                         <div key={content.id} className="p-4">
//                             {renderContent(content)}
//                         </div>
//                     ))
//                 ) : (
//                     <div className="text-center w-full mt-20">
//                         <p className="text-lg">No content available</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllContent;

 // const handleMoreDetails = async (content: Content) => {
    //     const userRole = localStorage.getItem('userRole');
    //     const userId = localStorage.getItem('userId');
    
    //     if (!userId || !userRole) {
    //         alert("User is not authenticated.");
    //         return;
    //     }
    
    //     try {
    //         if (content.accessLevel.toLowerCase() === 'public') {
    //             // Public content is directly accessible
    //             router.push(`/content/${content.id}`);
    //         } else if (content.accessLevel.toLowerCase() === 'private') {
    //             // Check for active subscription
    //             const response = await axios.get(`/api/users/check-subscription`, {
    //                 params: { userId },
    //             });
    
    //             if (response.data.hasActiveSubscription) {
    //                 // User has an active subscription, proceed to content
    //                 router.push(`/content/${content.id}`);
    //             } else {
    //                 // User doesn't have a subscription, redirect to upgrade
    //                 router.push('/upgrade');
    //             }
    //         } else if (content.accessLevel.toLowerCase() === 'restricted') {
    //             // Existing restricted content logic
    //             const response = await axios.get(`/api/users/check-request-status`, {
    //                 params: { userId: userId, contentId: content.id },
    //             });
    
    //             console.log('API Response:', response.data);
    //             const requestStatus = response.data.status.toLowerCase();
    
    //             switch (requestStatus) {
    //                 case 'pending':
    //                     alert("Your request is still pending. Please wait for approval.");
    //                     break;
    //                 case 'rejected':
    //                     alert("Your request was rejected. Please add more details and submit again.");
    //                     router.push(`/RequestAccess?contentId=${content.id}`);
    //                     break;
    //                 case 'approved':
    //                     router.push(`/content/${content.id}`);
    //                     break;
    //                 case 'none':
    //                     router.push(`/RequestAccess?contentId=${content.id}`);
    //                     break;
    //                 default:
    //                     alert("Unknown request status.");
    //             }
    //         } else {
    //             console.warn('Unknown access level:', content.accessLevel);
    //         }
    //     } catch (error) {
    //         console.error("Error processing request:", error);
    //         alert("An error occurred while processing your request.");
    //     }
    // };



'use client';
import React, { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/router';
import '../src/app/globals.css';
import axios from 'axios';

interface Content {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    contentType: string;
    accessLevel: string;
    category?: string;
    coverImage?:string;
}

const filterContent = (
    contentList: Content[],
    searchTerm: string,
    searchFields: (keyof Content)[]
): Content[] => {
    if (!searchTerm) return contentList;
    return contentList.filter(content =>
        searchFields.some(field =>
            content[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};

const AllContent = () => {
    const [contentList, setContentList] = useState<Content[]>([]);
    const [filteredContent, setFilteredContent] = useState<Content[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [historyFilter, setHistoryFilter] = useState<string>('');
    const [userPreferences, setUserPreferences] = useState<string[]>([]); // User preferences
    const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);
    const [showHistoryMenu, setShowHistoryMenu] = useState<boolean>(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);
    const historyMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchAllContent = async () => {
            try {
                const response = await axios.get('/api/content/all');
                setContentList(response.data);
                setFilteredContent(response.data);
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };

        // const fetchUserPreferences = async () => {
        //     try {
        //         const userId = localStorage.getItem('userId');
        //         console.log(userId); 
        //         if (userId) {
        //             const response = await axios.get(`/api/users/${userId}/preferences`);
        //             setUserPreferences(response.data.preferences);
        //         }
        //     } catch (error) {
        //         console.error("Error fetching user preferences:", error);
        //     }
        // };

        fetchAllContent();
        // fetchUserPreferences();
    }, []);

    const normalizeContentType = (contentType: string) => {
        return contentType.toLowerCase();
    };

    // Filter contents based on selected category and history
    const filterContents = () => {
        let newFilteredContent = contentList;

        // Filter by active category
        if (activeCategory !== 'all') {
            newFilteredContent = newFilteredContent.filter(
                (content) => normalizeContentType(content.contentType) === activeCategory
            );
        }

        // Filter by history category (user preferences)
        if (historyFilter) {
            newFilteredContent = newFilteredContent.filter(content =>
                content.category?.toLowerCase() === historyFilter.toLowerCase()
            );
        }

        // Prioritize content based on user preferences
        if (userPreferences.length > 0) {
            newFilteredContent = newFilteredContent.sort((a, b) => {
                const aIsPreferred = userPreferences.includes(a.category || '');
                const bIsPreferred = userPreferences.includes(b.category || '');
                // Show user preferred content first
                return bIsPreferred ? 1 : aIsPreferred ? -1 : 0;
            });
        }

        // Filter by search term
        newFilteredContent = filterContent(newFilteredContent, searchTerm, ['title', 'description']);

        setFilteredContent(newFilteredContent);
    };

    useEffect(() => {
        filterContents();
    }, [searchTerm, contentList, activeCategory, historyFilter, userPreferences]);

    const handleClickOutside = (event: MouseEvent) => {
        if (historyMenuRef.current && !historyMenuRef.current.contains(event.target as Node)) {
            setShowHistoryMenu(false);
        }
        if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
            setShowAccountMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderContent = (content: Content) => {
        return (
            <div className="relative bg-[#E5E5CB] rounded-xl shadow-lg overflow-hidden w-[300px] h-[350px]">
                <div className="relative">
                    <img
                        src={content.coverImage}
                        alt={content.title}
                        className="w-full h-[200px] object-cover"
                    />
                    <span className="absolute top-2 right-2 bg-[#3C2A21] text-white text-xs px-2 py-1 rounded-full">
                        {content.accessLevel}
                    </span>
                </div>
                <div className="p-4 flex flex-col h-[150px]">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-center text-[#3C2A21]">
                            {content.title}
                        </h3>
                        <p className="text-gray-700 mt-2 text-center line-clamp-2">
                            {content.description}
                        </p>
                    </div>
                    <div className="mt-auto flex justify-end">
                        <button
                            onClick={() => handleMoreDetails(content)}
                            className="bg-[#3C2A21] text-white py-1 px-4 rounded-full hover:bg-[#5A3A30] transition"
                        >
                            More Details
                        </button>
                    </div>
                </div>
            </div>
        );
    };

   
    const handleMoreDetails = async (content: Content) => {
        const userRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');
    
        if (!userId || !userRole) {
            alert("User is not authenticated.");
            return;
        }
    
        try {
            if (content.accessLevel.toLowerCase() === 'public') {
                // Handle public content as before
                routeToDetailPage(content);
            } else if (content.accessLevel.toLowerCase() === 'private') {
                // Check for active subscription
                const response = await axios.get(`/api/users/check-subscription`, {
                    params: { userId },
                });
    
                if (response.data.hasActiveSubscription) {
                    // User has an active subscription, proceed to content detail
                    routeToDetailPage(content);
                } else {
                    // User doesn't have a subscription, redirect to upgrade
                    alert("Access restricted to subscribed users. Please upgrade your plan.");
                    router.push('/upgrade');
                }
            } else if (content.accessLevel.toLowerCase() === 'restricted') {
                // Check the request status for restricted content
                const response = await axios.get(`/api/users/check-request-status`, {
                    params: { userId: userId, contentId: content.id },
                });
    
                const requestStatus = response.data.status.toLowerCase();
    
                switch (requestStatus) {
                    case 'pending':
                        alert("Your request is still pending. Please wait for approval.");
                        break;
                    case 'rejected':
                        alert("Your request was rejected. Please add more details and submit again.");
                        router.push(`/RequestAccess?contentId=${content.id}`);
                        break;
                    case 'approved':
                        // Approved users can access the content details
                        routeToDetailPage(content);
                        break;
                    case 'none':
                        // No request exists, redirect to request access page
                        router.push(`/RequestAccess?contentId=${content.id}`);
                        break;
                    default:
                        alert("Unknown request status.");
                }
            } else {
                console.warn('Unknown access level:', content.accessLevel);
            }
        } catch (error) {
            console.error("Error processing request:", error);
            alert("An error occurred while processing your request.");
        }
    };
    
    // Helper function to route to the appropriate detail page
    
    const routeToDetailPage = (content: any) => {
        router.push(`/content/${content.id}`);
      };
    
    return (
        <div className="min-h-screen bg-[#E5E5CB] pt-16">
            <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-2 bg-[#3C2A21] text-[#D5CEA3] z-10">
                <h1 className="font-bold text-lg">Logo</h1>
                <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-2 py-1 rounded bg-[#3C2A21] text-[#D5CEA3] focus:outline-none w-32"
                />
                <div className="flex space-x-2">
                    <button onClick={() => { setActiveCategory('all'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'all' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
                        All
                    </button>
                    <button onClick={() => { setActiveCategory('photo'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'photo' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
                        Photos
                    </button>
                    <button onClick={() => { setActiveCategory('video'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'video' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
                        Videos
                    </button>
                    <button onClick={() => { setActiveCategory('book'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'book' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
                        Books
                    </button>
                    <button onClick={() => { setActiveCategory('music'); setHistoryFilter(''); }} className={`px-2 ${activeCategory === 'music' ? 'bg-[#5A3A30]' : 'bg-[#3C2A21]'} text-white rounded`}>
                        Music
                    </button>
                </div>

                {/* Account Menu */}
                <div className="relative" ref={accountMenuRef}>
                    <button onClick={() => setShowAccountMenu(prev => !prev)} className="bg-[#3C2A21] text-[#D5CEA3] rounded px-2">
                        Account
                    </button>
                    {showAccountMenu && (
                        <div className="absolute right-0 w-40 mt-2 bg-white rounded shadow-lg">
                            <button onClick={() => router.push('/dashboard')} className="block px-4 py-2 hover:bg-gray-200">View Account</button>
                            <button onClick={() => router.push('/signin')} className="block px-4 py-2 hover:bg-gray-200">Logout</button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="flex flex-wrap justify-center p-4">
                {filteredContent.length > 0 ? (
                    filteredContent.map((content) => (
                        <div key={content.id} className="p-4">
                            {renderContent(content)}
                        </div>
                    ))
                ) : (
                    <div className="text-center w-full mt-20">
                        <p className="text-lg">No content available</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllContent;
