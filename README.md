# Live Currency Fetching & Compound Interest Calculator 🚀

A powerful, real-time financial tool that combines dynamic currency conversion with advanced compound interest calculations. This application fetches up-to-date currency exchange rates and allows users to project investment growth across different global currencies instantly.

## ✨ Features

- **Live Currency Rates:** Fetches real-time exchange rates via a reliable financial API.
- **Advanced Compound Interest Engine:** Calculates growth based on principal, regular contributions, frequency, and custom time horizons.
- **Multi-Currency Support:** Seamlessly switch between global currencies (USD, EUR, GBP, etc.) with automated rate adjustments

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+) 
- **API Integration:** Fetch API / Axios (connected to ExchangeRate-API / Open Exchange Rates)

## 🚀 Getting Started

### Prerequisites

To run this project locally, you need a web browser or a local development environment like Node.js (if using a framework).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com
   ```

2. Navigate to the project directory:
   ```bash
   cd live-currency-compound-calc
   ```

3. (Optional) Install dependencies if using Node.js:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your API key:
   ```env
   VITE_CURRENCY_API_KEY=your_api_key_here
   ```

5. Run the application:
   - For vanilla JS: Open `index.html` in your browser or use Live Server.
   - For React/Node: `npm run dev` or `npm start`

## 🧮 How It Works

1. **Select Currency:** Choose your base currency for the investment.
2. **Input Parameters:** 
   - **Initial Principal:** Your starting investment amount.
   - **Monthly/Yearly Contribution:** Additional funds added regularly.
   - **Estimated Interest Rate (APR):** Expected annual return percentage.
   - **Time Horizon:** Duration of the investment in years.
   - **Compounding Frequency:** Monthly, Quarterly, or Annually.
3. **Live Conversion:** Toggle between currencies at any time; the calculator uses live rates to convert the entire growth projection instantly.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
