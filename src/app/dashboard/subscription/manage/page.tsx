
// "use client";

// import React, { useState } from "react";
// import Table from "../../../../../components/Table";
// import Button from "../../../../../components/Button";
// import SearchBar from "../../../../../components/SearchBar"; // Import SearchBar

// const ManageSubscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState([
//     {
//       id: 1,
//       user: "John Doe",
//       plan: "Premium Plan",
//       status: "Active",
//       paymentStatus: "Paid",
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//       price: 200,
//     },
//     {
//       id: 2,
//       user: "Jane Smith",
//       plan: "Basic Plan",
//       status: "Cancelled",
//       paymentStatus: "Paid Twice",
//       startDate: "2024-01-01",
//       endDate: "2024-06-30",
//       price: 100,
//     },
//     {
//       id: 3,
//       user: "Michael Brown",
//       plan: "Enterprise Plan",
//       status: "Pending",
//       paymentStatus: "Failed",
//       startDate: "2024-02-01",
//       endDate: "2024-12-31",
//       price: 300,
//     },
//   ]);

//   const [refundRequests, setRefundRequests] = useState([
//     {
//       id: 1,
//       user: "Jane Smith",
//       status: "Pending",
//       reason: "Service not as expected",
//       subscriptionId: 2,
//     },
//     {
//       id: 2,
//       user: "Michael Brown",
//       status: "Pending",
//       reason: "Duplicate payment",
//       subscriptionId: 3,
//     },
//   ]);

//   const predefinedReasons = [
//     "Service not as expected",
//     "Duplicate payment",
//     "Billing issue",
//     "Other",
//   ];

//   const calculateRefundAmount = (subscriptionId: number, paymentStatus: string): string => {
//     const subscription = subscriptions.find((sub) => sub.id === subscriptionId);
//     if (subscription) {
//       if (paymentStatus === "Paid Twice") {
//         return `$${subscription.price.toFixed(2)}`;
//       } else if (subscription.status === "Cancelled") {
//         const refundAmount = (subscription.price * 0.5).toFixed(2);
//         return `$${refundAmount}`;
//       }
//     }
//     return "$0.00";
//   };

//   const handleProcessRefund = (id: number, action: string) => {
//     setRefundRequests((prev) =>
//       prev.map((request) =>
//         request.id === id ? { ...request, status: action } : request
//       )
//     );
//   //  console.log(Refund ${action} for request ${id});
//   };

//   // Filter subscriptions based on search and filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All");

//   const filteredSubscriptions = subscriptions.filter((sub) => {
//       const matchesSearch =
//         sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         sub.plan.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = filter === "All" || sub.status === filter;
//       return matchesSearch && matchesStatus;
//     });

//   const activeSubscriptions = filteredSubscriptions.filter(sub => sub.status === "Active").length;
//   const churnRate = (filteredSubscriptions.filter(sub => sub.status === "Cancelled").length / filteredSubscriptions.length) * 100;
//   const pendingRenewals = filteredSubscriptions.filter(sub => new Date(sub.endDate) <= new Date() && sub.status === "Pending").length;

//   const handleSearch = (searchTerm: string, selectedFilter: string) => {
//     setSearchTerm(searchTerm);
//     setFilter(selectedFilter);
//   };

//   return (
//     <div className="px-4 md:px-8 lg:px-16">
//       <h1 className="text-2xl font-bold text-[#3a2f2c] mb-6">Manage Subscriptions</h1>

//       {/* Search Bar */}
//       <SearchBar
//         onSearch={handleSearch}
//         filters={["All", "Active", "Cancelled", "Pending"]}
//       />

//       {/* Add margin here to adjust space */}
//       <div className="mb-8"></div> {/* Custom margin */}

// {/* Metrics Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="bg-[#E5E5CB] p-4 rounded shadow">
//           <h2 className="font-semibold text-[#3a2f2c]">Active Subscriptions</h2>
//           <p className="text-2xl font-bold">{activeSubscriptions}</p>
//         </div>
//         <div className="bg-[#E5E5CB] p-4 rounded shadow">
//           <h2 className="font-semibold text-[#3a2f2c]">Churn Rate</h2>
//           <p className="text-2xl font-bold">{churnRate.toFixed(2)}%</p>
//         </div>
//         <div className="bg-[#E5E5CB] p-4 rounded shadow">
//           <h2 className="font-semibold text-[#3a2f2c]">Pending Renewals</h2>
//           <p className="text-2xl font-bold">{pendingRenewals}</p>
//         </div>
//       </div>

//       {/* Subscriptions Table */}
//       <div className="bg-[#f7f4f0] rounded shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold text-[#3a2f2c] mb-4">Active Subscriptions</h2>
//         <Table
//           headers={["User", "Plan", "Status", "Payment", "Start Date", "End Date", "Actions"]}
//           data={filteredSubscriptions}
//           renderRow={(sub) => (
//             <>
//               <td className="border px-4 py-2">{sub.user}</td>
//               <td className="border px-4 py-2">{sub.plan}</td>
//               <td className="border px-4 py-2">{sub.status}</td>
//               <td className="border px-4 py-2">{sub.paymentStatus}</td>
//               <td className="border px-4 py-2">{sub.startDate}</td>
//               <td className="border px-4 py-2">{sub.endDate}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 <Button
//                   size="sm"
//                   variant={sub.status === "Active" ? "inactive" : "active"}
//                   onClick={() =>
//                     setSubscriptions((prev) =>
//                       prev.map((s) =>
//                         s.id === sub.id
//                           ? { ...s, status: sub.status === "Active" ? "Cancelled" : "Active" }
//                           : s
//                       )
//                     )
//                   }
//                 >
//                   {sub.status === "Active" ? "Cancel" : "Enable"}
//                 </Button>
//               </td>
//             </>
//           )}
//         />
//       </div>

//       {/* Refund Requests Table */}
//       <div className="bg-[#f7f4f0] rounded shadow p-4">
//         <h2 className="text-lg font-semibold text-[#3a2f2c] mb-4">Refund Requests</h2>
//         <Table
//           headers={["User", "Refund Amount", "Reason", "Status", "Actions"]}
//           data={refundRequests}
//           renderRow={(request) => {
//             const subscriptionRefundAmount = calculateRefundAmount(
//               request.subscriptionId,
//               subscriptions.find((sub) => sub.id === request.subscriptionId)?.paymentStatus || ""
//             );

// return (
//               <>
//                 <td className="border px-4 py-2">{request.user}</td>
//                 <td className="border px-4 py-2">{subscriptionRefundAmount}</td>
//                 <td className="border px-4 py-2">{request.reason}</td>
//                 <td className="border px-4 py-2">{request.status}</td>
//                 <td className="border px-4 py-2 space-x-2">
//                   {request.status === "Pending" ? (
//                     <>
//                       <Button
//                         variant="active"
//                         size="sm"
//                         onClick={() => handleProcessRefund(request.id, "Approved")}
//                       >
//                         Approve
//                       </Button>
//                       <Button
//                         variant="inactive"
//                         size="sm"
//                         onClick={() => handleProcessRefund(request.id, "Rejected")}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   ) : (
//                     <span className="text-gray-500">{request.status}</span>
//                   )}
//                 </td>
//               </>
//             );
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ManageSubscriptions;


// "use client";

// import React, { useState, useEffect } from "react";
// import Table from "../../../../../components/Table";
// import Button from "../../../../../components/Button";
// import SearchBar from "../../../../../components/SearchBar"; // Import SearchBar

// const ManageSubscriptions = () => {
//   const [subscriptions, setSubscriptions] = useState<any[]>([]); // Ensure subscriptions is an array
//   const [metrics, setMetrics] = useState<any>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filter, setFilter] = useState("All"); // The filter selected by user (Active, Cancelled, Pending, All)
//   const [filteredSubscriptions, setFilteredSubscriptions] = useState<any[]>([]); // State for filtered subscriptions

//   // Fetch subscriptions and metrics data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resSub = await fetch(`/api/platfromadmin/subscriptions?search=${searchTerm}`);
//         const subscriptionData = await resSub.json();

//         // Check if subscriptionData is an array before setting state
//         if (Array.isArray(subscriptionData)) {
//           setSubscriptions(subscriptionData);
//         } else {
//           console.error("Fetched subscriptions are not in the expected array format:", subscriptionData);
//           setSubscriptions([]);  // Fallback to empty array if the data is not in the expected format
//         }

//         const resMetrics = await fetch('/api/platfromadmin/subscriptions/metrics');
//         const metricsData = await resMetrics.json();
//         setMetrics(metricsData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setSubscriptions([]);  // Fallback to empty array if there's an error
//       }
//     };
//     fetchData();
//   }, [searchTerm]); // We only want to fetch data when searchTerm changes

//   // Function to filter subscriptions based on the selected filter
//   useEffect(() => {
//     let filtered = subscriptions;

//     if (filter !== "All") {
//       filtered = subscriptions.filter((sub) =>
//         filter === "Active" ? sub.isActive : !sub.isActive
//       );
//     }

//     setFilteredSubscriptions(filtered);
//   }, [filter, subscriptions]); // Re-run filter logic when filter or subscriptions change

//   const handleSearch = (searchTerm: string, selectedFilter: string) => {
//     setSearchTerm(searchTerm);
//     setFilter(selectedFilter);
//   };

//   const handleUpdateSubscription = async (id: number, isActive: boolean) => {
//     try {
//       // Send update request to the server to change the subscription status
//       const res = await fetch('/api/platfromadmin/subscriptions/update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id, isActive }),
//       });

//       if (!res.ok) {
//         throw new Error('Failed to update subscription');
//       }

//       const updatedSubscription = await res.json();

//       // Update the subscription list on the client side by modifying the specific subscription's `isActive` field
//       setSubscriptions((prevSubscriptions) =>
//         prevSubscriptions.map((sub) =>
//           sub.id === updatedSubscription.id
//             ? { ...sub, isActive: updatedSubscription.isActive } // Only update the `isActive` field
//             : sub
//         )
//       );

//       // Update filteredSubscriptions to reflect this immediately, but only the `isActive` change
//       setFilteredSubscriptions((prevFilteredSubscriptions) =>
//         prevFilteredSubscriptions.map((sub) =>
//           sub.id === updatedSubscription.id
//             ? { ...sub, isActive: updatedSubscription.isActive } // Only update the `isActive` field
//             : sub
//         )
//       );

//       // Re-fetch the metrics after subscription update
//       const resMetrics = await fetch('/api/platfromadmin/subscriptions/metrics');
//       const metricsData = await resMetrics.json();
//       setMetrics(metricsData); // Update metrics with new values

//     } catch (error) {
//       console.error('Error updating subscription:', error);
//     }
//   };

//   return (
//     <div className="px-4 md:px-8 lg:px-16">
//       <h1 className="text-2xl font-bold text-[#3a2f2c] mb-6">Manage Subscriptions</h1>

//       {/* Search Bar */}
//       <SearchBar
//         onSearch={handleSearch}
//         filters={["All", "Active", "Inactive", "Cancelled", "Pending"]}
//       />

//       {/* Metrics Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <div className="bg-[#E5E5CB] p-4 rounded shadow">
//           <h2 className="font-semibold text-[#3a2f2c]">Active Subscriptions</h2>
//           <p className="text-2xl font-bold">{metrics.activeSubscriptions || 0}</p>
//         </div>
//         <div className="bg-[#E5E5CB] p-4 rounded shadow">
//           <h2 className="font-semibold text-[#3a2f2c]">Churn Rate</h2>
//           <p className="text-2xl font-bold">{metrics.churnRate?.toFixed(2)}%</p>
//         </div>
//         <div className="bg-[#E5E5CB] p-4 rounded shadow">
//           <h2 className="font-semibold text-[#3a2f2c]">Pending Renewals</h2>
//           <p className="text-2xl font-bold">{metrics.inactive || 0}</p>
//         </div>
//       </div>

//       {/* Subscriptions Table */}
//       <div className="bg-[#f7f4f0] rounded shadow p-4 mb-6">
//         <h2 className="text-lg font-semibold text-[#3a2f2c] mb-4">Subscriptions</h2>
//         <Table
//           headers={["User", "Plan", "Status", "Payment", "Start Date", "End Date", "Actions"]}
//           data={filteredSubscriptions} // Use filtered subscriptions here
//           renderRow={(sub) => (
//             <>
//               <td className="border px-4 py-2">{sub.user?.firstName} {sub.user?.lastName}</td>
//               <td className="border px-4 py-2">{sub.plan?.name}</td>
//               <td className="border px-4 py-2">{sub.isActive ? "Active" : "Cancelled"}</td>
//               <td className="border px-4 py-2">{sub.plan?.price}</td>
//               <td className="border px-4 py-2">{sub.startDate}</td>
//               <td className="border px-4 py-2">{sub.endDate}</td>
//               <td className="border px-4 py-2 space-x-2">
//                 <Button
//                   size="sm"
//                   variant={sub.isActive ? "inactive" : "active"}
//                   onClick={() =>
//                     handleUpdateSubscription(sub.id, !sub.isActive)
//                   }
//                 >
//                   {sub.isActive ? "Cancel" : "Enable"}
//                 </Button>
//               </td>
//             </>
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default ManageSubscriptions;


"use client";

import React, { useState, useEffect } from "react";
import Table from "../../../../../components/Table";
import Button from "../../../../../components/Button";
import SearchBar from "../../../../../components/SearchBar"; // Import SearchBar

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]); // Ensure subscriptions is an array
  const [canceledSubscriptions, setCanceledSubscriptions] = useState<any[]>([]); // Canceled subscriptions
  const [metrics, setMetrics] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All"); // The filter selected by user (Active, Cancelled, Pending, All)
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<any[]>([]); // State for filtered subscriptions

  // Fetch subscriptions and metrics data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSub = await fetch(`/api/platfromadmin/subscriptions?search=${searchTerm}`);
        const subscriptionData = await resSub.json();

        // Check if subscriptionData is an array before setting state
        if (Array.isArray(subscriptionData)) {
          setSubscriptions(subscriptionData);
        } else {
          console.error("Fetched subscriptions are not in the expected array format:", subscriptionData);
          setSubscriptions([]); // Fallback to empty array if the data is not in the expected format
        }

        const resMetrics = await fetch('/api/platfromadmin/subscriptions/metrics');
        const metricsData = await resMetrics.json();
        setMetrics(metricsData);

        // Fetch canceled subscriptions
        const resCanceled = await fetch('/api/platfromadmin/subscriptions/cancellation');
        const canceledData = await resCanceled.json();
        setCanceledSubscriptions(canceledData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSubscriptions([]); // Fallback to empty array if there's an error
      }
    };
    fetchData();
  }, [searchTerm]); // We only want to fetch data when searchTerm changes

  // Function to filter subscriptions based on the selected filter
  useEffect(() => {
    let filtered = subscriptions;

    if (filter !== "All") {
      filtered = subscriptions.filter((sub) =>
        filter === "Active" ? sub.isActive : !sub.isActive
      );
    }

    setFilteredSubscriptions(filtered);
  }, [filter, subscriptions]); // Re-run filter logic when filter or subscriptions change

  const handleSearch = (searchTerm: string, selectedFilter: string) => {
    setSearchTerm(searchTerm);
    setFilter(selectedFilter);
  };

  const handleUpdateSubscription = async (id: number, isActive: boolean) => {
    try {
      // Send update request to the server to change the subscription status
      const res = await fetch('/api/platfromadmin/subscriptions/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, isActive }),
      });

      if (!res.ok) {
        throw new Error('Failed to update subscription');
      }

      const updatedSubscription = await res.json();

      // Update the subscription list on the client side by modifying the specific subscription's `isActive` field
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((sub) =>
          sub.id === updatedSubscription.id
            ? { ...sub, isActive: updatedSubscription.isActive } // Only update the `isActive` field
            : sub
        )
      );

      // Update filteredSubscriptions to reflect this immediately, but only the `isActive` change
      setFilteredSubscriptions((prevFilteredSubscriptions) =>
        prevFilteredSubscriptions.map((sub) =>
          sub.id === updatedSubscription.id
            ? { ...sub, isActive: updatedSubscription.isActive } // Only update the `isActive` field
            : sub
        )
      );

      // Re-fetch the metrics after subscription update
      const resMetrics = await fetch('/api/platfromadmin/subscriptions/metrics');
      const metricsData = await resMetrics.json();
      setMetrics(metricsData); // Update metrics with new values

    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <h1 className="text-2xl font-bold text-[#3a2f2c] mb-6">Manage Subscriptions</h1>

      {/* Search Bar */}
      <SearchBar
        onSearch={handleSearch}
        filters={["All", "Active", "Inactive", "Cancelled"]}
      />

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-8">
        <div className="bg-[#E5E5CB] p-4 rounded shadow">
          <h2 className="font-semibold text-[#3a2f2c]">Active Subscriptions</h2>
          <p className="text-2xl font-bold">{metrics.activeSubscriptions || 0}</p>
        </div>
        <div className="bg-[#E5E5CB] p-4 rounded shadow">
          <h2 className="font-semibold text-[#3a2f2c]">Churn Rate</h2>
          <p className="text-2xl font-bold">{metrics.churnRate?.toFixed(2)}%</p>
        </div>
        <div className="bg-[#E5E5CB] p-4 rounded shadow">
          <h2 className="font-semibold text-[#3a2f2c]">Canceled Subscriptions</h2>
          <p className="text-2xl font-bold">{canceledSubscriptions.length || 0}</p>
        </div>
      </div>


      {/* Subscriptions Table */}
      <div className="bg-[#f7f4f0] rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold text-[#3a2f2c] mb-4">Subscriptions</h2>
        <Table
          headers={["User", "Plan", "Status", "Payment", "Start Date", "End Date", "Actions"]}
          data={filteredSubscriptions} // Use filtered subscriptions here
          renderRow={(sub) => (
            <>
              <td className="border px-4 py-2">{sub.user?.firstName} {sub.user?.lastName}</td>
              <td className="border px-4 py-2">{sub.plan?.name}</td>
              <td className="border px-4 py-2">{sub.isActive ? "Active" : "Cancelled"}</td>
              <td className="border px-4 py-2">{sub.plan?.price}</td>
              <td className="border px-4 py-2">{sub.startDate}</td>
              <td className="border px-4 py-2">{sub.endDate}</td>
              <td className="border px-4 py-2 space-x-2">
                <Button
                  size="sm"
                  variant={sub.isActive ? "inactive" : "active"}
                  onClick={() =>
                    handleUpdateSubscription(sub.id, !sub.isActive)
                  }
                >
                  {sub.isActive ? "Cancel" : "Enable"}
                </Button>
              </td>
            </>
          )}
        />
      </div>

      {/* Canceled Subscriptions Table */}
      <div className="bg-[#f7f4f0] rounded shadow p-4">
        <h2 className="text-lg font-semibold text-[#3a2f2c] mb-4">Canceled Subscriptions</h2>
        <Table
          headers={["User", "Plan", "Price", "Cancellation Reason"]}
          data={canceledSubscriptions}
          renderRow={(sub) => (
            <>
              <td className="border px-4 py-2">{sub.user?.firstName} {sub.user?.lastName}</td>
              <td className="border px-4 py-2">{sub.plan?.name}</td>
              <td className="border px-4 py-2">{sub.plan?.price}</td>
              <td className="border px-4 py-2">{sub.cancellationReason}</td>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default ManageSubscriptions;
