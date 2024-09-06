const outputbox=document.querySelector("#output");
const sliderelement=document.querySelector("[datalength-slider]");
const uppercasebox=document.querySelector("#uppercase");
const lowercasebox=document.querySelector("#lowercase");
const numberbox=document.querySelector("#number");
const symbolbox=document.querySelector("#symbols");
const copybutton=document.querySelector("#Cbutton");
const indicator=document.querySelector("#indicator");
const generatebutton=document.querySelector("#Gbutton");
const copytext=document.querySelector("#copytext");
const slidertext=document.querySelector("#slidertext");
const checkboxall=document.querySelectorAll("input[type=checkbox]"); //so that i can add event listner to it easily to all the checkboxes

let password="";
let passwordLength=10;
let checkcount=0;
 //it is used to check how many checkbox is checked or not so that the minimum length of the password special case be made out of it by setting password lenfth to checkboxcount

handleslider();

//it will work on event slide
function handleslider(){
    // sliderelement.value=passwordLength;
    sliderelement.value=passwordLength;
    slidertext.innerText=passwordLength;
    console.log(`default value is set to ${passwordLength} of sliderlength`);
}

sliderelement.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleslider();
});

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow - HW
}

function getRandInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
console.log(getRandInt(1,5));


function getRandnumber(){
    return getRandInt(0,9);
}

function generateUpperCase(){
    return String.fromCharCode(getRandInt(65,91));
}

function generateLowerCase(){
    return String.fromCharCode(getRandInt(97,121));
}

//defining symbols here as a string here so that i can access it later on using charat random number
let symbolCollection='!@#$%^&*~?><:;';
function generateSymbol(){
    return symbolCollection.charAt(getRandInt(0,symbolCollection.length));
}

function calculateStrength(){
    let lowerinclude=false;
    let upperinclude=false;
    let numberinclude=false;
    let symbolinclude=false;
    if(lowercasebox.checked){
        lowerinclude=true;
    }
    if(uppercasebox.checked){
        upperinclude=true;
    }
    if(numberbox.checked){
        numberinclude=true;
    }
    if(symbolbox.checked){
        symbolinclude=true;
    }
    if(lowerinclude && upperinclude && numberinclude && symbolinclude && passwordLength>=5)
    {
        console.log("password is strong");
        setIndicator("green");
    }
    else if(numberinclude && upperinclude && symbolinclude && passwordLength>=5)
    {
        console.log("password is medium");
        setIndicator("yellow");
    }
    else{
        console.log("password is weak");
        setIndicator("red");
    }
    

}

async function displaycopied(){
    try {
        await navigator.clipboard.writeText(outputbox.value);
        copytext.innerText="copied";    
    } 
    catch (e) {
        copytext.innerText="failed";
    }
    copytext.classList.add(active); //adds the class named as active in the element which is copytext element
    //after 2s the copied message will be disapperared
    setTimeout(() => {
        copytext.classList.remove(active)
    }, 2000);
}
copybutton.addEventListener('click',()=>{
    if(outputbox.value){
        console.log("Copied")
        displaycopied();
    }
});

//shuffling function
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


//it will run a function in which it will iterate through the array of checkboxall in which all the element of the checkbox is present and it will increase the count +1 if the checkbox is checked 
function handleCheckBoxChange() {
    checkcount = 0;
    checkboxall.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount=checkcount+1;
    });
    console.log("checkboxcount is:",checkcount);

    //special condition
    if(passwordLength < checkcount ) {
        passwordLength = checkcount;
        handleslider();
    }
}

checkboxall.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});


generatebutton.addEventListener('click',()=>{
    //when checkbox is not selected at all 
    if(checkcount==0){
        return;
    }
    //when checkboxcount is more than sliderlength is selected
    if(passwordLength<checkcount)
    {
        passwordLength=checkcount;
        handleslider();
    }


    //creating a array such that it consists of all the functions in it so that i can choose it out of random and can generate my password which is also random

    funArr=[];
    //inserting only those functions inside the array which are selected by the user
    if(uppercasebox.checked){
        funArr.push(generateUpperCase);
    }
    if(lowercasebox.checked){
        funArr.push(generateLowerCase);
    }
    if(numberbox.checked){
        funArr.push(getRandnumber);
    }
    if(symbolbox.checked){
        funArr.push(generateSymbol);
    }
    //to empty the password
    password="";

    //now i have to iterate through the array so that i can call each and every function inside the array so that it can compulsory include the things checked
    for(i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }
    //now i have to choose some random function for the remaining length of the password
    for(i=0;i<passwordLength-funArr.length;i++){
        let randomIndex=getRandInt(0,funArr.length);
        password+=funArr[randomIndex]();
    }
    //output is displayed in the password generator output element which is actually a input parameter 
    outputbox.value=password;

    //shuffling is done using a function named as shuffling
    password = shufflePassword(Array.from(password));

    //calculate the strength using the function calculate strength
    calculateStrength();

});


