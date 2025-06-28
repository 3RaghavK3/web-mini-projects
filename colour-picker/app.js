const colorpicker=document.getElementById("color-picker");
const codedisplay=document.getElementById("color-text");
const history=document.querySelectorAll(".history .previous");
const colourpallete=document.querySelectorAll(".fiveshades div");
const compli=document.querySelector(".complementary");

//change history function ( stores all values as rgb , getcomutedstyle converts to rgb)
function changehistory(rgb) {
    for (let i = 0; i < history.length - 1; i++) {
        history[i].style.backgroundColor = window.getComputedStyle(history[i + 1]).backgroundColor;
    }
    history[history.length - 1].style.backgroundColor=rgb;
}

function pallete(rgb){
    let [r,g,b]=rgb.split("(")[1]
                    .split(")")[0]
                    .split(",")
                    .map(x=>parseInt(x.trim()));
    let shadevalues=[];
    if(r<50 || g<50 || b<50) shadevalues=[100,80,60,40,20];
    else if(r>200 || g>200 || b>200) shadevalues=[-20,-40,-60,-80,-100];
    else shadevalues=[80,40,0,-40,-80];

    colourpallete.forEach((container,index)=>{
        container.style.backgroundColor = `rgb(
            ${Math.min(255, Math.max(0, r + shadevalues[index]))}, ${Math.min(255, Math.max(0, g + shadevalues[index]))}, ${Math.min(255, Math.max(0, b + shadevalues[index]))})`;     
    })

}

function changecompli(rgb){
    let [r,g,b]=rgb.split("(")[1]
                    .split(")")[0]
                    .split(",")
                    .map(x=>parseInt(x.trim()));
                
    if(r>200 || g>200 || b>200) compli.style.color="white";
    else compli.style.color="black";
    compli.style.backgroundColor=`rgb(${255-r}, ${255-g}, ${255-b})`;
}

function changecolordetails(rgbcolor,previouscolour){
    changehistory(previouscolour); 
    codedisplay.innerText=rgbcolor;
    changecompli(rgbcolor);
    pallete(rgbcolor); 
}



//if colour picker is changed manually (instead of selecting from the history or pallete)
let previouscolour="rgb(0 , 0, 0)";
colorpicker.addEventListener("change",()=>{
    changecolordetails(hextorgb(colorpicker.value),previouscolour);
    previouscolour=hextorgb(colorpicker.value);
})

function handleColorSelection(element) {
    element.addEventListener("click", () => {
        let colour = element.style.backgroundColor;
        colorpicker.value = rgbtohex(colour);
        changecolordetails(colour, previouscolour);
        previouscolour = colour;
    });
}
// function to history, palette, and complementary color
[...history, ...colourpallete, compli].forEach(handleColorSelection);


// If codedisplay is clicked, toggle between hex and rgb
codedisplay.addEventListener("click", () => {
    if (codedisplay.innerText.includes("#")) {
        codedisplay.innerText = hextorgb(colorpicker.value);
    } else {
        codedisplay.innerText = colorpicker.value;
    }
});


function rgbtohex(rgb){
    let arrayofrgb=rgb.split("(")[1]
                    .split(")")[0]
                    .split(",")
                    .map(x=>parseInt(x.trim()));
    let r=arrayofrgb[0].toString(16).padStart(2,"0");
    let g=arrayofrgb[1].toString(16).padStart(2,"0");
    let b=arrayofrgb[2].toString(16).padStart(2,"0");
    return `#${r}${g}${b}`;
}

function hextorgb(hex){
    let r=parseInt(hex.slice(1,3),16);
    let g=parseInt(hex.slice(3,5),16);
    let b=parseInt(hex.slice(5,7),16);
    return`rgb(${r}, ${g}, ${b})`;

}

pallete(previouscolour); 
changecompli(previouscolour);