function App() {
    const [data, setData] = React.useState([])
    const [quote, setQuote] = React.useState({})

    function getRandomQuote() {
        const colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#FB6964",
            "#342224",
            "#472E32",
            "#BDBB99",
            "#77B1A9",
            "#73A857",
        ]
        const currentColor = $("html").css("--mainColor")
        let color
        do {
            color = colors[Math.floor(Math.random() * colors.length)]
        } while (currentColor === color)
        $("html").attr("style",`--mainColor: ${color}`)

        const randQuoteIndex = Math.floor(Math.random() * data.length)
        setQuote(data[randQuoteIndex])
    }

    React.useEffect(() => {
        fetch("https://type.fit/api/quotes")
            .then(res => res.json())
            .then(resData => setData(resData))
            .catch(() => console.log("API error."))
    }, [])

    React.useEffect(() => {
        if (data.length > 0) getRandomQuote()
    }, [data])
 
    return (
        <div id="wrapper">
            <div id="quote-box">
                {quote.text && <div id="text">
                    <span>
                        <i className="fa-solid fa-quote-left"></i>
                        {quote.text}
                        <i className="fa-solid fa-quote-right"></i>
                    </span>
                </div>}
                {quote.author && <div id="author">- {quote.author}</div>}
                <div className="buttons">
                    <div className="social">
                        <a 
                            href={
                                `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=
                                ${encodeURIComponent('"' + quote.text + '" ' + quote.author)}`
                            }
                            target="_blank"
                            className="btn btn-default" 
                            id="tweet-quote"
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a 
                        href={
                            "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                            encodeURIComponent(quote.author) + "&content=" +
                            encodeURIComponent(quote.text) +
                            "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                        }
                        target="_blank"
                        className="btn btn-default" 
                        id="tumblr-quote"
                        >
                            <i className="fa fa-tumblr"></i>
                        </a>
                    </div>
                    <button 
                        className="btn btn-default" 
                        id="new-quote" 
                        onClick={getRandomQuote}
                    >New quote
                    </button>
                </div>
            </div>
            <div className="footer">
                by <a href="https://github.com/nickpartalis" target="_blank">nickpartalis</a>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)
