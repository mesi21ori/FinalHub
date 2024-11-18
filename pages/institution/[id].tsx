import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/PadminMenu';
import '../../src/app/globals.css'; 

const InstitutionDetailPage = () => {
  
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  
  const { id } = router.query;
  const [institution, setInstitution] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/institutions/pending/${id}`)
        .then((response) => setInstitution(response.data))
        .catch((error) => console.error('Error fetching institution details:', error));
    }
  }, [id]);

  const handleAccept = async () => {
    try {
      await axios.post('/api/institutions/accept', { id });
      router.push('/new-institution'); 
    } catch (error) {
      console.error('Error accepting institution:', error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.post('/api/institutions/reject', { id });
      router.push('/new-institution'); 
    } catch (error) {
      console.error('Error rejecting institution:', error);
    }
  };

  if (!institution) {
    return <div className="text-center text-[#3C2A21]">Loading...</div>;
  }

  return (
     <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
    <div className="min-h-screen bg-[#e5e5cb] p-6">
      <div className="max-w-lg mx-auto bg-[#fff] border border-[#3C2A21] shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-[#3C2A21] mb-4">{institution.name}</h1>
        <p className="text-lg text-[#3C2A21]">Address: <span className="font-medium">{institution.address}</span></p>
        <p className="text-lg text-[#3C2A21]">Contact Email: <span className="font-medium">{institution.contactEmail}</span></p>
        <p className="text-lg text-[#3C2A21]">Contact Phone: <span className="font-medium">{institution.contactPhone}</span></p>
        <p className="text-lg text-[#3C2A21]">Registration Status: <span className="font-medium">{institution.registrationStatus}</span></p>

        <div className="mt-6 flex justify-around">
          <button 
            onClick={handleAccept} 
            className="bg-[#3C2A21] text-[#fff] px-4 py-2 rounded-lg hover:bg-[#4B3B31] transition">
            Accept
          </button>
          <button 
            onClick={handleReject} 
            className="bg-red-500 text-[#fff] px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Reject
          </button>
        </div>
      </div>
    </div>
   
    </Layout>
  );
};

export default InstitutionDetailPage;
