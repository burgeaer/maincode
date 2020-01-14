"use strict";
let formValidity = true;
function removeSelectDefault() {
    let selectBox = document.getElementById("size");
    selectBox.selectedIndex = -1;
    selectBox.style.boxShadow = "none";
}
function setUpPage() {
    removeSelectDefault();
    generatePlaceHolder();
    createEventListener();
}

function zeroPlaceHolder() {
    let instrBox = document.getElementById("instructions");
    instrBox.style.color = "black";
    if (instrBox.value === instrBox.placeholder) {
        instrBox.value = "";
    }

}
function checkPlaceHolder() {
    let instrBox = document.getElementById("instructions");
    if (instrBox.value === "") {
        instrBox.value = instrBox.placeholder;
        instrBox.style.color = "rgb(178,184,183)";
    }
}
function generatePlaceHolder() {
    if(!Modernizr.input.placeholder) {
        let instrBox = document.getElementById("instructions");
        instrBox.value = instrBox.placeholder;
        instrBox.style.color = "rgb(178,184,183)";
        if (instrBox.addEventListener) {
            instrBox.addEventListener("focus", zeroPlaceholder, false);
            instrBox.addEventListener("blur", checkPlaceHolder, false);
        }
        else if (instrBox.attachEvent){
            instrBox.attachEvent("onfocus", zeroPlaceholder);
            instrBox.attachEvent("onblur", checkPlaceHolder);
        }
    }
}
function validateRequired() {
    let inputElements = document.querySelectorAll("input[required]");
    let errorDiv = document.getElementById("errorMessage");
    let crustBoxes = document.getElementsByName("crust");
    let fieldsetValidity = true;
    let elementCount = inputElements.length;
    let currentElement;

    try {
        for(let i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;

            }
            else {
                currentElement.style.background = "white";
            }
        }
        currentElement = document.querySelectorAll("select")[0];
        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        else {
            currentElement.style.border = "";
        }
        if (!crustBoxes[0].checked && !crustBoxes[1].checked) {
            crustBoxes[0].style.outline = "1px solid red";
            crustBoxes[1].style.outline = "1px solid red";
            fieldsetValidity = false;
        }
        else {
            crustBoxes[0].style.outline = "";
            crustBoxes[1].style.outline = "";
        }
        if (fieldsetValidity === false) {
            throw "Please Complete All Fields.";
        }
        else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";

        }

    }
    catch(msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    else {
        evt.returnValue = false;
    }
    formValidity = true;
    validateRequired();

    if(formValidity === true) {
        document.getElementById("errorMessage").innerHTML = "";
        document.getElementById("errorMessage").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    }
    else {
     document.getElementById("errorMessage").innerHTML = "Please Complete The Highlighed Fields.";
     document.getElementById("errorMessage").style.display = "block";
     scroll(0,0);
    }
}
function createEventListener() {
   let orderForm = document.getElementsByTagName("form")[0];
   if (orderForm.addEventListener) {
       orderForm.addEventListener("submit", validateForm, false);
   }
   else if (orderForm.attachEvent) {
       orderForm.attachEvent("onsubmit", validateForm);
   }
}


if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}