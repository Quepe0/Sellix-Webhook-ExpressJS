const express = require('express');
const bodyParser = require('body-parser');
const sellix = require('@sellix/node-sdk')('YOUR_SELLIX_SECRET_API_KEY', 'YOUR_SELLIX_USERNAME');

const app = express();
const port = 4242;

app.use(bodyParser.json({ limit: '100mb' }));

app.get('/create-invoice', async (req, res) => {
    try {
        const paymentPayload = {
            title: 'Example Invoice',
            value: 1,
            currency: 'USD',
            quantity: 1,
            email: 'username@example.com',
            white_label: false,
            return_url: 'https://example.com/success'
        };

        const payment = await sellix.payments.create(paymentPayload);
        const paymentID = payment.url.split('/')[4]; // Retrieving the payment invoice ID [Example: You add it to the database as a pending payment, and then the webhook checks who that payment belongs to based on the ID].
        const paymentURL = payment.url;

        res.status(200).json({
            success: true,
            method: req.method,
            status: 200,
            payment: {
                ID: paymentID,
                URL: paymentURL
            }
        });
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({
            success: false,
            error: 'An error occurred while creating the invoice.'
        });
    }
});

app.post('/sellix-webhook', (req, res) => {
    const { event, data } = req.body;

    if (event === 'order:paid') {
        console.log('| ORDER SUCCESSFULLY PAID');
        console.log('  - Order ID:', data.id);
        console.log('  - Unique identifier:', data.uniqid);
        console.log('  - Product type:', data.type);
        console.log('  - Total amount:', data.total);
        console.log('  - Currency:', data.currency);
        console.log('  - Customer email:', data.customer_email);
        console.log('  - Product ID:', data.product_id);
        console.log('  - Product title:', data.product_title);
        console.log('  - Product type:', data.product_type);
        res.status(200).json('OK');
    } else {
        res.status(200).send('Ignored event');
    }
});

app.listen(port, () => {
    console.log(`[INFO] Server is listening on port ${port}`);
});