import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../testn';

const contentTypes = ['VIDEO', 'BOOK', 'TEXT', 'MUSIC', 'PHOTO'];
const accessLevels = ['PRIVATE', 'PUBLIC', 'RESTRICTED'];
const historyCategories = ['MODERN_HISTORY', 'MEDIEVAL_HISTORY', 'EARLY_HISTORY'];

export default function EditContent() {
  const router = useRouter();
  const { contentId } = router.query;
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const [isAccessLevelOpen, setIsAccessLevelOpen] = useState(false);
  const [isHistoryCategoryOpen, setIsHistoryCategoryOpen] = useState(false);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string>('');
  const [selectedHistoryCategory, setSelectedHistoryCategory] = useState<string>('');

  useEffect(() => {
    if (contentId) {
      const fetchContent = async () => {
        try {
          const response = await axios.get(`/api/content/${contentId}`);
          setContent(response.data);
          setSelectedAccessLevel(response.data.accessLevel || '');
          setSelectedHistoryCategory(response.data.category || '');
        } catch (error) {
          console.error('Error fetching content:', error);
          setError('Error fetching content.');
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
    }
  }, [contentId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/content/${contentId}`, content);
      router.push('/contentlist');
    } catch (error) {
      console.error('Error updating content:', error);
      setError('Error updating content.');
    }
  };

  const handleCancel = () => {
    // Optionally, you can redirect the user or reset the form to the original content state
    router.push('/contentlist'); // Redirect to the content list page or previous page
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center mt-4 text-lg text-white">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

  return (
    <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
      <form onSubmit={handleUpdate} className="max-w-2xl mx-auto p-8 bg-[#e5e5cb] text-white rounded-lg shadow-md">
        
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium mb-2 text-[#3C2A21]">Title:</label>
          <input
            id="title"
            name="title"
            value={content.title || ''}
            onChange={handleChange}
            className="w-full p-2 rounded-md border-2 border-[#3C2A21] bg-[#e5e5cb] text-[#3C2A21] focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium mb-2 text-[#3C2A21]">Description:</label>
          <textarea
            id="description"
            name="description"
            value={content.description || ''}
            onChange={handleChange}
            className="w-full p-2 rounded-md border-2 border-[#3C2A21] bg-[#e5e5cb] text-[#3C2A21] focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
          />
        </div>

        {/* Access Level Custom Dropdown */}
        <div className="mb-4 relative">
          <label htmlFor="accessLevel" className="block text-lg font-medium mb-2 text-[#3C2A21]">Access Level:</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsAccessLevelOpen(!isAccessLevelOpen)}
              className="w-full p-2 rounded-md border-2 border-[#3C2A21] bg-[#e5e5cb] text-[#3C2A21] text-left focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
            >
              {selectedAccessLevel || 'Select Access Level'}
            </button>
            {isAccessLevelOpen && (
              <ul className="absolute w-full bg-[#e5e5cb] text-[#3C2A21] border-2 border-[#3C2A21] rounded-md mt-1 shadow-lg z-10">
                {accessLevels.map((level) => (
                  <li
                    key={level}
                    onClick={() => {
                      setSelectedAccessLevel(level);
                      setIsAccessLevelOpen(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-[#3C2A21] hover:text-[#e5e5cb] transition-colors"
                  >
                    {level.charAt(0) + level.slice(1).toLowerCase()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* History Category Custom Dropdown */}
        <div className="mb-6 relative">
          <label htmlFor="category" className="block text-lg font-medium mb-2 text-[#3C2A21]">History Category:</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsHistoryCategoryOpen(!isHistoryCategoryOpen)}
              className="w-full p-2 rounded-md border-2 border-[#3C2A21] bg-[#e5e5cb] text-[#3C2A21] text-left focus:outline-none focus:ring-2 focus:ring-[#3C2A21]"
            >
              {selectedHistoryCategory || 'Select History Category'}
            </button>
            {isHistoryCategoryOpen && (
              <ul className="absolute w-full bg-[#e5e5cb] text-[#3C2A21] border-2 border-[#3C2A21] rounded-md mt-1 shadow-lg z-10">
                {historyCategories.map((category) => (
                  <li
                    key={category}
                    onClick={() => {
                      setSelectedHistoryCategory(category);
                      setIsHistoryCategoryOpen(false);
                    }}
                    className="p-2 cursor-pointer hover:bg-[#3C2A21] hover:text-[#e5e5cb] transition-colors"
                  >
                    {category.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Submit and Cancel Button */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-[#3C2A21] text-white py-1 px-2 rounded hover:bg-[#4B3B31] transition">
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-[#3C2A21] text-white py-1 px-2 rounded hover:bg-[#4B3B31] transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
}
