const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random"

function QuoteFetcher() {
    async function fetchQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        console.log(randomQuote);
    }
    return (
        <div>
            <button onClick={fetchQuote}>get quote</button>
        </div>
    )
}

export default QuoteFetcher