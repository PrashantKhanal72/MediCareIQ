// Function to generate a random string of a given length.
function generateRandomString(length) {
  // Define the characters that can be used in the random string.
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = ""; // Initialize the result string.
  // Cache the length of the characters set for efficiency.
  const charactersLength = characters.length;

   // Generate a string of the specified length by picking random characters from 'characters'.
  for (let i = 0; i < length; i++) {
    // Append a random character to 'result' string in each iteration of the loop
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Return the resulting random string.
  return result;
}

module.exports = { generateRandomString };
