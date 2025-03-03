"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrows } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/Button";
import CustomDropdown from "../../../../components/CustomDropdown";
import DynamicFields from "../../../../components/DynamicFields";
import InputField from "../../../../components/InputField";
import Notification from "../../../../components/Notification";



const articleSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    alternativeTitle: Yup.string().optional(),
    coverImage: Yup.string().optional(),
    description: Yup.string().required("Description is required"),
    language: Yup.string().required("Language is required"),
    author: Yup.string().required("Author is required"),
    coAuthors: Yup.array().of(Yup.string()).optional(),
    editor: Yup.array().of(Yup.string()).optional(),
    publisher: Yup.string().required("Publisher is required"),
    publicationtDate: Yup.string().optional(),
    eventType: Yup.string().optional(),
    historicalFigures: Yup.array().of(Yup.string()).optional(),
    source: Yup.boolean().optional(),
    accessLevel: Yup.string().required("Access Level is required"),
    relatedArticles: Yup.array().of(Yup.string()).optional(),
});

const UploadArticlePage: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        article: "",
        alternativeTitle: "",
        coverImage: "",
        description: "",
        language: "",
        author: "",
        coAuthors: [] as string[],
        editor: [] as string[],
        publisher: "",
        publicationtDate: "",
        eventType: "",
        historicalFigures: [] as string[],
        source: false,
        accessLevel: "",
        relatedArticles: [] as string[],
    });

    const [errors, setFormErrors] = useState<Record<string, string>>({});
    const [isEnabled, setIsEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
        message: "",
        type: "success" as "success" | "error" | "warning",
        visible: false,
    });

    const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

    const validateFormData = async () => {
        try {
            await articleSchema.validate(formData, { abortEarly: false });
            setIsEnabled(true);
            setFormErrors({});
        } catch (err) {
            setIsEnabled(false);
            const newErrors: Record<string, string> = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach((error) => {
                    newErrors[error.path!] = error.message;
                });
            }
            setFormErrors(newErrors);
        }
    };

    useEffect(() => {
        validateFormData();
    }, [formData]);

    const handleInputChange = (value: string | boolean | number, field: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [field]: "",
        }));

        setFormTouched((prevTouched) => ({
            ...prevTouched,
            [field]: true,
        }));
    };

    const handleCastValuesChange = (values: string[], field: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: values,
        }));
    };

    const handleArticleChange = (value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            article: value,
        }));
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            article: "",
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleInputChange(reader.result as string, field);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setFormErrors({});

            await articleSchema.validate(formData, { abortEarly: false });

            console.log("Form Submitted:", formData);

            setFormData({
                title: "",
                article: "",
                alternativeTitle: "",
                coverImage: "",
                description: "",
                language: "",
                author: "",
                coAuthors: [],
                editor: [],
                publisher: "",
                publicationtDate: "",
                eventType: "",
                historicalFigures: [],
                source: false,
                accessLevel: "",
                relatedArticles: [],
            });

            setNotification({
                message: "Article uploaded successfully!",
                type: "success",
                visible: true,
            });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: Record<string, string> = {};
                error.inner.forEach((err) => {
                    newErrors[err.path!] = err.message;
                });
                setFormErrors(newErrors);
            }
            console.log("Validation Errors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, visible: false }));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <Button onClick={() => router.push("/uploader-dashboard/article")} variant="view" className="flex items-center">
                    <FontAwesomeIcon icon={faArrows} className="mr-1" />
                    Back to Article List
                </Button>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                    <div className="flex flex-col space-y-4">
                        <div className="block mb-2">
                            <label className="block mb-2 flex items-center">
                                <span>Write Your Article</span>
                                <span className="text-red-700 text-2xl ml-1">*</span>
                            </label>
                           
                            {formTouched.article && errors.article && (
                                <p className="text-red-500 text-sm mt-1">{errors.article}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 flex items-center">
                                <span>Upload Cover Image</span>
                                <span className="text-red-700 text-2xl ml-1">*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, "coverImage")}
                            />
                            {formTouched.coverImage && errors.coverImage && (
                                <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
                            )}
                        </div>
                        <InputField
                            id="title"
                            type="text"
                            label="Title"
                            required
                            value={formData.title}
                            onChange={(value) => handleInputChange(value, "title")}
                            placeholder="Enter title"
                        />
                        {formTouched.title && errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}

                        <InputField
                            id="alternativeTitle"
                            type="text"
                            label="Alternative Title"
                            value={formData.alternativeTitle}
                            onChange={(value) => handleInputChange(value, "alternativeTitle")}
                            placeholder="Enter alternative title"
                        />
                        <InputField
                            id="description"
                            type="textarea"
                            label="Description"
                            required
                            value={formData.description}
                            onChange={(value) => handleInputChange(value, "description")}
                            placeholder="Enter description"
                        />
                        <CustomDropdown
                            label="Language"
                            required
                            selectedOption={String(formData.language)}
                            onOptionSelect={(value) => handleInputChange(value, "language")}
                            options={["Amharic", "Geez", "Afan Oromo", "Tigrinya", "Somali", "Afar", "Wolaytta", "English"]}
                        />
                        {formTouched.language && errors.language && (
                            <p className="text-red-500 text-sm mt-1">{errors.language}</p>
                        )}

                        <InputField
                            id="author"
                            type="text"
                            label="Author"
                            required
                            value={formData.author}
                            onChange={(value) => handleInputChange(value, "author")}
                            placeholder="Enter author name"
                        />
                        {formTouched.author && errors.author && (
                            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                        )}

                        <DynamicFields
                            fieldLabel="Co-Authors"
                            placeholder="Enter co-author names"
                            onChange={(values) => handleCastValuesChange(values, "coAuthors")}
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <CustomDropdown
                            label="Access Level"
                            required
                            selectedOption={String(formData.accessLevel)}
                            onOptionSelect={(value) => handleInputChange(value, "accessLevel")}
                            options={["Public", "Premium", "Researcher"]}
                        />

                        <InputField
                            id="publisher"
                            type="text"
                            label="Publisher"
                            required
                            value={formData.publisher}
                            onChange={(value) => handleInputChange(value, "publisher")}
                            placeholder="Enter publisher"
                        />
                        {formTouched.publisher && errors.publisher && (
                            <p className="text-red-500 text-sm mt-1">{errors.publisher}</p>
                        )}

                        <InputField
                            id="publicationtDate"
                            type="text"
                            label="Publication Date"
                            value={formData.publicationtDate}
                            onChange={(value) => handleInputChange(value, "publicationtDate")}
                            placeholder="YYYY-MM-DD"
                        />

                        <CustomDropdown
                            label="Event Type"
                            required
                            selectedOption={String(formData.eventType)}
                            onOptionSelect={(value) => handleInputChange(value, "eventType")}
                            options={["Wars", "Politics", "Religion", "Culture", "Famine & Crisis", "Civil Rights", "Economy", "Diplomacy", "Leadership", "Ethnic Movements"]} // Sample event types
                        />
                        {formTouched.eventType && errors.eventType && (
                            <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>
                        )}

                        <DynamicFields
                            fieldLabel="Historical Figures"
                            required
                            placeholder="Enter historical figures"
                            onChange={(values) => handleCastValuesChange(values, "historicalFigures")}
                        />
                        <DynamicFields
                            fieldLabel="Related Articles"
                            placeholder="Enter related articles"
                            onChange={(values) => handleCastValuesChange(values, "relatedArticles")}
                        />

                        <Button
                            disabled={!isEnabled || isLoading}
                            loading={isLoading}
                            onClick={handleSubmit}
                            className="mt-2"
                            variant="view"
                            size="md"
                        >
                            Submit
                        </Button>
                        <Button variant="border" onClick={() => router.push("/uploader-dashboard/article")} className="mt-4 mb-12">
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>

            <Notification
                message={notification.message}
                type={notification.type}
                visible={notification.visible}
                onClose={closeNotification}
            />
        </div>
    );
};

export default UploadArticlePage;