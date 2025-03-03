"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../../../../components/Button";
import CustomDropdown from "../../../../../components/CustomDropdown";
import InputField from "../../../../../components/InputField";
import DynamicFields from "../../../../../components/DynamicFields";

interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  validity: string | null;
  features: string[];
  freeTrial: boolean;
  trialDuration?: string | null;
  isActive: boolean;
}

const SubscriptionPage = () => {
  const [plans, setPlans] = React.useState<SubscriptionPlan[]>([]);
  const [isFormVisible, setFormVisible] = React.useState(false);
  const [isEditMode, setEditMode] = React.useState(false);
  const [currentEditingId, setCurrentEditingId] = React.useState<number | null>(null);

  const validityOptions: string[] = ["Weekly", "Monthly", "Yearly"];
  const trialDurationOptions: string[] = ["3 days", "7 days", "14 days"];

  const predefinedPlanNames = [
    "Heritage_Weekly",
    "Chronicle_Monthly",
    "Timekeepers_Yearly_Access",
    "Free_Trial",
  ];

  // Fetch plans from the API
  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/platfromadmin/plans");
      if (!response.ok) throw new Error("Failed to fetch plans");
      const data: SubscriptionPlan[] = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  React.useEffect(() => {
    fetchPlans();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: undefined as number | undefined, // For edit mode
      name: "",
      price: "",
      validity: "",
      features: [] as string[],
      freeTrial: false,
      trialDuration: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Plan name is required")
        .max(50, "Plan name cannot exceed 50 characters"),
      price: Yup.number()
        .typeError("Price must be a valid number")
        .when("freeTrial", {
          is: false,
          then: (schema) =>
            schema.required("Price is required").positive("Price must be greater than 0"),
        }),
      validity: Yup.string().when("freeTrial", {
        is: false,
        then: (schema) => schema.required("Validity is required"),
      }),
      features: Yup.array()
        .of(Yup.string().min(3, "Feature must be at least 3 characters"))
        .min(1, "At least one feature is required"),
      trialDuration: Yup.string().when("freeTrial", {
        is: true,
        then: (schema) => schema.required("Trial duration is required"),
      }),
    }),
    onSubmit: async (values) => {
      try {
        if (isEditMode && currentEditingId !== null) {
          // Update existing plan
          const response = await fetch("/api/platfromadmin/plans/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: currentEditingId,
              name: values.name,
              price: values.freeTrial ? 0 : Number(values.price),
              validity: values.freeTrial ? null : values.validity,
              features: values.features,
              freeTrial: values.freeTrial,
              trialDuration: values.freeTrial ? values.trialDuration : null,
            }),
          });

          if (!response.ok) throw new Error("Failed to update plan");
          const updatedPlan: SubscriptionPlan = await response.json();

          setPlans((prevPlans) =>
            prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
          );
        } else {
          // Create new plan
          const response = await fetch("/api/platfromadmin/plans/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: values.name,
              price: values.freeTrial ? 0 : Number(values.price),
              validity: values.freeTrial ? null : values.validity,
              features: values.features,
              freeTrial: values.freeTrial,
              trialDuration: values.freeTrial ? values.trialDuration : null,
            }),
          });

          if (!response.ok) throw new Error("Failed to create plan");
          const newPlan: SubscriptionPlan = await response.json();

          setPlans((prevPlans) => [...prevPlans, newPlan]);
        }

        formik.resetForm();
        setFormVisible(false);
        setEditMode(false);
        setCurrentEditingId(null);
      } catch (error) {
        console.error("Error saving plan:", error);
      }
    },
  });

  const handleFeatureChange = (features: string[]) => {
    formik.setFieldValue("features", features);
  };

  // const handleTogglePlan = async (id: number) => {
  //   try {
  //     const response = await fetch("/api/plans/delete", {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ id }),
  //     });

  //     if (!response.ok) throw new Error("Failed to toggle plan");

  //     const updatedPlan: SubscriptionPlan = await response.json();

  //     setPlans((prevPlans) =>
  //       prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
  //     );
  //   } catch (error) {
  //     console.error("Error toggling plan:", error);
  //   }
  // };

  const handleTogglePlan = async (id: number, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/platfromadmin/plans/toggle", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: currentStatus }),
      });

      if (!response.ok) throw new Error("Failed to toggle plan");

      const updatedPlan: SubscriptionPlan = await response.json();

      setPlans((prevPlans) =>
        prevPlans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
      );
    } catch (error) {
      console.error("Error toggling plan:", error);
    }
  };


  const handleEditPlan = (plan: SubscriptionPlan) => {
    setCurrentEditingId(plan.id);
    setEditMode(true);
    setFormVisible(true);
    formik.setValues({
      id: plan.id,
      name: plan.name,
      price: plan.freeTrial ? "0" : String(plan.price),
      validity: plan.validity || "",
      features: plan.features,
      freeTrial: plan.freeTrial,
      trialDuration: plan.trialDuration || "",
    });
  };

  const planNameOptions = [...new Set([...plans.map((plan) => plan.name), ...predefinedPlanNames])];

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
  
    <div className="p-4 border rounded-md shadow-md">
      <Button onClick={() => setFormVisible(!isFormVisible)} variant="view" className="mb-6">
        {isFormVisible ? "Cancel" : "Create New Plan"}
      </Button>
  
      {isFormVisible && (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <CustomDropdown
                label="Plan Name"
                options={planNameOptions}
                selectedOption={formik.values.name}
                onOptionSelect={(option: string | number) => formik.setFieldValue("name", option)}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                required
              />
            </label>
  
            <label>
              <InputField
                id="plan-price"
                label="Price (ETB)"
                type="number"
                value={formik.values.price}
                onChange={(value: string) => {
                  if (/^\d*\.?\d*$/.test(value)) {
                    formik.setFieldValue("price", value);
                  }
                }}
                onBlur={formik.handleBlur}
                disabled={formik.values.freeTrial}
                required={!formik.values.freeTrial}
                error={formik.touched.price && formik.errors.price ? formik.errors.price : ""}
              />
            </label>
  
            <label>
              <CustomDropdown
                label="Validity"
                options={validityOptions}
                selectedOption={formik.values.validity}
                onOptionSelect={(option: string | number) => formik.setFieldValue("validity", option)}
                error={formik.touched.validity && formik.errors.validity ? formik.errors.validity : ""}
                required={!formik.values.freeTrial}
                disabled={formik.values.freeTrial}
              />
            </label>
  
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formik.values.freeTrial}
                onChange={(e) => formik.setFieldValue("freeTrial", e.target.checked)}
              />
              <strong className="ml-2">Enable Free Trial</strong>
            </label>
  
            {formik.values.freeTrial && (
              <label>
                <CustomDropdown
                  label="Trial Duration"
                  options={trialDurationOptions}
                  selectedOption={formik.values.trialDuration}
                  onOptionSelect={(option: string | number) => formik.setFieldValue("trialDuration", option)}
                  error={formik.touched.trialDuration && formik.errors.trialDuration ? formik.errors.trialDuration : ""}
                  required
                />
              </label>
            )}
  
            <DynamicFields
              fieldLabel="Feature"
              placeholder="Enter feature"
              onChange={handleFeatureChange}
              error={formik.errors.features as string}
            />
          </div>
  
          <Button type="submit" variant="active">
            {isEditMode ? "Update Plan" : "Create Plan"}
          </Button>
        </form>
      )}
  
      {/* Cards Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border bg-[#E5E5CB] p-4 rounded-md shadow-md space-y-2 flex flex-col"
          >
            <h3
              className="text-xl text-[#3C2A21] font-semibold"
              style={{ textDecoration: plan.isActive ? "none" : "line-through" }}
            >
              {plan.name}
            </h3>
            <p>
              <strong>Price:</strong> {plan.price.toLocaleString("en-ET")} ETB
            </p>
            {!plan.freeTrial && plan.validity && <p><strong>Validity:</strong> {plan.validity}</p>}
            {plan.freeTrial && plan.trialDuration && (
              <p><strong>Free Trial:</strong> {plan.trialDuration}</p>
            )}
            <h4 className="font-semibold">Features:</h4>
            <ul className="list-disc list-inside ml-8">
              {plan.features.length > 0 ? (
                plan.features.map((feature, featureIndex) => <li key={featureIndex}>{feature}</li>)
              ) : (
                <li>No features added</li>
              )}
            </ul>
            <div className="flex space-x-2 mt-auto">
              {/* <Button
                onClick={() => handleTogglePlan(plan.id)}
                variant={plan.isActive ? "active" : "inactive"}
              >
                {plan.isActive ? "Deactivate" : "Activate"}
              </Button> */}
              <Button
                onClick={() => handleTogglePlan(plan.id, plan.isActive)}
                variant={plan.isActive ? "active" : "inactive"}
              >
                {plan.isActive ? "Deactivate" : "Activate"}
              </Button>
  
              <Button onClick={() => handleEditPlan(plan)} variant="view">
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  

  );
};

export default SubscriptionPage;
