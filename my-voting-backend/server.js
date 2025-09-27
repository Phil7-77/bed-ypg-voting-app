// server.js

require('dotenv').config(); 
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const HUBTEL_API_URL = `https://rmp.hubtel.com/merchantaccount/merchants/${process.env.HUBTEL_MERCHANT_ACCOUNT}/receive/mobilemoney`;
const HUBTEL_CLIENT_ID = process.env.HUBTEL_CLIENT_ID;
const HUBTEL_CLIENT_SECRET = process.env.HUBTEL_CLIENT_SECRET;

function formatPhoneNumber(phone) {
  if (phone.startsWith('0') && phone.length === 10) {
    return '233' + phone.substring(1);
  }
  return phone;
}

app.post('/api/initiate-payment', async (req, res) => {
   try {
    const { votes, momoNumber, channel, voterName, voterId } = req.body;
    const totalAmount = votes.reduce((sum, vote) => sum + vote.amount, 0);
    const encodedCredentials = Buffer.from(`${HUBTEL_CLIENT_ID}:${HUBTEL_CLIENT_SECRET}`).toString('base64');
    const requestBody = {
        CustomerName: voterName,
        CustomerMsisdn: formatPhoneNumber(momoNumber),
        CustomerEmail: "",
        Channel: channel,
        Amount: totalAmount,
        PrimaryCallbackUrl: "", 
        Description: `Payment for BED YPG E-Voting by ${voterName}`,
        ClientReference: `VOTE-${voterId}-${Date.now()}`
    };
    const options = { headers: { 'Authorization': `Basic ${encodedCredentials}`, 'Content-Type': 'application/json' } };
    const hubtelResponse = await axios.post(HUBTEL_API_URL, requestBody, options);
    if (hubtelResponse.data.ResponseCode === "0000" || hubtelResponse.data.ResponseCode === "0001") {
        res.json({ status: 'success', message: 'Payment initiated! Please check your phone to approve.' });
    } else {
        res.status(400).json({ status: 'error', message: hubtelResponse.data.Message || 'Payment initiation failed.' });
    }
  } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ status: 'error', message: 'Server error during payment processing.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));