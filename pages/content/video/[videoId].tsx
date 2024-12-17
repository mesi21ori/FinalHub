// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const VideoDetails = () => {
//     const router = useRouter();
//     const { videoId } = router.query;
//     const [videoDetails, setVideoDetails] = useState(null);

//     useEffect(() => {
//         if (videoId) {
//             const fetchVideoDetails = async () => {
//                 try {
//                     const response = await axios.get(`/api/video/${videoId}`);
//                     setVideoDetails(response.data);
//                 } catch (error) {
//                     console.error('Error fetching video details:', error);
//                 }
//             };
//             fetchVideoDetails();
//         }
//     }, [videoId]);

//     if (!videoDetails) return <div>Loading...</div>;

//     return (
//         <div className="min-h-screen bg-[#E5E5CB] p-8">
//             <h1 className="text-2xl font-bold">{videoDetails.title}</h1>
//             <video src={videoDetails.fileUrl} controls className="w-full h-auto mt-4" />
//             <p className="mt-4">{videoDetails.description}</p>
//         </div>
//     );
// };

// export default VideoDetails;
