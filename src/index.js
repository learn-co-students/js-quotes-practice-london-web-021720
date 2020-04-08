const quote_URL = "http://localhost:3000/quotes?_embed=likes"
const quote_id_URL = "http://localhost:3000/quotes/"
const like_URL = "http://localhost:3000/likes"

// New Quote event

const quoteForm = document.querySelector("form")

const postQuote = (quote) => {
    fetch(quote_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quote)
    }).then(response => response.json())
}

const newQuoteSubmit = (form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const ul = document.querySelector("#quote-list")

        const newQuote = {
            quote: quoteForm.quote.value,
            author: quoteForm.author.value,
            likes: []
        }

        postQuote(newQuote).then(quote => renderQuoteCard(ul, quote))
    })
}

// Delete event

const deleteQuoteEvent = (quote) => {
    fetch(quote_id_URL + quote.id, {
        method: "DELETE"
    })
}

// Like event

const likeQuoteEvent = (quote) => {
    fetch(like_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quoteId: quote.id
        })
    }).then(response => response.json())
    .then(stuff => console.log(stuff))
}

// Render Quotes

const getQuotes = () => {
    fetch(quote_URL)
    .then(response => response.json())
    .then(quotes => renderQuotes(quotes))
}

const renderQuotes = (quotes) => {
    // For each quote adds an li, therefore, we should make an ul
    const ul = document.querySelector("#quote-list")

    quotes.forEach(quote => {
        renderQuoteCard(ul, quote)
    });
}

const renderQuoteCard = (ul, quote) => {
    const li = document.createElement("li")
    li.className = "quote-card"

    const blockquote = document.createElement("blockquote")
    blockquote.className = "blockquote"

    const p = document.createElement("p")
    p.className = "mb-0"
    p.innerText = quote.quote

    const footer = document.createElement("footer")
    footer.className = "blockquote-footer"
    footer.innerText = quote.author

    const br = document.createElement("br")

    const likeBtn = document.createElement("button")
    likeBtn.className = "btn-success"
    likeBtn.innerText = "Likes: "
    const likeSpan = document.createElement("span")
    let likesTally = quote.likes.length
    likeSpan.innerText = likesTally
    likeBtn.append(likeSpan)
    likeBtn.addEventListener("click", () => {
        likeQuoteEvent(quote)
        likeSpan.innerText = likesTally + 1
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.className = "btn-danger"
    deleteBtn.innerText = "Delete"
    deleteBtn.addEventListener("click", () => {
        deleteQuoteEvent(quote)
        li.remove()
    })

    blockquote.append(p, footer, br, likeBtn, deleteBtn)
    li.append(blockquote)

    ul.append(li)
}






getQuotes()
newQuoteSubmit(quoteForm)