// const express = require('express');
// const bodyParser = require('body-parser');
const Client = require('bitcoin-core');

// const app = express();
// app.use(bodyParser.json());

// Load environment variables for security
// require('dotenv').config();


// Central wallet address for pooling
// const centralWallet = process.env.CENTRAL_WALLET;

// Endpoint to accept user deposits
// app.post('/mix', async (req, res) => {

const Mix = async (req, res) => {
    try {
        const { userAddress } = req.body;

        if (!userAddress) {
            return res.status(400).json({ error: 'User address is required.' });
        }
        const client = new Client({
            network: 'testnet', // Use 'mainnet' for live transactions
            username: process.env.BITCOIN_RPC_USER,
            password: process.env.BITCOIN_RPC_PASS,
            host: 'localhost',
            port: 18332, // Default for testnet
        });

        //   try {
        // 1. Generate a new deposit address for the user
        const depositAddress = await client.getNewAddress();

        // 2. (Simulated) Add coins to pool from central wallet
        await client.sendToAddress(depositAddress, 0.001); // Simulated user deposit

        // 3. Send mixed coins to the user from the pool
        const transactionId = await client.sendToAddress(userAddress, 0.001); // Return same amount for simplicity

        res.json({
            message: 'Coins mixed successfully!',
            depositAddress,
            transactionId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error processing transaction.' });
    }
}
// });

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = {
    Mix

}