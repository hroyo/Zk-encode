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
      background: "linear-gradient(#f5f5f5, #FFB5D9, #00C9BD)", /* Blue to dark-two gradient */
      minHeight: "100vh", /* Ensure container covers entire viewport height */

    }}>
      <img src="/src/assets/pharma.png" alt="Pharma Logo" style={{ position: "absolute", top: 10, left: 10, width: "100px" }} />

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
              <h2>Epipen: <span style={{ fontWeight: "normal", marginRight: "16px" }}>Ξ 0.001</span></h2>
              <PurchaseButton /> {/* Render the PurchaseButton component */}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="/src/assets/insulin.png" alt="Insulin" style={{ width: "250px", height: "250px", marginRight: "20px" }} />
              <div>
                {/* Add description or information about Medicine A here */}
              </div>
            </div>
          </div>

          {/* Second Medicine Section */}
          <div style={{ marginBottom: "20px", background: "white", borderRadius: "25px", border: "4px solid #1d47b2", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <h2>Ventoline: <span style={{ fontWeight: "normal", marginRight: "16px" }}>Ξ 0.002</span></h2>
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
          <p style={{ textAlign: "center", padding: "20px" }}>Safely prove your medical conditions without revealing your legal identity.</p>
        </div>
      </div>
      <footer style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
        {/* <p style={{ marginRight: "40px" }}>Get in touch: </p> */}

        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="https://sepolia.etherscan.io/address/0xd3f2cc3e0214c8ae9c32722f50ac442af36a135a" style={{ color: "black", marginRight: "40px" }}>Verifier Contract</a>
          <a href="https://sepolia.etherscan.io/address/0xd3f2cc3e0214c8ae9c32722f50ac442af36a135a" style={{ color: "black", marginRight: "40px" }}>Store Contract</a>

          <a href="https://github.com/yourgithubusername" style={{ marginRight: "30px" }}>
            <img src="/src/assets/githublogo.png" alt="GitHub Logo" style={{ width: "30px" }} />
          </a>
          <a href="https://github.com/yourgithubusername">
            <img src="/src/assets/telegram.svg" alt="Telegram Logo" style={{ width: "30px" }} />
          </a>
        </div>
      </footer>
    </div >
  );
};

export default Home;
