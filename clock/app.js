const clock=document.getElementById("cl");
const stopwatch=document.getElementById("sw");
const timer=document.getElementById("ti")
const slides=document.getElementById("slides")
const itemscount=document.querySelectorAll(".slides div").length
const start=document.getElementById("start");
const play=document.getElementById("button");


document.documentElement.style.setProperty("--itemscount", itemscount);

const buttons=document.querySelectorAll(".navbar img")

let active_button_index=0;
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
       slides.style.transform=`translateX(-${100/itemscount * index}%)`
       buttons[active_button_index].classList.add("dim");
       button.classList.remove("dim");
       active_button_index=index;
    });
});


setInterval(() => {
    let date=new Date();
    let hour=(date.getHours()%12).toString().padStart(2,"0");
    let minute=date.getMinutes().toString().padStart(2,"0");
    let second=date.getSeconds().toString().padStart(2,"0");
    let ampm;
    if(hour>12){
        ampm="AM";
    }
    else{
         ampm="PM";
    }
    
    clock.innerText=`${hour}:${minute}:${second}${ampm}`;
    
},1000);




let swhr=0;
let swmi=0;
let swsc=0;
start.innerText=`${swhr.toString().padStart(2,"0")}:${swmi.toString().padStart(2,"0")}:${swsc.toString().padStart(2,"0")}`
play.addEventListener("click",()=>{
    play.classList.toggle("play");
    play.classList.toggle("end");

    if (play.classList.contains("end")){
        run=setInterval(() => {
            swsc++;
            if(swsc==60){
                swmi++;
                swsc%=60;
            }
            if(swmi==60){
                swhr++;
                swmi%=60;
            }
            start.innerText=`${swhr.toString().padStart(2,"0")}:${swmi.toString().padStart(2,"0")}:${swsc.toString().padStart(2,"0")}`

        },1000);
    }
    else{
        clearInterval(run);
        swhr=0;
        swmi=0;
        swsc=0;
        start.innerText=`${swhr.toString().padStart(2,"0")}:${swmi.toString().padStart(2,"0")}:${swsc.toString().padStart(2,"0")}`
    }
})


const hourcol=document.getElementById("hc");
const minutecol=document.getElementById("mc");
const secondcol=document.getElementById("sc");





