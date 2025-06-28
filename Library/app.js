
  let bookdata;
  let index=0;
  async function getbook(){


  const url = 'https://api.freeapi.app/api/v1/public/books';
  const options = {method: 'GET', headers: {accept: 'application/json'}};

  

  try {
    const response = await fetch(url, options);
    const result= await response.json();
    bookdata=result.data.data;
    
    console.log(bookdata);
    

    displaybooks(bookdata,index);
  } catch (error) {
    console.error(error);
  }
  }


function displaybooks(bookdata,index){
          
          let booksdisplay=document.querySelector(".display");
          booksdisplay.innerHTML = ""; 
          
          for(let i=0;i<9;i++){
            let bookcontainer=document.createElement("div");
            bookcontainer.style.backgroundImage=`url(${bookdata[index++].volumeInfo.imageLinks.thumbnail})`;     
            bookcontainer.classList.add("book-grid");       
            booksdisplay.appendChild(bookcontainer);
          }
   
  }

let next=document.getElementById("next");
let prev=document.getElementById("prev");


next.addEventListener("click",()=>{
  displaybooks(bookdata,Math.floor(index/9)*9+9);
});

prev.addEventListener("click",()=>{
  displaybooks(bookdata,Math.floor(index/9)*9-9);
})


getbook();


