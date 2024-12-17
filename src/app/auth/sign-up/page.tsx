"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TermsAgreement from "../../../../components/AgreeToTerms";
import CustomDropdown from "../../../../components/CustomDropdown";
import DisabledButton from "../../../../components/DisabledButton";
import InputField from "../../../../components/InputField";
import PhotoUploader from "../../../../components/PhotoField";


// Define the Yup validation schema
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
        .required("Email is required")
        .email("Must be a valid email"),
    dateOfBirth: Yup.string()
        .required("Date of Birth is required")
        .matches(/^\d{4}\/\d{2}\/\d{2}$/, "Date of Birth must be in the format YYYY/MM/DD"),
    gender: Yup.string()
        .required("Gender is required")
        .oneOf(["male", "female", "other"], "Invalid gender"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    isChecked: Yup.bool().oneOf([true], "You must agree to the terms"),
});

export default function SignUpPage() {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
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
            username: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            password: "",
            confirmPassword: "",
            isChecked: false,
        },
    });

    // const onSubmit = (data: any) => {
    //     console.log("Form Data:", { ...data, profilePicture });
    //     router.push("/auth/preferences");
    // };


    const onSubmit = async (data: any) => {
        // Create FormData instance to handle file uploads
        const formData = new FormData();

        // Append form data to FormData instance
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("gender", data.gender);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        formData.append("isChecked", data.isChecked ? "true" : "false");

        // If profile picture exists, append it to formData
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        // Send POST request to API endpoint
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: formData,
            });


            if (response.ok) {
                const result = await response.json();

                // Assuming the API returns the user object with an 'id' field
                if (result && result.userId) {
                    // Store the userId in localStorage
                    localStorage.setItem("userId", result.userId.toString());
                }

                // Redirect to preferences page after successful submission
                router.push("/auth/preferences");
            } else {
                const result = await response.json();
                console.error("Error:", result.message);
                alert(result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="h-screen bg-[#E5E5CB] overflow-hidden flex items-center justify-center">
            <div className="w-full max-w-5xl p-6 bg-[#E5E5CB] shadow-xl rounded-lg flex flex-col space-y-6 mt-2">
                <header className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-[#3e251c]">Create Your Account</h1>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Column 1 */}
                        <div className="flex flex-col space-y-4">
                            <PhotoUploader
                                profilePicture={profilePicture}
                                onProfilePictureChange={setProfilePicture}
                                isEditable={true}
                            />
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
                                        placeholder="Enter your first name"
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
                                        placeholder="Enter your last name"
                                    />
                                )}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
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
                                        options={["male", "female"]}
                                        selectedOption={field.value}
                                        onOptionSelect={field.onChange}
                                        error={errors.gender?.message}
                                    />
                                )}
                            />
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}

                            <Controller
                                name="dateOfBirth"
                                control={control}
                                render={({ field }) => (
                                    <InputField
                                        {...field}
                                        id="dateOfBirth"
                                        type="text"
                                        required
                                        label="Date of Birth"
                                        placeholder="YYYY/MM/DD"
                                    />
                                )}
                            />
                            {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>}

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
                                        placeholder="Enter your email"
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
                                        placeholder="Enter your username"
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
                                        placeholder="Enter your password"
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
                                        placeholder="Confirm your password"
                                    />
                                )}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}

                            <Controller
                                name="isChecked"
                                control={control}
                                render={({ field }) => (
                                    <TermsAgreement
                                        isChecked={field.value ?? false}
                                        onToggle={() => field.onChange(!field.value)}
                                    />
                                )}
                            />
                            {errors.isChecked && <p className="text-red-500 text-xs mt-1">{errors.isChecked.message}</p>}

                            <div className="flex justify-center mt-4">
                                <DisabledButton isEnabled={isValid} label="Sign Up" onClick={handleSubmit(onSubmit)} />
                            </div>

                            <p className="mt-6 text-center text-sm text-[#3e251c]">
                                Already have an account?{" "}
                                <Link href="/auth/sign-in" className="hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}