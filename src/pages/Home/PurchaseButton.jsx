import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useZokrates } from "../../contexts/ZokratesContext";
import { arrayBufferToBase64, base64ToArrayBuffer } from "../../utils/converter";



// Import ethers.js
import { ethers } from 'ethers';

// Import your contract ABI (replace YourContractABI with the actual ABI)
import YourContractABI from '../../PharmacyAbi.json';

export function PurchaseButton({ purchaseFunction }) {
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
            const contract = new ethers.Contract('0x6a651566a60f08e395068e0c20b29d0e95a5f875', YourContractABI, provider.getSigner());
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

            console.log("HELLO: ", address)
            console.log("PROGRAM STRING")
            console.log(programString)
            // Generate proof
            const artifacts = zk.compile(programString);
            console.log("ARTIFACTS")
            console.log(artifacts)
            const decimalStringAddress = BigInt(address).toString();
            const proveKey = base64ToArrayBuffer(proveKeyString);
            
            if (purchaseFunction === 'buyMedicineA') {
                const { witness, output } = zk.computeWitness(artifacts, [decimalStringAddress, decimalStringAddress, ['22', '2312', '1234', '4444', '3333'], '1234']);
                const { proof, inputs } = zk.generateProof(
                    artifacts.program,
                    witness,
                    proveKey
                );
                const transformedProof = transformResponseToProofFormat(proof);
                await contractInstance.buyMedicineA(transformedProof, {
                    value: ethers.utils.parseEther("0.001"), // The amount of Ether to send with the transaction.
                    gasLimit: ethers.utils.hexlify(1000000), // Setting a gas limit. Adjust the number based on your needs.
                });
            } else {
                console.log("CMP")
                const { witness, output } = zk.computeWitness(artifacts, [decimalStringAddress, decimalStringAddress, ['22', '2312', '1234', '4444', '3333'], '5678']);
                console.log("CMP2")
                const { proof, inputs } = zk.generateProof(
                    artifacts.program,
                    witness,
                    proveKey
                );
                const transformedProof = transformResponseToProofFormat(proof);
                await contractInstance.buyMedicineB(transformedProof, {
                    value: ethers.utils.parseEther("0.002"), // The amount of Ether to send with the transaction.
                    gasLimit: ethers.utils.hexlify(1000000), // Setting a gas limit. Adjust the number based on your needs.
                });
            }            
        } catch (error) {
            console.error('Error calling contract function:', error);
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
    }, []);

    return (
        <div>
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
            )
            }

            {loading && <p>Loading...</p>}
        </div >
    );
}

export default PurchaseButton;
