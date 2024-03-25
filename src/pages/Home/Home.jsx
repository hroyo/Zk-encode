import React from "react";
import Button from "@mui/material/Button";
import { ConnectButton } from "./ConnectButton"; // Import the ConnectButton component
import { PurchaseButton } from "./PurchaseButton";

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
  return (

    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      background: "linear-gradient(#f5f5f5, #445faf)", /* Blue to dark-two gradient */
      minHeight: "100vh", /* Ensure container covers entire viewport height */

    }}>
      <div style={{ position: "absolute", top: 10, right: 50 }}>
        <ConnectButton /> {/* Render the ConnectButton component */}
      </div>
      {/* Title for the store */}
      <h1 style={{ textAlign: "center", marginTop: "100px", color: "#445faf" }}>ZK-Prescriptions</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div>
          <p style={{ maxWidth: "400px", textAlign: "center" }}>Our zero-knowledge medical prescription protocol ensures tailored treatment, prioritizes patient privacy, and streamlines access to your prescriptions.</p>
        </div>
      </div>

      <ProductCenter>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px" }}>
          {/* First Medicine Section */}
          <div style={{ marginBottom: "20px", background: "white", border: "2px solid blue", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <h2 style={{ marginRight: "40px" }}>Insulin: 0.01 ETH </h2>
              <PurchaseButton /> {/* Render the PurchaseButton component */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/src/assets/insulin.jpg" alt="Insulin" style={{ width: "200px", height: "250px", marginRight: "20px" }} />
              <div>
                {/* Add description or information about Medicine A here */}
              </div>
            </div>
          </div>

          {/* Second Medicine Section */}
          <div style={{ marginBottom: "20px", background: "white", border: "2px solid blue", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <h2 style={{ marginRight: "40px" }}>Inhaler: 0.01 ETH </h2>
              <PurchaseButton /> {/* Render the PurchaseButton component */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Replace the image path and description for Medicine B */}
              <img src="/src/assets/ventolin.jpg" alt="Asthma" style={{ width: "200px", height: "250px", marginRight: "20px" }} />
              <div>
                {/* Add description or information about Medicine B here */}
              </div>
            </div>
          </div>
        </div>
      </ProductCenter>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <div style={{ maxWidth: "400px" }}>
          <p style={{ textAlign: "center", padding: "20px" }}>Living with a condition is stressful enough and should be easy to prove.</p>
        </div>
      </div>
    </div >
  );
};

export default Home;
