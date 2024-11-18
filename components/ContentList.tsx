// components/ContentList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  contentType: string;
  accessLevel: string;
  category: string; 
}

export default function ContentList() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string>('');
  const [uploaderId, setUploaderId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    setUploaderId(id);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      if (!uploaderId) return;

      try {
        const response = await axios.get(`/api/uploder/${uploaderId}`);
        setContent(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message);
        } else {
          setError('Error fetching content.');
        }
      }
    };

    fetchContent();
  }, [uploaderId]);

  return (
    <div className="min-h-screen bg-[#e5e5cb] p-6 flex flex-col items-center">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto w-full max-w-4xl bg-[#e5e5cb] rounded-lg shadow-lg">
        <table className="min-w-full bg-[#e5e5cb]">
          <thead>
            <tr className="bg-[#3C2A21] text-white">
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Access Level</th>
              <th className="py-3 px-4 text-left">History Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.length > 0 ? (
              content.map((item) => (
                <tr key={item.id} className="border-b border-[#3C2A21]">
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">{item.contentType}</td>
                  <td className="py-2 px-4">{item.accessLevel}</td>
                  <td className="py-2 px-4">{item.category}</td>
                  <td className="py-2 px-4">
                    <Link href={`/edit/${item.id}`}>
                      <button className="bg-[#3C2A21] text-white py-1 px-2 rounded hover:bg-[#4B3B31] transition">Edit</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">No content uploaded yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
