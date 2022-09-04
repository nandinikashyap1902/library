// 1. store all the data to the localstorage
// 2. give another column as an option to delate the book
// 3. add a sroll bar to the view

// constructor
function Book(name,author,type){
    this.name =  name;
    this.author = author;
    this.type = type;
}

//display constuctor
function Display(){

}

// add methods to display protptype
Display.prototype.add = function(book){
    console.log("Adding to UI");
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
  </tr>`
  tableBody.innerHTML += uiString;
}

Display.prototype.clear = function(){
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset(); // reset all fields of form after submiting
}

Display.prototype.validate = function(book){
    if(book.name.length<2|| book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}

Display.prototype.show = function(type,displaymessage){
     let message = document.getElementById('message');
     message.innerHTML = `
     <div class="alert alert-${type} alert-dismissible fade show" role="alert">
         <strong>Message:</strong> ${displaymessage}
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`
   setTimeout(function(){
    message.innerHTML = ''
   },2000);  
}

//add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit',libraryFormSubmit);

function libraryFormSubmit(e){
console.log('you have submitted library form');
let name =  document.getElementById('bookName').value;
let author= document.getElementById('author').value;

let fiction =document.getElementById('fiction')
let programming =document.getElementById('programming')
let cooking =document.getElementById('cooking')
let type;

if(fiction.checked){
    type=fiction.value;
}
else if(programming.checked){
    type=programming.value;
}
else if(cooking.checked){
    type=cooking.value;
}
let book = new Book(name,author,type);// create object with user input values
console.log(book);

let display = new Display();

if(display.validate(book)){
    display.add(book);
    display.clear(); // this function clears all the input data name,author,type from screen after submitting
    display.show('success',' your book has been successfully added')
}
else{
    //show error to the user
    display.show('danger',' sorry you cannot add this book');
}

e.preventDefault(); // prevent default behaviour of form, form reloads every time when we submit
}


