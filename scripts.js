let myLibrary = localStorage.getItem("library") ? JSON.parse(localStorage.getItem("library")) : [];   

if (myLibrary)
    myLibrary.forEach((book)=> {
    updatePage(book.id,book.title, book.author,book.pages,book.toggleState); 
    return addingEventListeners(); 
    }); 

let form = document.querySelector('#library_form');
let submit = document.querySelector('#submit'); 
submit.addEventListener('click',(e) => {
    gatherDOM(); 
    form.reset(); 
    localStorage.setItem("library",JSON.stringify(myLibrary)); 
    console.log(myLibrary)
}); 

function gatherDOM(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value; 
    const pages = document.querySelector('#pages').value; 
    let toggleState = document.querySelector('#myonoffswitch').checked; 
    addBook(title, author, pages, toggleState); 
}

function addBook(title, author, pages, toggleState){
    let id = myLibrary.length; 
    const Book = {
                  id, 
                  title,
                  author, 
                  pages,
                  toggleState,
                 }; 
    updatePage(id,title,author,pages,toggleState); 
    myLibrary.push(Book); 
    addingEventListeners(); 
}

function updatePage(id, title, author, pages, toggleState){
    const cardContainer = document.querySelector('#card_container'); 
    let cardContainerInner = `<div id=${id} class="card"> 
                                <div class="middlediv"> 
                                    <h2 class="title">${title}</h3>
                                    <p class="text">Author: ${author}</p>
                                    <p class="text">Pages: ${pages}</p>
                                </div> 
                                <button data-key=${toggleState} class="read">Read: ${toggleState?"Yes":"No"}</button> 
                                <img src="./trashcan.png" class="delete"></img> 
                              </div>`
    cardContainer.innerHTML += cardContainerInner;  
}

function addingEventListeners(){
    const reads = document.querySelectorAll('.read'); 
    reads.forEach((read) => read.addEventListener('click',(e)=>{
        let readid = e.target.parentElement.id;
        if(read.textContent == "Read: Yes"){ 
            myLibrary.find(book => book.id==readid).toggleState = false;
            read.setAttribute('data-key','false'); 
            localStorage.setItem("library",JSON.stringify(myLibrary)); 
            return read.textContent = "Read: No"; 
        }
        myLibrary.find(book => book.id==readid).toggleState = true; 
        read.setAttribute('data-key','true'); 
        localStorage.setItem("library",JSON.stringify(myLibrary)); 
        return read.textContent = "Read: Yes";
    }))
    const deletes = document.querySelectorAll('.delete'); 
    deletes.forEach((trashbin) => trashbin.addEventListener('click', (e) =>{
        let id = e.target.parentElement.id 
        myLibrary.splice(id,1); 
        e.currentTarget.parentNode.remove(); 
        updateIds(myLibrary); 
        localStorage.setItem("library",JSON.stringify(myLibrary)); 
    }))
}
function updateIds(library){
    let counter = 0; 
    library.forEach((book) =>{
        book.id = counter; 
        counter ++;  
    })
    counter = 0; 
    let cards = document.querySelectorAll('.card'); 
    cards.forEach((card)=> {
        card.id = counter
        counter ++; 
    }); 
}



