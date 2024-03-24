import React from "react";
import Button from "@mui/material/Button";
import { ConnectButton } from "./ConnectButton"; // Import the ConnectButton component
import { PurchaseButton } from "./PurchaseButton";

const Home = () => {
  return (
    <div>


      <ConnectButton /> {/* Render the ConnectButton component */}
      {/* Add other components and buttons as needed */}
      <PurchaseButton /> {/* Render the ConnectButton component */}
    </div>
  );
};

export default Home;
