# Cryptocurrency API

This repository contains an API implementation that retrieves the list of the top 100 cryptocurrency coins, saves them in a database, and provides the sorted list based on their growth in the last 24 hours.

## Getting Started

To use the API, follow these steps:

1. Clone the repository: `git clone [repository URL]`
2. Install the required dependencies by running `npm install`
3. Obtain an API key by visiting the CoinCap documentation: [CoinCap API Documentation](https://docs.coincap.io/)
4. Set the API key in the API's header as follows:
   - Create a header named `Authorization`.
   - Set the value of the header to `Bearer XXXX`, where `XXXX` is your API key.

## API Endpoints

### Get Top 100 Cryptocurrency Coins

- Endpoint: `/coins`
- Method: `GET`
- Description: Retrieves the list of the top 100 cryptocurrency coins and saves them in the database.
- Response:
  - Status: 200 OK
  - Body: An array of objects representing the coins, sorted by their growth in the last 24 hours.

## Database Schema

The API stores the cryptocurrency coins in a database with the following schema:

```javascript
{
  symbol: { type: String, unique: true },
  name: { type: String, unique: true },
  marketCapUsd: { type: String },
  priceUsd: { type: String }
}
```

## Notes

- When you access the API for the first time, it will create 100 documents corresponding to the 100 coins in the database.
- On subsequent requests, the API will fail to save new coins if the symbol and name are already present in the database.
- To overcome this during development, you can choose one of the following options:
  - Delete the existing data from the database before each API request.
  - Temporarily remove the `unique: true` constraint from the schema.
  - Use `findOneAndUpdate` with `upsert: true` when inserting documents, which will update existing documents or create new ones if they don't exist.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
