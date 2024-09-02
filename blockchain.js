const { ethers } = require("ethers");
const providerUrl = "https://zeta-chain-testnet.drpc.org";

async function getBalance(key) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    const wallet = new ethers.Wallet(key, provider);
    const address = await wallet.getAddress()
    const balance = await wallet.getBalance();
    console.log(address);
    console.log(ethers.utils.formatEther(balance))
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

        await transactionResponse.wait();
        console.log("Transaction confirmed!");
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}

//sendTransaction("PRIVATE_KEY","RECEIVER_ADDRESS","AMOUNT")
//getBalance("PRIVATE_KEY");