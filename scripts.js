let myLibrary = []; 

addBook("Harry Potter and the Goblet of Fire ", "J.K. Rowling", "430", false);
addBook("The Winds of Winter", "George R. R. Martin","1400",true); 
addBook("Of Mice and Men", "John Steinbeck", "187", true);


let form = document.querySelector('#library_form');
let submit = document.querySelector('#submit'); 
submit.addEventListener('click',(e) => {
    gatherDOM(); 
    form.reset(); 
}); 

function addBook(title, author, pages, toggleState){
    let id = myLibrary.length; 
    const Book = {
                  id, 
                  title,
                  author, 
                  pages,
                  toggleState,
                 }; 
    const cardContainer = document.querySelector('#card_container'); 
    let cardContainerInner = `<div id=${myLibrary.length} class="card"> 
                                <div class="middlediv"> 
                                    <h2 class="title">${title}</h3>
                                    <p class="text">Author: ${author}</p>
                                    <p class="text">Pages: ${pages}</p>
                                </div> 
                                <button data-key=${toggleState} class="read">Read: ${toggleState?"Yes":"No"}</button> 
                                <img src="./trashcan.png" class="delete"></img> 
                            </div>`
    cardContainer.innerHTML += cardContainerInner;  
    myLibrary.push(Book); 
    const reads = document.querySelectorAll('.read'); 
    reads.forEach((read) => read.addEventListener('click',(e)=>{
        let readid = e.target.parentElement.id;
        if(read.textContent == "Read: Yes"){ 
            myLibrary.find(book => book.id==readid).toggleState = false;
            read.setAttribute('data-key','false'); 
            return read.textContent = "Read: No"; 
        }
        myLibrary.find(book => book.id==readid).toggleState = true; 
        read.setAttribute('data-key','true'); 
        return read.textContent = "Read: Yes";
    }))
    const deletes = document.querySelectorAll('.delete'); 
    deletes.forEach((trashbin) => trashbin.addEventListener('click', (e) =>{
        let id = e.target.parentElement.id 
        myLibrary.splice(id,1); 
        e.currentTarget.parentNode.remove(); 
        updateIds(myLibrary); 
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

function gatherDOM(){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value; 
    const pages = document.querySelector('#pages').value; 
    let toggleState = document.querySelector('#myonoffswitch').checked; 
    addBook(title, author, pages, toggleState); 
}


