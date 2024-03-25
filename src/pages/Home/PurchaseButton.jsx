import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";


// Import ethers.js
import { ethers } from 'ethers';

// Import your contract ABI (replace YourContractABI with the actual ABI)
import YourContractABI from '../../PharmacyAbi.json';

export function PurchaseButton() {
    const { open } = useWeb3Modal();
    const { chain } = useNetwork();
    const { isConnected, address } = useAccount();

    const [contractInstance, setContractInstance] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDisconnect = () => {
        // Notify the parent about the disconnect event
        onDisconnect();
    };

    const initializeContract = async () => {
        try {
            // Connect to the Ethereum network
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Load the contract
            const contract = new ethers.Contract('0x6a651566a60f08e395068e0c20b29d0e95a5f875', YourContractABI, provider.getSigner());
            setContractInstance(contract);
            setLoading(false); // Set loading to false after contract initialization
        } catch (error) {
            console.error('Error initializing contract:', error);
            setLoading(false); // Set loading to false even if initialization fails
        }
    };

    const transformResponseToProofFormat = (responseJson) => {
        const response = JSON.parse(responseJson);
        console.log("HERE COMES RESPONSE")
        console.log(response)
        const proof = [
            response.proof.a,
            [response.proof.b[0], response.proof.b[1]],
            response.proof.c
        ];

        // Log the transformed proof to verify
        console.log("PROOF TRANSFORMED")
        console.log(proof);

        const old_proof = [
            [
                "0x028195c34e9134e151da7e8f5e8e6f72ef3481ef13d9020da3680db9d877ba57",
                "0x061aba800eca508650d0c15a1b4553bb9a12cfb1e72632eadfba0e2a8cbfff2a"
            ],
            [
                [
                    "0x1ee8688e3b35d9618dba7322577e3561aa9eca1a9e6e358daf85e9ca51bec41c",
                    "0x0fef8bda9453610afcf1d27ce8e87f4d40cba40cd7da7270e41ad3f1883e4780"
                ],
                [
                    "0x2e82664278fbd161f4b1c874a3055bade74d45367f98c916921cd68b43bced6e",
                    "0x26d8776468a53ccf2b04b7301edd121cec896e6d0ddf857201e96b849ed0171e"
                ]
            ],
            [
                "0x2c198321be1bcfd3a916a8360b73841aa5fb6e8a47758632deac22a66a21cfdb",
                "0x2b2bc53f9dd2df776c96f2de8eeafe13d32309c06e8abc2cfd8daa26d2dc6b65"
            ]
        ];
        console.log(old_proof == proof)
        console.log("OLD PROOF")
        console.log(old_proof)
        return proof;
    };

    const callContractFunction = async () => {
        try {
            console.log("HELLO: ", address)

            //// PROCESS ENV
            const response = await fetch('http://localhost:5000/generate-proof', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "address": address })
            });
            const data = await response.json();
            console.log(data)

            if (!contractInstance) {
                throw new Error('Contract instance is not initialized.');
            }
            console.log(response["proof"])
            // Call the function on the contract instance
            const transformedProof = transformResponseToProofFormat(data["proof"]);
            console.log(transformedProof);

            const result = await contractInstance.buyMedicineA(transformedProof, {
                value: ethers.utils.parseEther("0.001") // Replace "0.1" with the amount you want to send in Ether
            }); // Assuming buyMedicineA is a public method
            console.log(result); // Handle the result as needed
        } catch (error) {
            console.error('Error calling contract function:', error);
        }
    };

    useEffect(() => {
        // Initialize contract when component mounts
        initializeContract();
    }, []);

    return (
        <div>
            {isConnected && !loading && (
                <div>
                    <div>
                        <button onClick={callContractFunction}
                            style={{
                                border: "2px solid #445faf", // Set green border
                                borderRadius: "25px", // Optional: Add rounded corners
                                padding: "10px 20px", // Optional: Add padding
                                fontSize: "16px", // Optional: Adjust font size
                                backgroundColor: "#445faf", // Optional: Set transparent background
                                color: "white",
                                cursor: "pointer", // Optional: Add pointer cursor on hover

                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#334499")} // Change background color on hover
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#445faf")} >
                            Zk Buy
                        </button>
                    </div>

                </div>
            )
            }

            {loading && <p>Loading...</p>}
        </div >
    );
}
