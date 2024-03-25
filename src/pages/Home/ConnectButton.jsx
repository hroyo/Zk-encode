// ConnectButton.jsx

import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import style from "../../app.module.css";

export function ConnectButton() { // Export named function ConnectButton
    const { open } = useWeb3Modal();
    const { chain } = useNetwork();

    const { isConnected, address } = useAccount();

    const handleSwitchNetwork = () => {
        open({ view: 'Networks' });
    };
    const handleDisconnect = () => {
        // Notify the parent about the disconnect event
        onDisconnect();

    };

    return (
        <div>
            <button style={{ marginTop: "7px" }}
                className={[
                    style.headingSm,
                    style.blackGreyBg,
                    style.transBtn,
                    style.radius10,
                    style.colortLight,
                    style.py_12,
                ].join(" ")}
                color="success" onClick={() => open()}>
                {isConnected ? 'Connected' : 'Connect Wallet'}
            </button>

        </div>
    );
}





// {/* {isConnected && chain?.id !== 137 && (
//     <button onClick={handleSwitchNetwork}>
//         {/* Your button content goes here */}
//         Switch Network
//     </button>
// )}

// {isConnected && (
//     <button onClick={handleDisconnect}>
//         {/* Your button content goes here */}
//         Disconnect
//     </button>
// )} */}