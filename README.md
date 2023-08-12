# Sellix Invoice System with Webhooks Integration

![Sellix Logo](https://asset.brandfetch.io/idMweYxyV_/idKFLZzdqB.png)

This repository contains a simple Node.js application that demonstrates how to create invoices using the Sellix API and handle webhook events for order payment notifications. It's designed to provide a starting point for integrating the Sellix platform into your projects.

## Features

- **Create Invoice**: Use the `/create-invoice` endpoint to create an invoice using the Sellix API. You can customize the invoice details such as title, value, currency, quantity, and more.

- **Webhook Integration**: Handle webhook events from Sellix, specifically the `order:paid` event. When an order is successfully paid, the application logs relevant information about the order.

## Getting Started

1. Clone this repository to your local machine using:
git clone https://github.com/Quepe0/Sellix-Webhook-ExpressJS.git

2. Install the required dependencies using:
npm install

3. Replace `'YOUR_SELLIX_SECRET_API_KEY'` and `'YOUR_SELLIX_USERNAME'` in `index.js` with your actual Sellix API credentials.

4. Run the application:

npm start

The server will start and listen on port 4242.

## Usage

### Creating an Invoice

Send a GET request to `/create-invoice` to create a new invoice. The response will include the invoice ID and URL:

GET http://localhost:4242/create-invoice

### Handling Webhooks

Sellix will send webhook events to the `/sellix-webhook` endpoint. The application handles the `order:paid` event and logs relevant information about the paid order.

## Contributions

Contributions to this project are welcome! If you encounter any issues or would like to add improvements, please feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

