import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For toggling password visibility
import '../../src/app/globals.css';
import axios from 'axios';
import Layout from "../../components/InstitutionAdminMenu";

interface Institution {
    id: number;
    photo?: string | null;
    name: string;
    address: string;
    type?: string | null;
    emailDomain: string;
    Phone: string;
    registrationStatus: string;
    admin: {
        id: number;
        username: string;
        password: string;
    };
}

const InstitutionDetails: React.FC = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [institution, setInstitution] = useState<Institution | null>(null);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [adminUsername, setAdminUsername] = useState<string | null>(null);
    const [adminPassword, setAdminPassword] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const institutionId = typeof window !== 'undefined' && localStorage.getItem('institutionId')
        ? parseInt(localStorage.getItem('institutionId') as string)
        : null;

    // Fetch institution data
    useEffect(() => {
        const fetchInstitution = async () => {
            if (institutionId) {
                console.log('Fetching institution with ID:', institutionId);
                try {
                    const response = await axios.get(`/api/institutions/${institutionId}`);
                    setInstitution(response.data);
                    setLogoUrl(response.data.photo ?? null); // Safely handle potential null
                    setAdminUsername(response.data.admin.username);
                    setAdminPassword(response.data.admin.password); // Fetch admin password for editing
                } catch (error) {
                    console.error('Failed to fetch institution data:', error);
                }
            } else {
                console.error('Institution ID not found in local storage');
            }
        };

        fetchInstitution();
    }, [institutionId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'adminUsername') {
            setAdminUsername(value);
        } else if (name === 'adminPassword') {
            setAdminPassword(value);
        } else {
            setInstitution((prevInstitution: Institution | null) => {
                if (prevInstitution) {
                    return {
                        ...prevInstitution,
                        [name]: value,
                    };
                }
                return prevInstitution;
            });
        }
    };


    const handleSave = async () => {
        if (!institutionId) {
            console.error('Institution ID is missing');
            return;
        }

        try {
            const response = await axios.put(`/api/institutions/update`, {
                id: institutionId,
                photo: institution?.photo,
                name: institution?.name,
                address: institution?.address,
                type: institution?.type,
                contactEmail: institution?.emailDomain,
                contactPhone: institution?.Phone,
                registrationStatus: institution?.registrationStatus,
                adminUsername: adminUsername, // Update admin username
                adminPassword: adminPassword, // Update admin password
            });

            if (response.status === 200) {
                const updatedInstitution = response.data;
                setInstitution(updatedInstitution);
                setLogoUrl(updatedInstitution.photo ?? null);
                setIsEditMode(false);
            } else {
                console.error('Failed to save institution data');
            }
        } catch (error) {
            console.error('Error updating institution:', error);
        }
    };

    const handleCancel = () => {
        console.log("Changes cancelled");
        setIsEditMode(false);
    };

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && institutionId) {
            const formData = new FormData();
            formData.append("logo", file);
            formData.append("institutionId", String(institutionId));

            try {
                const response = await axios.post("/api/institutions/uploadLogo", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                if (response.status === 200) {
                    setLogoUrl(response.data.logoUrl);
                }
            } catch (error) {
                console.error("Error uploading institution logo:", error);
            }
        }
    };

    if (!institution) return <div>Loading...</div>;

    const renderLogo = () => {
        if (logoUrl) {
            return (
                <img
                    src={logoUrl.startsWith('/logos/') ? logoUrl : `/logos/${logoUrl}`} // Check if path is already correct
                    alt="Institution Logo"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                        e.currentTarget.src = '/images/default-logo.png'; // Fallback image
                    }}
                />
            );
        }
        return (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#3C2A21] bg-gray-300 rounded-full">
                {institution.name.charAt(0).toUpperCase()}
            </div>
        );
    };

    return (
        <Layout isEditMode={isEditMode} setIsEditMode={setIsEditMode}>
            <div className="flex items-center mb-6">
                <div className="w-32 h-32 border-2 border-dashed border-[#3C2A21] rounded-full flex items-center justify-center overflow-hidden relative cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className={`opacity-0 absolute inset-0 cursor-pointer ${isEditMode ? "" : "hidden"}`}
                    />
                    {renderLogo()}
                </div>
                <div className="ml-6">
                    <h2 className="text-2xl font-bold">{institution.name}</h2>
                    <span className="text-xl font-semibold">Institution Details</span>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Institution Name:</span>
                    {isEditMode ? (
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={institution.name}
                            onChange={handleChange}
                            className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                            placeholder="Enter institution name"
                        />
                    ) : (
                        <span className="ml-2">{institution.name}</span>
                    )}
                </div>

                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Admin Username:</span>
                    {isEditMode ? (
                        <input
                            type="text"
                            id="adminUsername"
                            name="adminUsername"
                            value={adminUsername ?? ''}
                            onChange={handleChange}
                            className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                            placeholder="Enter admin username"
                        />
                    ) : (
                        <span className="ml-2">{adminUsername}</span>
                    )}
                </div>

                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Admin Password:</span>
                    {isEditMode ? (
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="adminPassword"
                                name="adminPassword"
                                value={adminPassword ?? ''}
                                onChange={handleChange}
                                className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                                placeholder="Enter admin password"
                            />
                            <button
                                type="button"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#3C2A21]"
                            >
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    ) : (
                        <span className="ml-2">******</span> // Masked password display
                    )}
                </div>

                {/* Additional institution fields */}
                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Address:</span>
                    {isEditMode ? (
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={institution.address}
                            onChange={handleChange}
                            className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                            placeholder="Enter institution address"
                        />
                    ) : (
                        <span className="ml-2">{institution.address}</span>
                    )}
                </div>

                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Contact Email:</span>
                    {isEditMode ? (
                        <input
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            value={institution.emailDomain}
                            onChange={handleChange}
                            className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                            placeholder="Enter contact email"
                        />
                    ) : (
                        <span className="ml-2">{institution.emailDomain}</span>
                    )}
                </div>

                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Contact Phone:</span>
                    {isEditMode ? (
                        <input
                            type="text"
                            id="contactPhone"
                            name="contactPhone"
                            value={institution.Phone}
                            onChange={handleChange}
                            className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                            placeholder="Enter contact phone"
                        />
                    ) : (
                        <span className="ml-2">{institution.Phone}</span>
                    )}
                </div>

                <div className="flex items-center ml-40">
                    <span className="font-medium w-32">Registration Status:</span>
                    {isEditMode ? (
                        <select
                            id="registrationStatus"
                            name="registrationStatus"
                            value={institution.registrationStatus}
                            onChange={handleChange}
                            className="mt-0.5 block w-56 p-1 bg-transparent border border-[#3C2A21] rounded-md focus:outline-none focus:ring focus:ring-[#3C2A21]"
                        >
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    ) : (
                        <span className="ml-2">{institution.registrationStatus}</span>
                    )}
                </div>
            </div>

            <div className="flex justify-center mt-6">
                {isEditMode ? (
                    <>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[#3C2A21] text-white rounded-md hover:bg-[#2c1c1a]"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleCancel}
                            className="ml-4 px-4 py-2 border border-[#3C2A21] rounded-md hover:bg-[#3C2A21] hover:text-white"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEditMode(true)}
                        className="px-4 py-2 bg-[#3C2A21] text-white rounded-md hover:bg-[#2c1c1a]"
                    >
                        Edit
                    </button>
                )}
            </div>
        </Layout>
    );
};

export default InstitutionDetails;
