const axios = require('axios');

module.exports = {
  config: {
    name: "hornypicuplines",
    version: "1.0",
    author: "zeroday",
    countDown: 10,
    role: 0,
    shortDescription: "Sends a random horny pickupline",
    longDescription: "",
    category: "𝗟𝗢𝗩𝗘",
    guide: {
      en: "{pn}",
    }
  }
};

// Function to get a random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Array of random messages
const messages = [
  "Hello there!",
  "How's it going?",
  "What's up?",
  "Just checking in.",
  "Hope you're doing well.",
  "Any exciting plans for today?",
];

// Function to send a random message
const sendRandomMessage = async () => {
  // Get a random message
  const randomMessage = messages[getRandomNumber(0, messages.length - 1)];

  try {
    // Send the random message to the API
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      userId: 1,
      title: 'Random Message',
      body: randomMessage
    });

    console.log('Message sent successfully:');
    console.log(response.data);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
};

// Send a random message
sendRandomMessage();
