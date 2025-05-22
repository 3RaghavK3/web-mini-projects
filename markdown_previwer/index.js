  import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


const editor=document.getElementById("editor")
const preview=document.getElementById("preview")
const words=0;
const lines=0;
const characters=0
const bytes=0;



editor.addEventListener("input",()=>{
    console.log(marked.parse(editor.value));
     preview.innerHTML=marked.parse(editor.value);

})


