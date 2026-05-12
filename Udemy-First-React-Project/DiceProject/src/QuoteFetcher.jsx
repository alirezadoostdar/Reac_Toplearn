import { useEffect, useState } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random"

function QuoteFetcher() {
    const [quote, setQuote] = useState({ text: "", author: "" })
    const [isLoad, setIsLoad] = useState(true);
    useEffect(() => {
        fetchQuote();
    }, [])

    async function fetchQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        const jsonResponse = await response.json();
        const randomQuote = jsonResponse.quote;
        setQuote(randomQuote)
        setIsLoad(false)
    }
    return (
        <div>
            <p style={{ opacity: isLoad ? 1 : 0 }}>is loading...</p>
            <button onClick={fetchQuote}>get quote</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}

export default QuoteFetcher