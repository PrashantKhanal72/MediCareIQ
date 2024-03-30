const pool = require("../../database/db");

const getPaymentList = async (req, res) => {
  try {
    const profile_id = req.user.profile_id;
  
    const [rows] = await pool.execute(
      "SELECT * FROM payments WHERE doctor_id = ?",
      [profile_id]
    );
  
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "No payments found for this patient" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPaymentList };