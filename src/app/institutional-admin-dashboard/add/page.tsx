
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CustomDropdown from "../../../../components/CustomDropdown";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";
import LoadingSpinner from "../../../../components/LoadingSpinner";

// Define the Yup validation schema
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Must be a valid email"),
    gender: Yup.string()
        .required("Gender is required")
        .oneOf(["MALE", "FEMALE"], "Please select a valid gender"),
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    role: Yup.string()
        .required("Role is required")
        .oneOf(["UPLOADER", "REVIEWER"], "Please select a valid role"),
});

export default function AddStaffPage() {
    const [loading, setLoading] = useState<boolean>(false); // Manage loading state
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: "",
            username: "",
            password: "",
            confirmPassword: "",
            role: "",
        },
    });

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const institutionId = sessionStorage.getItem("institutionId");
    
            if (!institutionId) {
                throw new Error("Institution ID not found in session storage");
            }
    
            const response = await fetch("/api/staff/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, institutionId: parseInt(institutionId, 10) }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add staff");
            }
    
            const result = await response.json();
            console.log("Staff member added:", result);
    
            router.push("/institutional-admin-dashboard/list");
        } catch (error) {
            // Narrowing the type of `error`
            if (error instanceof Error) {
                console.error("Error adding staff:", error.message);
                alert("Failed to add staff: " + error.message);
            } else {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="h-screen bg-[#f7f4f0] flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-5xl p-6 bg-[#f7f4f0] shadow-xl rounded-lg flex flex-col space-y-6 mt-2">
                <header className="text-center mb-4">
                    <h1 className="text-2xl font-bold text-[#3a2f2c]">Add Staff</h1>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Column 1 */}
                        <div className="flex flex-col space-y-4">
                            <Controller
                                name="firstName"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="firstName"
                                        type="text"
                                        required
                                        label="First Name"
                                        placeholder="Enter first name"
                                    />
                                )}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                            <Controller
                                name="lastName"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="lastName"
                                        type="text"
                                        required
                                        label="Last Name"
                                        placeholder="Enter last name"
                                    />
                                )}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <CustomDropdown
                                        {...field}
                                        label="Role"
                                        required
                                        options={["UPLOADER", "REVIEWER"]}
                                        selectedOption={field.value}
                                        onOptionSelect={field.onChange}
                                        error={errors.role?.message}
                                    />
                                )}
                            />
                            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col space-y-4">
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <CustomDropdown
                                        {...field}
                                        label="Gender"
                                        required
                                        options={["MALE", "FEMALE"]}
                                        selectedOption={field.value}
                                        onOptionSelect={field.onChange}
                                        error={errors.gender?.message}
                                    />
                                )}
                            />
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="email"
                                        type="email"
                                        required
                                        label="Email"
                                        placeholder="Enter email"
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}

                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="username"
                                        type="text"
                                        required
                                        label="Username"
                                        placeholder="Enter username"
                                    />
                                )}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                        </div>

                        {/* Column 3 */}
                        <div className="flex flex-col space-y-4">
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="password"
                                        type="password"
                                        required
                                        label="Password"
                                        placeholder="Enter password"
                                    />
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}

                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        label="Confirm Password"
                                        placeholder="Confirm password"
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <DisabledButton isEnabled={isValid} label="Add Staff" onClick={handleSubmit(onSubmit)} />
                    </div>

                    {loading && <LoadingSpinner />} {/* Show loader when adding staff */}
                    <p className="mt-6 text-center text-sm text-[#3a2f2c]">
                        Back to{" "}
                        <Link href="/institutional-admin-dashboard/list" className="hover:underline">
                            Staff List  
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}