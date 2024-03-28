// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVerifier {
    struct G1Point {
        uint X;
        uint Y;
    }
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    struct Proof {
        G1Point a;
        G2Point b;
        G1Point c;
    }
    function verifyTx(Proof memory proof, uint[2] memory input) external view returns (bool r);
}

contract MedicinePurchase {
    IVerifier public verifier;
    address public owner;

    // Event declarations
    event BuyMedicineA(address indexed buyer);
    event BuyMedicineB(address indexed buyer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor(address verifierAddress) {
        verifier = IVerifier(verifierAddress);
        owner = msg.sender; // Set the deployer as the owner
    }

    function buyMedicineA(IVerifier.Proof memory proof) public payable {
        require(msg.value == 1e15, "Must send exactly 0.001 ETH");
        uint[2] memory input = [uint(uint160(msg.sender)), 1234];
        
        require(verifier.verifyTx(proof, input), "Verification failed for Medicine A");
        
        // Emitting the event after successful verification
        emit BuyMedicineA(msg.sender);
    }

    function buyMedicineB(IVerifier.Proof memory proof) public payable {
        require(msg.value == 2e15, "Must send exactly 0.002 ETH");
        uint[2] memory input = [uint(uint160(msg.sender)), 5678];
        
        require(verifier.verifyTx(proof, input), "Verification failed for Medicine B");
        
        // Emitting the event after successful verification
        emit BuyMedicineB(msg.sender);
    }

    function withdraw() public onlyOwner {
        uint amount = address(this).balance;
        (bool sent, ) = owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    receive() external payable {}
    fallback() external payable {}
}
