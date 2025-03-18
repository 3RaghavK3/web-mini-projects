const colourpicker = document.getElementById("color-picker");
const pallete = document.querySelectorAll(".fiveshades div");

function hextorgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    let values = [r, g, b];
    let shadevalues = [];

    if (r > 200 || g > 200 || b > 200) {
        shadevalues = [-20,-40,-60,-80,-100];
    } else if (r < 50 || g < 50 || b < 50) {
        shadevalues = [100,80,60,40,20];
    } else {
        shadevalues = [100, 50, 0, -50, -100];
    }

    pallete.forEach((div, index) => {
        colourpallete(div, values, shadevalues[index]);
    });
}

function rgbToHex(rgb) {
    return "#" + 
        r.toString(16).padStart(2, "0") + 
        g.toString(16).padStart(2, "0") + 
        b.toString(16).padStart(2, "0");
}

function colourpallete(element, colour, shade) {
    let r = Math.min(255, Math.max(0, colour[0] + shade));
    let g = Math.min(255, Math.max(0, colour[1] + shade));
    let b = Math.min(255, Math.max(0, colour[2] + shade));
    element.style.backgroundColor = `rgb(${r},${g},${b})`;
}

colourpicker.addEventListener("change", () => {
    hextorgb(colourpicker.value);
});

hextorgb(colourpicker.value);

pallete.forEach((eachshade,index)=>{
    eachshade.addEventListener("click",()=>{
        colourpicker.value=rgbtohex(eachshade.style.backgroundColor);
    })
});
