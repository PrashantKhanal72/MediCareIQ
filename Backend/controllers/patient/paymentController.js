const pool = require("../../database/db");
const axios = require("axios"); // For making HTTP requests to external services.

// Function to handle the payment process for a call.
const payForCall = async (req, res) => {
  const profile_id = req.user.profile_id; // Get the patient's profile ID from the authenticated user.
  const { amount } = req.body;  // Get the payment amount from the request body.

  try {
 
    const data = { // Prepare the payment data for the request.
      return_url: "https://medi-care-iq.vercel.app/success", // URL to which the payment gateway will redirect after payment.
      website_url: "https://medi-care-iq.vercel.app/", // URL of the application.

      amount: "1000", // Fixed amount for demonstration purposes
      purchase_order_id: "afadsfasdf", // Sample order ID.
      purchase_order_name: "asdfasdfasdf", // Sample order name.
    };

    // Make a POST request to the payment gateway API to initiate the payment process.
    const response = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      data,
      {
        headers: { // Set the necessary headers for the request.
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
          
        },
      }
    );
    

   // Log the response data from the payment gateway.

    console.log(response.data);

    // Record the payment in the database with the returned token from the payment gateway.
    const [result] = await pool.execute(
      "INSERT INTO payments ( patient_id, token, amount) VALUES (?, ?, ?)",
      [profile_id, response.data.pidx, amount]
    );

    // Respond with success and the payment data.
    res.status(200).json({ message: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to retrieve the payment history for the authenticated patient.
const getPaymentList = async (req, res) => {
  try { 
    const profile_id = req.user.profile_id; // Get the patient's profile ID from the authenticated user.

     // Query the database to fetch all payment records for the patient.
    const [rows] = await pool.execute(
      "SELECT * FROM payments WHERE patient_id = ?",
      [profile_id]
    );

    // Respond with the fetched payment records.
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to verify a payment token.
const verifyToken = async (req, res) => {
  try {
  
    const { token } = req.body; // Get the payment token from the request body.

    // Query the database to find a payment record matching the token.
    const [rows] = await pool.execute(
      "SELECT * FROM payments WHERE token = ?",
      [token]
    );

    // Respond with the payment record if found.
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No payments found for this token" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { payForCall, getPaymentList, verifyToken };
