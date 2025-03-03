// own-account-setting.tsx

import React from "react";

const OwnAccountSetting = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Public Dashboard!</h1>
      <p className="text-gray-600 mb-6">
        Here you can view and edit your account or explore upgrade options to enhance your experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#f7f4f0] p-4 rounded shadow glow-effect">
          <h2 className="font-bold text-lg">View Account</h2>
          <p className="text-gray-500">Manage your personal details and settings.</p>
        </div>
        <div className="bg-[#f7f4f0] p-4 rounded shadow glow-effect">
          <h2 className="font-bold text-lg">Edit Account</h2>
          <p className="text-gray-500">Update your profile information anytime.</p>
        </div>
        <div className="bg-[#f7f4f0] p-4 rounded shadow glow-effect">
          <h2 className="font-bold text-lg">Upgrade</h2>
          <p className="text-gray-500">Unlock premium features and more.</p>
        </div>
      </div>
    </div>
  );
};

export default OwnAccountSetting; // Ensure this is the default export