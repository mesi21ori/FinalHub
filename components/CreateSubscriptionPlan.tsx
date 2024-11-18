
// import { useState } from 'react';

// const CreateSubscriptionPlan: React.FC = () => {
//   const [name, setName] = useState('');
//   const [features, setFeatures] = useState<string[]>(['']); // Initialize with one empty feature
//   const [price, setPrice] = useState(0);
//   const [duration, setDuration] = useState('MONTHLY'); // Assume default duration is monthly
//   const [error, setError] = useState<string | null>(null);

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...features];
//     newFeatures[index] = value;
//     setFeatures(newFeatures);
//   };

//   const handleAddFeature = () => {
//     setFeatures([...features, '']); // Add an empty string for a new feature
//   };

//   const handleRemoveFeature = (index: number) => {
//     setFeatures(features.filter((_, i) => i !== index)); // Remove the feature at the specified index
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null); // Reset the error

//     const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

//     const response = await fetch('/api/admin/create-subscription', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-user-role': userRole || '', // Send the user role as a custom header
//       },
//       body: JSON.stringify({ name, features, price, duration }), // Send features as an array
//     });

//     if (!response.ok) {
//       const message = await response.json();
//       setError(message.message || 'An error occurred');
//       return;
//     }

//     // Handle successful subscription creation (e.g., reset the form or notify the user)
//     console.log('Subscription plan created successfully');
//     // Optionally, reset form after success
//     setName('');
//     setFeatures(['']);
//     setPrice(0);
//     setDuration('MONTHLY');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//         required
//       />
//       {features.map((feature, index) => (
//         <div key={index} className="flex items-center">
//           <input
//             type="text"
//             value={feature}
//             onChange={(e) => handleFeatureChange(index, e.target.value)}
//             placeholder={`Feature ${index + 1}`}
//             required
//           />
//           <button type="button" onClick={() => handleRemoveFeature(index)}>Remove</button>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddFeature}>Add Feature</button>
//       <input
//         type="number"
//         value={price}
//         onChange={(e) => setPrice(Number(e.target.value))}
//         placeholder="Price"
//         required
//       />
//       <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//         <option value="MONTHLY">Monthly</option>
//         <option value="YEARLY">Yearly</option>
//         <option value="DAILY">Daily</option>
//       </select>
//       <button type="submit">Create Subscription Plan</button>
//       {error && <p>{error}</p>}
//     </form>
//   );
// };

// export default CreateSubscriptionPlan;



import { useState } from 'react';

const CreateSubscriptionPlan: React.FC = () => {
  const [name, setName] = useState('');
  const [features, setFeatures] = useState<string[]>(['']); // Initialize with one empty feature
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState('MONTHLY'); // Assume default duration is monthly
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleAddFeature = () => {
    setFeatures([...features, '']); // Add an empty string for a new feature
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index)); // Remove the feature at the specified index
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset the error
    setSuccessMessage(null); // Reset success message

    const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

    const response = await fetch('/api/admin/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': userRole || '', // Send the user role as a custom header
      },
      body: JSON.stringify({ name, features, price, duration }), // Send features as an array
    });

    if (!response.ok) {
      const message = await response.json();
      setError(message.message || 'An error occurred');
      return;
    }

    // Handle successful subscription creation
    setSuccessMessage('Subscription plan created successfully!'); // Set success message
    console.log('Subscription plan created successfully');

    // Optionally, reset form after success
    setName('');
    setFeatures(['']);
    setPrice(0);
    setDuration('MONTHLY');
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-[#e5e5cb] border border-[#3C2A21] shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-4 text-[#3C2A21]">Create Subscription Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#3C2A21]">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subscription name"
            required
            className="mt-1 block w-full border border-[#3C2A21] rounded p-2 bg-white text-[#3C2A21]"
          />
        </div>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#3C2A21]">{`Feature ${index + 1}`}</label>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Enter feature ${index + 1}`}
                required
                className="mt-1 block w-full border border-[#3C2A21] rounded p-2 bg-white text-[#3C2A21]"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveFeature(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFeature}
          className="bg-[#3C2A21] text-[#fff] px-4 py-2 rounded hover:bg-[#4B3B31]"
        >
          Add Feature
        </button>
        <div>
          <label className="block text-sm font-medium text-[#3C2A21]">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price"
            required
            className="mt-1 block w-full border border-[#3C2A21] rounded p-2 bg-white text-[#3C2A21]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3C2A21]">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 block w-full border border-[#3C2A21] rounded p-2 bg-white text-[#3C2A21]"
          >
            <option value="MONTHLY">Monthly</option>
            <option value="YEARLY">Yearly</option>
            <option value="DAILY">Daily</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#3C2A21] text-[#fff] px-4 py-2 rounded hover:bg-[#4B3B31]"
        >
          Create Subscription Plan
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>} {/* Success message */}
      </form>
    </div>
  );
};

export default CreateSubscriptionPlan;
