import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";



const editor=document.getElementById("editor")
const preview=document.getElementById("preview")
const clearbtn=document.getElementById("clear")
const resetbtn=document.getElementById("reset")
const messagefield=document.getElementById("message")
const alert=document.getElementById("alert")
const overlay=document.getElementById("overlay")
let currentAction=null

 const [wordsfield,linesfield,charactersfield,bytesfield]=[...document.getElementById('footer').querySelectorAll(
  '.box .value'
)];
const [Cancelbtn,Confirmbtn]=[...alert.querySelectorAll(".buttons div")];




const PreloadMd=async()=>{
  try{
     const response= await fetch('SampleTemplate.md');
     if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
     const text=await response.text();
     editor.value=text;
  }
  catch(err){
    editor.value="Failed to load template. You can still type here..."
    console.log("Error fetching sample markdown "+err.message)
  }
}


function triggerInput(element){
        const event=new Event('input',{});
        element.dispatchEvent(event);
    }

window.addEventListener("load", () => {
  PreloadMd()
  .then(()=>{
      triggerInput(editor)
  })
});




editor.addEventListener("input",()=>{

    let content=[...editor.value]
    function updateWords() {
      wordsfield.innerText=content.filter(x=>x==" ").length
    }

    function updateLines(){
      linesfield.innerText=content.filter(x=>x=="\n").length
    }

    function updateCharacters(){
      charactersfield.innerText=content.length;
    }

     preview.innerHTML=marked.parse(editor.value);
     updateWords();
     updateLines();
     updateCharacters();
  

})

const generateAlert=(message,clickelementID)=>{
    alert.style.display='block';
    overlay.style.display="block";
    editor.readOnly = true;   
    messagefield.innerText=message
    currentAction=clickelementID
  }

  clearbtn.addEventListener("click",(event)=>{generateAlert("Are you sure you want to clear it?",event.target.id)});
  resetbtn.addEventListener("click",(event)=>{generateAlert("Are you sure you want to reset it?",event.target.id)});




  const removeAlert=()=>{
            alert.style.display='none';
            overlay.style.display="none";
            document.body.style.overflow = 'auto';
            editor.readOnly = false;
            currentAction=null;
  }



Confirmbtn.addEventListener("click",()=>{
    
    if(currentAction=="clear"){
        editor.value="";
        triggerInput(editor)
      
    }
    if(currentAction=="reset"){
         PreloadMd()
        .then(()=>{
            triggerInput(editor)
        })
       
    }

    removeAlert();
   
}); 

Cancelbtn.addEventListener("click",()=>{removeAlert();})