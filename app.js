document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).classList.add("active");
    });
});

const CURRENCY_API_URL = "https://open.er-api.com/v6/latest/USD";
const METALS_API_KEY = "YOUR_ACCESS_KEY";
const getMetalsApiUrl = (key) => `https://metals-api.com/api/latest?acess_key=${key}&base=USD&symbols=XAU ,XAG`

const prices = {
    USD: 1,
    EUR: null,
    XAU: null,
    XAG: null
};
const UNITS = [
    { code: "USD", name: "US Dollar", unit: "USD", symbol: "$" },
    { code: "EUR", name: "EURO", unit: "EUR", symbol: "£" },
    { code: "XAU", name: "Gold", unit: "gram", symbol: "gr" },
    { code: "XAG", name: "Silver", unit: "gram", symbol: "gr" }
];
const amountEl = document.getElementById("amount");
const fromEl = document.getElementById("from");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results")
const fetchBtn = document.getElementById("fetchBtn");

function readInput(el) {
    const raw = String(el.value).trim().replace(",", ".");
    if (raw === "") return 0;
    const num = parseFloat(raw);
    return Number.isFinite(num) && num >= 0 ? num : 0;
}
function formatNumber(n) {
    return n.toLocaleString("en-US", { minumumFractionDigits: 2, maximumFractionDigits: 2 });
}
function renderConverter() {
    const amount = readInput(amountEl) || 1;
    const from = fromEl.value;
    const fromPrice = prices[from];

    resultsEl.innerHTML = "";

    UNITS.forEach(function (u) {
        const li = document.createElement("li");
        li.className = "result" + (u.code === from ? " source " : "");

        const left = document.createElement("span");
        left.className = "name";
        left.textContent = u.name;
        const unitSpan = document.createElement("span");
        unitSpan.className = "unit";
        unitSpan.textContent = u.unit;
        left.appendChild(unitSpan);

        const right = document.createElement("span");
        right.className = "value";

        const toPrice = prices[u.code];
        const ready = Number.isFinite(fromPrice) && Number.isFinite(toPrice) && toPrice > 0;
    
        if (u.code === from) {
            right.textContent = formatNumber(amount) + " " + u.symbol;
        }
        else if (ready) {
            const result = (amount * fromPrice) / toPrice;
            right.textContent = Number.isFinite(result) ? formatNumber(result) + " " + u.symbol : "-";
        }
        else {
            right.textContent = "No price";
            right.classList.add("empty");
        }

        li.appendChild(left);
        li.appendChild(right);
        resultsEl.appendChild(li);
    });
}

function setStatus(text,isError) {
    statusEl.textContent = text;
    statusEl.className = isError ? "error" : "";
}

async function fetchPrices() {
    fetchBtn.disabled = true;
    setStatus("Fetching current market rates...", false);

    let currencySuccess = false;
    let metalsSuccess = false;

    try {
        const resCurrency = await fetch(CURRENCY_API_URL);
        if (!resCurrency.ok) throw new Error();
        const dataCurrency = await resCurrency.json();

        if (dataCurrency.rates && dataCurrency.rates.EUR) {
            prices.EUR = 1 / dataCurrency.rates.EUR;
            currencySuccess = true;
        }
    } catch (e)
    {
        prices.EUR = 1.08
    }

    if (METALS_API_KEY && METALS_API_KEY !== "YOUR_ACCESS_KEY") {
        try {
            const resMetals = await fetch(getMetalsApiUrl(METALS_API_KEY));
            if (!resMetals.ok) throw new Error();
            const dataMetals = await resMetals.json();

            if (dataMetals.success && dataMetals.rates) {
                const troyOunceGram = 31.1035;
                if (dataMetals.rates.XAU) prices.XAU = (1 / dataMetals.rates.XAU) / troyOunceGram;
                if (dataMetals.rates.XAG) prices.XAG = (1 / dataMetals.rates.XAG) / troyOunceGram;
                metalsSuccess = true;
            }
        } catch (e) {
            prices.XAU = 85;
            prices.XAG = 1;
        }
    } else {
        prices.XAU = 85;
        prices.XAG = 1;
    }

    setStatus(currencySuccess ? "Live market values updated succesfully." : "Rates synchronized using fallbacks");
    renderConverter();
    fetchBtn.disabled = false;
}

const initialDepositEl = document.getElementById("initialDeposit");
const monthlyContributionEl = document.getElementById("monthlyContribution");
const interestRateEl = document.getElementById("interestRate");
const yearsEl = document.getElementById("years");

const totalContributionsEl = document.getElementById("totalContributions");
const totalInterestEl = document.getElementById("totalInterest");
const futureValueEl = document.getElementById("futureValue");

function calculateCompundInterest() {
    const p = readInput(initialDepositEl);
    const pmt = readInput(monthlyContributionEl);
    const r = readInput(interestRateEl) / 100;
    const t = readInput(yearsEl);
    const n = 12;

    const totalMonths = t * n;
    let futureValue = p * Math.pow(1 + r / n, totalMonths);

   for (let i = 1; i < totalMonths; i++) {
       futureValue += pmt * Math.pow(1 + r / n, totalMonths - i);
    }
    
    const totalContributions = p + (pmt * totalMonths);
    const totalInterest = futureValue - totalContributions;

    totalContributionsEl.textContent = "$" + formatNumber(totalContributions);
    totalInterestEl = "$" + formatNumber(totalInterest);
    futureValueEl = "$" + formatNumber(futureValue);
}

fetchBtn.addEventListener("click", fetchPrices);
amountEl.addEventListener("input", renderConverter);
fromEl.addEventListener("change", renderConverter);

[initialDepositEl, monthlyContributionEl, interestRateEl, yearsEl].forEach(el => {
    el.addEventListener("input", calculateCompundInterest); 
});

fetchPrices();
calculateCompundInterest();