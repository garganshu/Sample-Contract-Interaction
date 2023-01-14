require('dotenv').config();
const ethers = require('ethers');

const provider = new ethers.providers.AlchemyProvider(
    network = "goerli",
    apiKey = process.env.TEST_ALCHEMY_KEY
);

const contractAbi = [{ "inputs": [], "name": "count", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "dec", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "get", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "inc", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];

const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider);

async function main() {

    console.log(wallet.address); 

    const countContract = new ethers.Contract(
        '0x5F91eCd82b662D645b15Fd7D2e20E5e5701CCB7A',
        contractAbi,
        wallet
    ); 

    const counterValue = await countContract.get(); 
    console.log("CURRENTCOUNT: "+counterValue.toString()); 

    const tx = await countContract.inc(); 

    console.log("txHash: "+tx.hash);
    
    
}

main();
