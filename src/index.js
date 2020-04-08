const ul = document.querySelector("#quote-list")
const form = document.querySelector("#new-quote-form")

const URL = "http://localhost:3000/quotes?_embed=likes"

function fetchQuotes(){
    fetch(URL)
    .then(promise =>  promise.json()
    )
    .then(data => {
        renderQuotes(data)
        
    }).catch(error => console.error(error))

}


function renderQuotes(data) {
    data.forEach(element => renderQuote(element))
}


function renderQuote(data) { 
    const li = document.createElement("li")
    li.className = "quote-card"
    const block = document.createElement("blockquote")
    block.className = "blockquote"
    const p = document.createElement("p")
    p.className = "mb-0"
    const footer = document.createElement("footer")
    const brk = document.createElement("break")
    footer.className = "blockquote-footer"
    const buttonLike = document.createElement("button")
    const span = document.createElement("span")
    const buttonDelete = document.createElement("button")
    buttonLike.className = 'btn-success'
    buttonLike.innerText = "Likes:"
    buttonDelete.className = 'btn-danger'
    buttonDelete.innerText = "Delete"
    /// assign elements 
    if (data.likes.length === 0){
        span.innerText = 0
    }
    else 
    {
        span.innerText = data.likes.length 
    }
    p.innerText = data.quote
    footer.innerText = data.author
    //append elements 
    buttonLike.append(span)
    block.append(p,footer,brk,buttonLike,buttonDelete)
    li.append(block)
    ul.append(li)

    buttonDelete.addEventListener('click', event => fetchDelete(data,li))
    buttonLike.addEventListener('click', event => fetchLike(data,span))

}

    form.addEventListener("submit", event => {
        event.preventDefault();
        const quote = event.target.quote.value
        const author = event.target.author.value 

        fetch("http://localhost:3000/quotes", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                quote: quote,
                author: author,
                likes: []
            })
        }).then(resp => resp.json())
        .then(data => renderQuote(data) )
    })

function fetchDelete(data,li) {
    fetch(`http://localhost:3000/quotes/${data.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    li.remove()
}


function fetchLike(quote, span){
    
    fetch(`http://localhost:3000/likes`, {
        method: 'Post',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            quoteId: quote.id
        })
    })
    span.innerText ++
}




  

  




fetchQuotes()





// /*
// <li class='quote-card'>
//   <blockquote class="blockquote">
//     <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//     <footer class="blockquote-footer">Someone famous</footer>
//     <br>
//     <button class='btn-success'>Likes: <span>0</span></button>
//     <button class='btn-danger'>Delete</button>
//   </blockquote>
// </li>
// *\