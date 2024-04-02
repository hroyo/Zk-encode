import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useZokrates } from "../../contexts/ZokratesContext";
import { arrayBufferToBase64, base64ToArrayBuffer } from "../../utils/converter";
import LoadingModal from './LoadingModal'; // Import the LoadingModal component
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


// Import ethers.js
import { ethers } from 'ethers';

// Import your contract ABI (replace YourContractABI with the actual ABI)
import YourContractABI from '../../PharmacyAbi.json';

export function PurchaseButton({ purchaseFunction }) {
    const [processingTransaction, setProcessingTransaction] = useState(false);
    const [transactionSuccess, setTransactionSuccess] = useState(null);
    const { open } = useWeb3Modal();
    const { chain } = useNetwork();
    const { isConnected, address } = useAccount();

    const [contractInstance, setContractInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [proveKeyString, setProveKeyString] = useState('');
    const [programString, setProgramString] = useState('');
    const zk = useZokrates();

    const handleDisconnect = () => {
        // Notify the parent about the disconnect event
        onDisconnect();
    };

    const initializeContract = async () => {
        try {
            // Connect to the Ethereum network
            const provider = new ethers.providers.Web3Provider(window.ethereum);

            // Load the contract
            const contract = new ethers.Contract('0x67a8a2843298a6e6f83e84d1d368fc078a1bb7a7', YourContractABI, provider.getSigner());
            setContractInstance(contract);
            setLoading(false); // Set loading to false after contract initialization
        } catch (error) {
            console.error('Error initializing contract:', error);
            setLoading(false); // Set loading to false even if initialization fails
        }
    };

    const transformResponseToProofFormat = (responseJson) => {
        return [
                    responseJson["a"],
                    [responseJson["b"][0], responseJson["b"][1]],
                    responseJson["c"]
                ];
    };

    const callContractFunction = async () => {
        if (!zk) {
            console.log("ZK not ready");
            return;
        }
        try {

            // Generate proof
            const artifacts = zk.compile(programString);
            const decimalStringAddress = BigInt(address).toString();
            const proveKey = base64ToArrayBuffer(proveKeyString);
            let txResponse = null;
            if (purchaseFunction === 'buyMedicineA') {
                const { witness, output } = zk.computeWitness(artifacts, [decimalStringAddress, decimalStringAddress, ['22', '2312', '1234', '4444', '3333'], '1234']);
                const { proof, inputs } = zk.generateProof(
                    artifacts.program,
                    witness,
                    proveKey
                );
                const transformedProof = transformResponseToProofFormat(proof);
                txResponse = await contractInstance.buyMedicineA(transformedProof, {
                    value: ethers.utils.parseEther("0.001"), // The amount of Ether to send with the transaction.
                    gasLimit: ethers.utils.hexlify(1000000), // Setting a gas limit. Adjust the number based on your needs.
                });
            } else {
                const { witness, output } = zk.computeWitness(artifacts, [decimalStringAddress, decimalStringAddress, ['22', '2312', '1234', '4444', '3333'], '5678']);
                const { proof, inputs } = zk.generateProof(
                    artifacts.program,
                    witness,
                    proveKey
                );
                const transformedProof = transformResponseToProofFormat(proof);
                txResponse = await contractInstance.buyMedicineB(transformedProof, {
                    value: ethers.utils.parseEther("0.002"), // The amount of Ether to send with the transaction.
                    gasLimit: ethers.utils.hexlify(1000000), // Setting a gas limit. Adjust the number based on your needs.
                });
            }
            setProcessingTransaction(true);
            const receipt = await txResponse.wait();
            console.log("transaction receipt:", receipt)
            if (receipt && receipt.status != null) {
                if (receipt.status === 0) {
                    setProcessingTransaction(false);
                    setTransactionSuccess(false);
                    console.error("Transaction failed.");
                } else {
                    setTransactionSuccess(true);
                    console.log("Transaction successful.");
                }
            }          
        } catch (error) {
            console.error('Error calling contract function:', error);
            setTransactionSuccess(false);
        }
        finally {
            // Set processingTransaction to false when transaction completes (whether success or failure)
            setProcessingTransaction(false);
          }
    };

    useEffect(() => {
        // Fetch data when component mounts
        const fetchData = async () => {
            // const res = await fetch("https://github.com/hroyo/Zk-encode/tree/proof-generation/public/proving.key");
            // const arrayBuffer = await res.arrayBuffer();
            // const proveKeyString = arrayBufferToBase64(arrayBuffer);

            // const res2 = await fetch("https://github.com/hroyo/Zk-encode/tree/proof-generation/public/pharmacy.zok");
            // const programString = await res2.text();

            // Assuming the proving key file is located at /public/proving.key
            // const proveKeyResponse = await fetch("../../../public/proving.key");
            const proveKeyResponse = await fetch("/proving.key");

            const proveKeyArrayBuffer = await proveKeyResponse.arrayBuffer(); // Fetch array buffer directly
            const proveKeyString = arrayBufferToBase64(proveKeyArrayBuffer);

            // Assuming the program file is located at /public/pharmacy.zok
            // const programResponse = await fetch("../../../public/pharmacy.zok");
            const programResponse = await fetch("/pharmacy.zok");

            const programString = await programResponse.text();

            setProveKeyString(proveKeyString);
            setProgramString(programString);
        };

        fetchData();
        // Initialize contract when component mounts
        initializeContract();

        // Reset transaction success state after 2 seconds
        if (transactionSuccess !== null) {
            const timeout = setTimeout(() => {
                setTransactionSuccess(null);
            }, 2000);
            
            return () => clearTimeout(timeout);
        }
    }, [transactionSuccess]);

    return (
        <div>
            {processingTransaction && (
            // Overlay shown when processingTransaction is true
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    zIndex: '9998', 
                }}
            ></div>
        )}
            {isConnected && !loading && (
                <div>
                    <div>
                        <button onClick={callContractFunction}
                            style={{
                                border: "2px solid #1d47b2", // Set green border
                                borderRadius: "25px", // Optional: Add rounded corners
                                padding: "10px 20px", // Optional: Add padding
                                fontSize: "16px", // Optional: Adjust font size
                                backgroundColor: "#1d47b2", // Optional: Set transparent background
                                color: "white",
                                cursor: "pointer", // Optional: Add pointer cursor on hover
    
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#334499")} // Change background color on hover
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#445faf")} >
                            Zk Buy
                        </button>
                    </div>
                </div>
            )}
    
            {processingTransaction && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#156669',
                    padding: '40px',
                    borderRadius: '20px',
                    zIndex: '9999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#fff',
                }}>
                    <CircularProgress color="inherit" size={60} thickness={4} />
                    <p style={{ marginTop: '20px', color: '#fff' }}>Processing...</p>
                </div>
            )}
            {transactionSuccess !== null && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#156669',
                    padding: '80px',
                    borderRadius: '20px',
                    zIndex: '9999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    color: '#fff',
                }}>
                    {transactionSuccess ? (
                        <CheckCircleIcon style={{ color: 'green', fontSize: 50 }} />
                    ) : (
                        <CancelIcon style={{ color: 'red', fontSize: 50 }} />
                    )}
                    <p style={{ marginTop: '20px', color: '#fff' }}>
                        {transactionSuccess ? 'Transaction Successful' : 'Transaction Failed'}
                    </p>
                </div>
            )}
        </div>
    );
}

export default PurchaseButton;
