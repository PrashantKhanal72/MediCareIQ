const pool = require("../../database/db");

// Function to fetch data of all labs and the tests they offer.
const fetchLabData = async (req, res) => {
  try {
     // Execute a SQL query to get lab and test details, joining the 'lab' and 'test' tables.
    const [labs] = await pool.execute(
      `SELECT 
        L.LabID, L.Name, L.Location, L.PhoneNumber, L.OpeningHours,
        T.TestID, T.TestName, T.TestPrice, T.Description
       FROM lab L
       JOIN test T ON L.LabID = T.LabID
       ORDER BY L.LabID, T.TestID`
    );
    // Object to hold the structured lab and test data.
    const labsWithTests = {};
    
    // Iterate through each row of the result set.
    labs.forEach(row => {
       // If the current lab is not yet added to the 'labsWithTests' object, add it.
      if (!labsWithTests[row.LabID]) {
        labsWithTests[row.LabID] = {
          id: row.LabID,
          name: row.Name,
          location: row.Location,
          phoneNumber: row.PhoneNumber,
          openingHours: row.OpeningHours,
          availableTests: [] // Initialize an array to store tests offered by the lab.
        };
      }

      // Add the current test to the lab's list of available tests.
      labsWithTests[row.LabID].availableTests.push({
        testName: row.TestName,
        testPrice: row.TestPrice,
        description: row.Description
      });
    });

    // Respond with the structured data as JSON.
    res.status(200).json(labsWithTests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to fetch detailed data about all tests.
const fetchTestData = async (req, res) => {
  try {
    // Execute a SQL query to get detailed information about each test.
    const [tests] = await pool.execute(
      `
      SELECT 
          t.TestID,
          t.Description,
          t.ResultTiming,
          tp.HowIsTestDone,
          tp.Preparation,
          ri.TestCondition,
          ri.FastingBloodSugar,
          ri.PostprandialBloodSugar,
          pac.Prevention,
          pac.Cure
      FROM Tests t
      LEFT JOIN TestProcedure tp ON t.TestID = tp.TestID
      LEFT JOIN ResultsInterpretation ri ON t.TestID = ri.TestID
      LEFT JOIN PreventionAndCure pac ON t.TestID = pac.TestID
  `
    );

    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { fetchLabData , fetchTestData };
