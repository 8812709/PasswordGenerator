const outputbox=document.querySelector("#output");
const sliderelement=document.querySelector("[datalength-slider]");
const uppercasebox=document.querySelector("#uppercase");
const lowercasebox=document.querySelector("#lowercase");
const numberbox=document.querySelector("#number");
const symbolbox=document.querySelector("#symbols");
const copybutton=document.querySelector("#Cbutton");
const indicator=document.querySelector("#indicator");
const generatebutton=document.querySelector("#Gbutton");
const copytext=document.querySelector("#copyytext");
const slidertext=document.querySelector("#slidertext");


let passwordLength=10;
handleslider();

//it will work on event slide
function handleslider(){
    // sliderelement.value=passwordLength;
    passwordLength=sliderelement.value;
    slidertext.innerText=passwordLength;
    console.log(`default value is set to ${passwordLength} of sliderlength`);
}

let color=white;
function setIndicator(){
    indicator.style.backgroundcolor=color;
}

function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
console.log(getRandInt(1,5));



