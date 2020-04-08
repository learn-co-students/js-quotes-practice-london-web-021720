// API stuff
const BASE_URL = "http://localhost:3000"
const QUOTES_URL = `${BASE_URL}/quotes`
const QUOTES_LIKES_URL = `${BASE_URL}/quotes?_embed=likes`
const LIKES_URL = `${BASE_URL}/likes`


document.addEventListener("DOMContentLoaded", () => {

    const quoteList = document.getElementById("quote-list")
    const quoteForm = document.getElementById("new-quote-form")
    

    fetch(QUOTES_LIKES_URL).then(res => res.json()).then(quotes => renderQuotes(quotes))

    const renderQuotes = (quotes) => {
        quotes.forEach(quote => renderQuote(quote))
    }

    const renderQuote = (quote) => {

        const li = document.createElement("li")
        li.classList.add("quote-card")
        li.setAttribute("data-id", `${quote.id}`)
        const blockquote = document.createElement("blockquote")
        blockquote.classList.add("blockquote")
        const p = document.createElement("p")
        p.classList.add("mb-0")
        p.innerText = quote.quote
        const footer = document.createElement("footer")
        footer.classList.add("blockquote-footer")
        footer.innerText = quote.author
        const br = document.createElement("br")
        const success = document.createElement("button")
        success.classList.add("btn-success")
        success.innerText = "Likes: "
        const span = document.createElement("span")
        span.innerText = `${quote.likes.length}`
        success.append(span)
        const danger = document.createElement("button")
        danger.classList.add("btn-danger")
        danger.innerText = "Delete"

        success.addEventListener("click", () => likeQuote(quote))
        danger.addEventListener("click", () => deleteQuote(quote))

        blockquote.append(p, footer, br, success, danger)
        li.append(blockquote)
        quoteList.append(li)
    }

    const likeQuote = (quote) => {
        
        const requestObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                quoteId: quote.id
            })
        }

        return fetch(LIKES_URL, requestObject)
        .then(res => res.json())
        .then(updateQuoteLikes(quote))
    }

    const updateQuoteLikes = (quote) => {
        const li = document.querySelector(`[data-id="${quote.id}"]`);
        const span = li.querySelector("span")
        const currentLikes = parseInt(span.innerText) + 1
        span.innerText = currentLikes
    }

    const deleteQuote = (quote) => {
        const requestObject = {
            method: "DELETE"
        }
        const li = document.querySelector(`[data-id="${quote.id}"]`);


        return fetch(`${QUOTES_URL}/${quote.id}`, requestObject)
        .then(li.remove())
    }


    quoteForm.addEventListener("submit", (e) => {
        e.preventDefault()
        
        const requestObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                quote: e.target.quote.value,
                author: e.target.author.value,
                likes: []
            })
        }

        quoteForm.reset()

        return fetch(QUOTES_URL, requestObject)
        .then(res => res.json())
        .then(quote => renderQuote(quote))

    })
})