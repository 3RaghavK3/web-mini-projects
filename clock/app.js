const clock=document.getElementById("cl");
const stopwatch=document.getElementById("sw");
const timer=document.getElementById("ti")
const slides=document.getElementById("slides")
const itemscount=document.querySelectorAll(".slides>div").length
const start=document.getElementById("start");
const playbutton=document.getElementById("playbutton");
const endbutton=document.getElementById("endbutton");
const circle=document.getElementById("circle")


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
playbutton.addEventListener("click",()=>{
    playbutton.classList.toggle("play");
    playbutton.classList.toggle("pause");

    if (playbutton.classList.contains("pause")){
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
    if(playbutton.classList.contains("play")){
        clearInterval(run);
    }

    endbutton.addEventListener("click",()=>{
        clearInterval(run);
        playbutton.classList.add("play");
        playbutton.classList.remove("pause");
        swhr=0;
        swmi=0;
        swsc=0;
        start.innerText=`${swhr.toString().padStart(2,"0")}:${swmi.toString().padStart(2,"0")}:${swsc.toString().padStart(2,"0")}`
    })
})




const hourcol=document.getElementById("hc");
const minutecol=document.getElementById("mc");
const secondcol=document.getElementById("sc");
const wrappers=document.querySelectorAll(".wrapper");



function populate(){
    for(let i=0;i<1;i++){
        let x=document.createElement("div");
        x.classList.add("item");
        hourcol.appendChild(x);
        y=x.cloneNode(true);
        minutecol.appendChild(y);
        z=y.cloneNode(true);
        secondcol.appendChild(z);
    }
    
    
    for(let i=0;i<=23;i++){
        let x=document.createElement("div");
        x.classList.add("item");
        
        x.innerText=i.toString().padStart(2,"0");
        hourcol.appendChild(x);
    }
    
    
    for(let i=0;i<=59;i++){
        let x=document.createElement("div");
        x.classList.add("item");
        x.innerText=i.toString().padStart(2,"0");
        minutecol.appendChild(x);
        y=x.cloneNode(true);
        secondcol.appendChild(y);
    }
}

populate();

const timerstart=document.getElementById("timer-start");

function start_timer(){
    p_sbuttons.forEach((button)=>{
        button.style.visibility="visible";
    })
    startcountdown=setInterval(() => {
        let hrs=parseInt(timerstart.textContent.slice(0,2));
        let mins=parseInt(timerstart.textContent.slice(3,5));
        let sc=parseInt(timerstart.textContent.slice(6));

        if(hrs==0 && mins==0 && sc==0){
            clearInterval(startcountdown);
            timerstart.textContent="Time-up";
            p_sbuttons.forEach((button)=>{
                button.style.visibility="hidden";
            })
            return;
        }

        sc--;


        if(sc<0){
            sc=59;
            mins--;
        }
        if(mins<0){
            mins=59;
            hrs--;
        }
        

        timerstart.textContent = 
            `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${sc.toString().padStart(2, '0')}`;
        
    }, 1000);
}

const timerbutton=document.getElementById("timerbt");

let startcountdown;
timerbutton.addEventListener("click",()=>{
    p_sbuttons[0].classList.add("pause")
    p_sbuttons[0].classList.remove("play");
    clearInterval(startcountdown)
    start_timer();
    slides.style.transform=`translateX(-${100/itemscount * (itemscount-1)}%)`
    timerstart.textContent=timervalue;
    let hrs=parseInt(timerstart.textContent.slice(0,2));
    let mins=parseInt(timerstart.textContent.slice(3,5));
    let sc=parseInt(timerstart.textContent.slice(6));

    let timerforborder=(sc)+(mins*60)+(hrs*3600);

    document.documentElement.style.setProperty("--timerforborder",timerforborder);
    circle.style.border=`10px solid white`;
    circle.style.animation = "none";
    void circle.offsetWidth;
    circle.style.animation=`border-decrease calc(var(--timerforborder)*1s) linear forwards`;


})

const p_sbuttons=document.querySelectorAll(".timer-display .buttons-container div");
p_sbuttons[0].addEventListener("click",()=>{
    p_sbuttons[0].classList.toggle("pause");
    p_sbuttons[0].classList.toggle("play");

    if(p_sbuttons[0].classList.contains("play")){
        clearInterval(startcountdown);
        circle.style.animationPlayState="paused";
    }
    if(p_sbuttons[0].classList.contains("pause")){
        start_timer();
        circle.style.animationPlayState="running";
    }

});


p_sbuttons[1].addEventListener("click",()=>{
    clearInterval(startcountdown);
    timerstart.textContent=`00:00:00`;
    slides.style.transform=`translateX(-${100/itemscount * 2}%)`;
    
});


let timervalue="00:00:00";
console.log(timervalue);
document.addEventListener("DOMContentLoaded",()=>{
    wrappers.forEach((wrapper,index)=>{
        wrapper.addEventListener("scroll",()=>{
            let rect=wrapper.getBoundingClientRect();
            let x=rect.left+rect.width/2;
            let y=rect.top+rect.height/2;
            let value=document.elementFromPoint(x,y).textContent;
            if(index===0) timervalue=`${value}${timervalue.slice(2)}`
            else if(index===1) timervalue=`${timervalue.slice(0,3)}${value}${timervalue.slice(5)}`;
            else timervalue=`${timervalue.slice(0,6)}${value}`;
            console.log(timervalue);
        });
    });
});



