const axios = require('axios');
const Coin = require("../models/chainModel");

// Get the list of top 100 cryptocurrency coins, save them in the database, and return the sorted list
exports.getCoins = async (req, res) => {
  try {
    // Make a request to the CoinCap API to get the list of coins
    const response = await axios.get('https://api.coincap.io/v2/assets');

    // Extract the data from the response
    const coins = response.data.data;

    // Save each coin in the database
    for (const coin of coins) {
      // Create a new Coin document using the Coin model
      const newCoin = new Coin({
        symbol: coin.symbol,
        name: coin.name,
        marketCapUsd: coin.marketCapUsd,
        priceUsd: coin.priceUsd
      });

      // Save the coin in the database
      await newCoin.save();
    }

    // Retrieve all coins from the database and sort them based on their growth in the last 24 hours
    const sortedCoins = await Coin.find().sort({ changePercent24Hr: -1 });

    // Return the sorted list of coins in the response
    res.status(200).json(sortedCoins);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
