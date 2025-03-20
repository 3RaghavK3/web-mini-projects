
let heading=document.querySelector(".heading .month");
let [prev,next,today]=[...document.querySelectorAll(".heading-display .button")];

const monthDaysArray = [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 }
];

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let daysheading=document.getElementById("days");
let display=document.getElementById("display");


daysOfWeek.forEach((day)=>{
    let x=document.createElement("div");
    x.classList.add("card");
    x.innerText=day.slice(0,3);
    daysheading.appendChild(x);
});


function highlightdate(){
    Array.from(display.children).forEach((datecontainer)=>{
        datecontainer.addEventListener("click",()=>{
            document.querySelector(".active")?.classList.remove("active");
            datecontainer.classList.add("active");
        })
    
    });
}

let emojistorage=JSON.parse(localStorage.getItem("emojis")) || {};
function saveemojis(){
    localStorage.setItem("emojis",JSON.stringify(emojistorage));
}


let options=[...document.querySelectorAll(".options div")];
options.forEach((mood)=>{
    mood.addEventListener("click",()=>{
        let moodicon = mood.querySelector("img").cloneNode(true);
        let selecteddate=display.querySelector(".active");
        if (selecteddate===null || selecteddate.innerText==="" ) window.alert("Click a date");
        else{
            if (selecteddate.children.length===1){
                selecteddate.removeChild(selecteddate.children[0]);
            }
            

            let datekey=`${year}-${monthindex+1}-${selecteddate.innerText}`;
            emojistorage[datekey]=moodicon.src;
            saveemojis();
            selecteddate.appendChild(moodicon);
        }
    })

})




function generatecalender(year,month,currentdt){
    //the first day has to regerenate each time...
    display.innerHTML="";
    let firstday=new Date(year,month,1).getDay();
    heading.innerText=`${monthDaysArray[month].month} ${year}`;
    for(let x=0;x<firstday;x++){
        let holder=document.createElement("div");
        holder.classList.add("card")
        display.appendChild(holder);
    }

    if(month===1){
        if(year%4===0 &&((year%100!==0) || year%400===0)) monthDaysArray[1].days=29;
        else monthDaysArray[1].days=28;
    }
    
    for(let i=1;i<=monthDaysArray[month].days;i++){
        let holder=document.createElement("div");
        holder.classList.add("card")
        holder.innerText=i;
        display.appendChild(holder);

        let key=`${year}-${month+1}-${i}`
        if(emojistorage[key]){
            let img=document.createElement("img");
            img.src=emojistorage[key];
            holder.appendChild(img);
        }
    }

    //just for changing glow of today
    
    let temp=new Date();
    if (year===temp.getFullYear() && month==temp.getMonth()){
        display.querySelector(".today")?.classList.remove("today");
        display.children[currentdt-1+firstday].classList.add("today");
        display.children[currentdt-1+firstday].classList.add("active");
        
    }

    highlightdate();
    
   
}

prev.addEventListener("click",()=>{
    if(monthindex===0) {
        monthindex=11;
        year--;
    }
    else{
        monthindex--;
    }
    generatecalender(year,monthindex,currentdate);
}); 


next.addEventListener("click",()=>{

    if(monthindex===11){
        monthindex=0
        year++
    }
    else{
        monthindex++;
    }
    generatecalender(year,monthindex,currentdate);
})

today.addEventListener("click",()=>{
    generatecurrent();
})


let year;
let monthindex;
let currentdate;
let firstday;



function todaydetails(){
    let dateinfo=new Date();
    year=dateinfo.getFullYear();
    monthindex=dateinfo.getMonth();
    currentdate=dateinfo.getDate();
    firstday=new Date(year,monthindex,1).getDay();
    return [year,monthindex,currentdate,firstday];
}


function generatecurrent(){
        let [a,b,c]=todaydetails();
        generatecalender(a,b,c);
}




function schedulemidnight(){
    generatecurrent(); 

    let now=new Date();
    let midnight=new Date();

    midnight.setHours(0,0,0,0);
    midnight.setDate(midnight.getDate()+1);

    let timeremaining=midnight-now;

    setTimeout(()=>{
        generatecurrent();
        setInterval(()=>{
            generatecurrent();
        },24*60*60*1000);
    },timeremaining)
}

schedulemidnight();

