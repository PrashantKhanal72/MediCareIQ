require("dotenv").config(); // Load environment variables from the .env file.
const axios = require("axios"); // Import Axios to make HTTP requests.

// Define the data object that will be sent in the POST request body.
const data = {
  return_url: "https://dev.hiresmart.ai/", // Define the data object that will be sent in the POST request body.
  website_url: "https://dev.hiresmart.ai/", // The URL of the website initiating the payment.
  amount: "500000", // The amount for the transaction.
  purchase_order_id: "afadsfasdf",  // A unique identifier for the purchase order.
  purchase_order_name: "asdfasdfasdf", // A name or description for the purchase order.
};

// Execute the POST request using Axios.
axios
  .post("https://a.khalti.com/api/v2/epayment/initiate/", data, {
    headers: {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Authorization header with an API key.
      "Content-Type": "application/json", // Set the content type of the request to JSON.
    },
  })
  .then((response) => {
    console.log(response.data); // Log the response data from the API on success.
  })
  .catch((error) => {
    console.error(error); // Log any errors that occur during the HTTP request
  });
