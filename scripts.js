let myLibrary = []; 


function Book(title, author, pages, read){
    let id = myLibrary.length+1; 
    const Book = {
                  id, 
                  title,
                  author, 
                  pages,
                  read,
                 }; 
    myLibrary.push(Book); 
}


let form = document.querySelector('#library_form');
let submit = document.querySelector('#submit'); 
submit.addEventListener('click',(e) => {
    formatCard(); 
    form.reset(); 
}); 

function formatCard(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value; 
    const pages = document.querySelector('#pages').value; 
    let toggleState = document.querySelector('#myonoffswitch').checked; 
    Book(title, author, pages, toggleState); 
    const cardContainer = document.querySelector('#card_container'); 
    let cardContainerInner = `<div class="card"> 
                                <h2 class="title">${title}</h3>
                                <p class="text">Author: ${author}</p>
                                <p class="text">Pages: ${pages}</p>
                                <button data-key=${toggleState} class="read" id=${myLibrary.length}>Read: ${toggleState?"Yes":"No"}</button> 
                              </div>`
    cardContainer.innerHTML += cardContainerInner;  
    const reads = document.querySelectorAll('.read')
    reads.forEach((read) => read.addEventListener('click',(e)=>{
        if(read.textContent == "Read: Yes"){
            myLibrary.find(book => book.id==read.id).read = false;
            read.setAttribute('data-key','false');  
            return read.textContent = "Read: No"; 
        }
        myLibrary.find(book => book.id==read.id).read = true; 
        read.setAttribute('data-key','true');
        return read.textContent = "Read: Yes";
    }))
}


