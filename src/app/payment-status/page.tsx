"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LogoNavBar from "../../../components/LogoNavBar";
import LoadingSpinner from "../../../components/LoadingSpinner";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
 const tx_ref = searchParams?.get("tx_ref") ?? "";

  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("Verifying your payment...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tx_ref) {
      setStatus("failed");
      setMessage("Transaction reference is missing.");
      setLoading(false);
      return;
    }

    fetch("/api/chapa/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tx_ref }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Your payment was successful, and your subscription is now active!");
          sessionStorage.setItem("userRole", "premium");
        } else {
          setStatus("failed");
          setMessage(data?.message || "Payment verification failed. Please try again.");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Payment verification error:", error);
        setStatus("failed");
        setMessage("An error occurred while verifying the payment. Please try again later.");
        setLoading(false);
      });
  }, [tx_ref]);

  const primaryColor = "#3a2f2c";
  const secondaryColor = "#F7F6E9";
  const lightGreen = "#81C784";
  const lightRed = "#E57373";

  return (
    <div style={{ backgroundColor: secondaryColor, minHeight: "100vh" }}>
      <LogoNavBar />

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: primaryColor,
          marginTop: "80px",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Payment Status</h1>

        {loading && <LoadingSpinner />}

        {status !== "pending" && !loading && (
          <>
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "8px",
                backgroundColor: status === "success" ? lightGreen : lightRed,
                color: "#fff",
              }}
            >
              <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Status: {status.toUpperCase()}
              </p>
              <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>{message}</p>
            </div>

            <div style={{ marginTop: "30px" }}>
              {status === "success" ? (
                <a
                  href="/content/content-page"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: primaryColor,
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Go to Content
                </a>
              ) : (
                <a
                  href="/subscription"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#F44336",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Retry Subscription
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div style={{ padding: "20px" }}>Loading payment status...</div>}>
      <PaymentStatusContent />
    </Suspense>
  );
}