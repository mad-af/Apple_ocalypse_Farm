const { ethers } = require("ethers");
const { AptosClient, AptosAccount, FaucetClient, HexString, TokenClient } =  require("aptos")
const providerUrl = "https://zeta-chain-testnet.drpc.org";
const NODE_URL = "https://fullnode.testnet.aptoslabs.com"
const FAUCET_URL = "https://faucet.testnet.aptoslabs.com"

async function getWallet(key) {
    try {
        const privateKey = HexString.ensure(key).toUint8Array();
        const faucet = new FaucetClient(NODE_URL, FAUCET_URL)
        const wallet = new AptosAccount(privateKey)
        
        await faucet.fundAccount(wallet.address(), 9000_000_000_000)

        return {
            address: wallet.address().toString()
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}

async function sendTransaction(privateKey, module, amount) {

    try {
        const privateKey = HexString.ensure(key).toUint8Array();
        const wallet = new AptosAccount(privateKey)

        const now = new Date()
        const end = addMonths(now, 12);
        
        const create_candy_machine = {
        function: `${module}::launchpad::create_collection`,
        type_arguments: [],
        arguments: [
            "NFT APPLE BROH",
            "just a NFT broh",
            "https://gateway.irys.xyz/FUNjcSnXDZXRNpzfsouds2Pdrshvvq-62VOnkbtqAE4/collection.json",
            1000,
            1,
            amount,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            dateToSeconds(now),
            dateToSeconds(end),
            2,
            amount,
        ]
        }
    
        const tx = await SubmitTransaction(wallet, create_candy_machine)
        return {
            operation: true,
            transactionHash: `https://explorer.aptoslabs.com/txn/${tx}?network=testnet`
        }
    } catch (error) {
        console.error("Error sending transaction:", error);
        return {
            operation:false
        }
    }
}


  async function SubmitTransaction(wallet, config) {
    const client = new AptosClient(NODE_URL)
  
    let txnRequest = await client.generateTransaction(wallet.address(), config)
    let bscTxn = AptosClient.generateBCSTransaction(wallet, txnRequest)
    let transactionRes = await client.submitSignedBCSTransaction(bscTxn);
  
    return transactionRes.hash
  }
  
  

module.exports = { getWallet, sendTransaction }