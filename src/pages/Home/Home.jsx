import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ConnectButton } from "./ConnectButton"; // Import the ConnectButton component
import { PurchaseButton } from "./PurchaseButton";
import insulinImage from '../../assets/insulin.png'; // Assuming this is the correct path to your image
import inhalerImage from '../../assets/ventolin.jpg'; // Assuming this is the correct path to your image
import githublogo from '../../assets/githublogo.png'; // Assuming this is the correct path to your image
import telegram from '../../assets/telegram.svg'; // Assuming this is the correct path to your image
import pharma from '../../assets/pharma.png'; // Assuming this is the correct path to your image

const ProductCenter = ({ children }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
      <div>
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  const [processingTransaction, setProcessingTransaction] = useState(false);

  const handlePurchase = () => {
    // Perform transaction logic here
    setProcessingTransaction(true);

    // Simulate transaction completion after 3 seconds
    setTimeout(() => {
      setProcessingTransaction(false);
    }, 3000);
  };

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      background: "linear-gradient(#f5f5f5, #B8D2E4, #00C9BD)", /* Blue to dark-two gradient */
      minHeight: "100vh", /* Ensure container covers entire viewport height */
    }}>
      {processingTransaction && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          }}>
            Transaction in progress...
          </div>
        </div>
      )}

      <img src={pharma} alt="Pharma Logo" style={{ position: "absolute", top: 10, left: 10, width: "100px" }} />

      <div style={{ position: "absolute", top: 10, right: 50 }}>
        <ConnectButton /> {/* Render the ConnectButton component */}
      </div>
      {/* Title for the store */}
      <h1 style={{ textAlign: "center", marginTop: "100px", color: "#445faf" }}>Welcome to SecureMeds™</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div>
          <p style={{ maxWidth: "400px", textAlign: "center" }}>Our zero-knowledge medical prescription protocol ensures tailored treatment, prioritizes patient privacy, and streamlines access to your prescriptions. </p>
        </div>
      </div>

      <ProductCenter>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px" }}>
          {/* First Medicine Section */}
          <div style={{ marginBottom: "20px", background: "white", borderRadius: "25px", border: "4px solid #1d47b2", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <h2>Epipen: <span style={{ fontWeight: "normal", marginRight: "16px" }}>Ξ 0.002</span></h2>
              <PurchaseButton purchaseFunction="buyMedicineB" onClick={handlePurchase}/> {/* Render the PurchaseButton component */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={insulinImage} alt="Insulin" style={{ width: "250px", height: "250px", marginRight: "20px" }} />
              <div>
                {/* Add description or information about Medicine A here */}
              </div>
            </div>
          </div>

          {/* Second Medicine Section */}
          <div style={{ marginBottom: "20px", background: "white", borderRadius: "25px", border: "4px solid #1d47b2", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <h2>Ventoline: <span style={{ fontWeight: "normal", marginRight: "16px" }}>Ξ 0.001</span></h2>
              <PurchaseButton purchaseFunction="buyMedicineA" onClick={handlePurchase}/> {/* Render the PurchaseButton component */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Replace the image path and description for Medicine B */}
              <img src={inhalerImage} alt="Asthma" style={{ width: "200px", height: "250px", marginRight: "20px" }} />
              <div>
                {/* Add description or information about Medicine B here */}
              </div>
            </div>
          </div>
        </div>
      </ProductCenter>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div style={{ maxWidth: "400px" }}>
          <p style={{ textAlign: "center", padding: "20px" }}>Safely prove your medical conditions without revealing your legal identity.</p>
        </div>
      </div>
      <footer style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
        {/* <p style={{ marginRight: "40px" }}>Get in touch: </p> */}

        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="https://sepolia.etherscan.io/address/0xd3f2cc3e0214c8ae9c32722f50ac442af36a135a" style={{ color: "black", marginRight: "40px" }}>Verifier Contract</a>
          <a href="https://sepolia.etherscan.io/address/0xd3f2cc3e0214c8ae9c32722f50ac442af36a135a" style={{ color: "black", marginRight: "40px" }}>Store Contract</a>

          <a href="https://github.com/yourgithubusername" style={{ marginRight: "30px" }}>
            <img src={githublogo} alt="GitHub Logo" style={{ width: "30px" }} />
          </a>
          <a href="https://github.com/yourgithubusername">
            <img src={telegram} alt="Telegram Logo" style={{ width: "30px" }} />
          </a>
        </div>
      </footer>
    </div >
  );
};

export default Home;
