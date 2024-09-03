const { ethers } = require("ethers");
const providerUrl = "https://zeta-chain-testnet.drpc.org";

async function getBalance(key) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    
        const wallet = new ethers.Wallet(key, provider);
        const address = await wallet.getAddress()
        const balance = await wallet.getBalance();
        return {
            balance:ethers.utils.formatEther(balance),
            address:address
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

async function sendTransaction(privateKey, toAddress, amountInEther) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);
    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
        to: toAddress,
        value: ethers.utils.parseEther(amountInEther),
    };

    console.log(`Sending ${amountInEther} ETH to ${toAddress}`);

    try {
        const transactionResponse = await wallet.sendTransaction(tx);
        console.log("Transaction Hash:", transactionResponse.hash);

        const result = await transactionResponse.wait();
        console.log("Transaction confirmed! " + result);
        return {
            operation:true,
            transactionHash:transactionResponse.hash
        }
    } catch (error) {
        console.error("Error sending transaction:", error);
        return {
            operation:false
        }
    }
}

module.exports = { getBalance,sendTransaction }