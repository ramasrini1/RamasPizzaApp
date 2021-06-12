let visaPrefix = '4';
let masterArray = ['51','52','53','54','55'];
let americanArray = '37';

//Get Dom Elements
const billingForm = document.querySelector('#billingForm');
let sameElement =   document.querySelector('#sameAddress');
let nameElement =  document.querySelector('#name');
let emailElement = document.querySelector('#email');
let addressElement = document.querySelector('#address');
let phoneElement = document.querySelector('#phone');
let addressTypeElement = document.querySelector('#addressType');
let otherTypeElement = document.querySelector('#otherType');
let cityElement = document.querySelector('#city');
let stateElement = document.querySelector('#state');
let zipCodeElement =  document.querySelector('#zip');
let appartmentElement =  document.querySelector('#appartment');
let expiryMonthElement = document.querySelector('#expiryMonth');
let expiryYearElement = document.querySelector('#expiryYear');
let cardTypeElement = document.querySelector('#cardType');
let cardNumberElement = document.querySelector('#cardNumber');
let cvcElement = document.querySelector('#cvc');

//let output = window.opener.document.getElementById('zip');

billingForm.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    //Clear the textbox with card type
    cardTypeElement.value = "";
    clearAllErrorMessages();
    let validName    = checkUserName();
    let validEmail   = checkEmail();
    let validZip     = validateZipcode();
    let validAddType = checkAddressType();
    let validOther   = checkOtherType();
    let validAdd     = checkAddress();
    let validState   = checkState();
    let validCity    = checkCity();
    let validPhone   = validatePhone();
    let card         = checkCard();
    //let validCardNumber = validateCardNumberEntry();

    let validForm = validName && validEmail && validZip && validAddType
                    && validOther && validAdd && validState && validCity
                    && validPhone && card;
    
    if (validForm){
        alert("Success!! Processing your payment\nThank You For Your Order");
    }else{
        alert("Billing cannot be processed. Form is Invalid");
    } 
});

//Add Event Listener to same address checkbox
sameElement.addEventListener('change', function() {
    if (document.getElementById("sameAddress").checked){
        populateFormFields();
        //alert("fname is " + fname);  
    } else {
        //clear the fields
        nameElement.value = "";
        addressTypeElement.options[0].selected = true;
        otherTypeElement.value = "";
        addressElement.value = "";
        appartmentElement.value = "";
        cityElement.value = "";
        stateElement.value = "";
        zipCodeElement.value = "";
        phoneElement.value = "";
        emailElement.value = "";
    }
}, false);


function populateFormFields(){
    //let fname = localStorage.getItem("name");
    nameElement.value = localStorage.getItem("name");
    addressTypeElement.value = localStorage.getItem("addressType");
    otherTypeElement.value = localStorage.getItem("otherType");
    addressElement.value = localStorage.getItem("address");
    appartmentElement.value = localStorage.getItem("appartment");
    cityElement.value = localStorage.getItem("city");
    stateElement.value = localStorage.getItem("state");
    zipCodeElement.value = localStorage.getItem("zip");
    phoneElement.value = localStorage.getItem("phone");
    emailElement.value = localStorage.getItem("email"); 
    FillOtherType(); 
    //alert("in populate Fields");
}
function FillOtherType(){
    //alert("check Othe type");
    var element=document.getElementById('otherType');
    var val=localStorage.getItem("addressType");
    //console.log("other type val is " + val);
    if(val=='other'){
      element.style.display='block';
    } else  {
      element.style.display='none';
      clearErrorMsg(element);
   }
}
function clearAllErrorMessages(){
    clearErrorMsg(cardNumberElement);
    clearErrorMsg(cardTypeElement);
    clearErrorMsg(expiryMonthElement);
    clearErrorMsg(expiryYearElement);
    clearErrorMsg(cvcElement);
}
function validateCardNumberEntry(){
    let completeCard  = true;
    let allNumbers = true;
    let cardType = "";
    let validCardEntry = "false";
    var cardNumber = cardNumberElement.value.trim();
    
    if (isNotEmpty(cardNumber) === false ) {
        showError(cardNumberElement, "Credit Card Number cannot be blank");
        //console.log("Credit Card Number cannot be blank");
        completeCard = false;
    } 
   if(completeCard === true){
        allNumbers = isAllDigits(cardNumber);
        if(allNumbers === false){
            showError(cardNumberElement, "Credit card should contain only numbers");
        }
   }
   
   validCardEntry = completeCard && allNumbers;
   if(validCardEntry){
       showSuccess(cardNumberElement);
   }
   return validCardEntry;  
}
function checkCard(){
    let validEntry = validateCardNumberEntry();
    //Check if user made selection for year and month
      
    let monthSelection = false;
    let yearSelection = false;
    let cardSelection = false;
    let yearMonthValid = false;
    let cardEntry = false;
    let cardValid = false;
    let cvcValid = false;
    monthSelection = validateSelection(expiryMonthElement, 'disabledOption', 'Select Month');
    yearSelection = validateSelection(expiryYearElement, 'disabledOption', 'Select Year');
    cardSelection = monthSelection && yearSelection;
    if ( cardSelection){
        //Check Expiration
        yearMonthValid = checkYearMonthValidity();
    }
    //Check security code cvc
    cvcValid = checkSecurityCode();
    cardEntry = cardSelection && yearMonthValid && cvcValid && validEntry;
    if (cardEntry){
        //Check if credit card is valid using the formula
        cardValid = validateCardType();
    }else{
        //showError(cardNumberElement, "Incomplete Card Info");
    }
    return cardValid;
}

function checkSecurityCode(){
    let cvc = cvcElement.value.trim();
    let validcvc = false;
    let allDigits = false;
    let cvcField = true;
    if (isNotEmpty(cvc) === false ) {
        showError(cvcElement, "Blank CVC code");
        cvcField = false;
    }
    if(cvcField){
        //Check if it is all digits
        allDigits = isAllDigits(cvc);
        if (!allDigits){
            showError(cvcElement, "Enter Only Numbers");
        }else{
            //Check length
            if (cvc.length === 3){
                showSuccess(cvcElement);
                validcvc = true;
            } else {
                showError(cvcElement, "Enter 3 digit code");
            }
        }
    }
    return validcvc;
}

function checkYearMonthValidity(){
    let year = expiryYearElement.value.trim();
    let month = expiryMonthElement.value.trim();
    let currentYear, validYear, creditCardYear;
    let currentMonth, validMonth, creditCardMonth;
    let validCard  = false;
    let currentDate = new Date();
    currentYear = currentDate.getFullYear();
    currentMonth = currentDate.getMonth();
    creditCardMonth = parseInt(month);
    creditCardYear = parseInt(year);
    //console.log("intyear" + intYear + "current " + currentYear);
    if (currentYear < creditCardYear){
        validCard = true;
        expiryYearElement.style.border = "1px solid #28a745";
    }else if (currentYear === creditCardYear){
        //Check Month
        creditCardMonth = creditCardMonth - 1; //Jan is month 0
        if (currentMonth < creditCardMonth){
            expiryMonthElement.style.border = "1px solid #28a745";
            expiryYearElement.style.border = "1px solid #28a745";
            validCard = true;
        }else{
            expiryMonthElement.style.border="1px solid #dc3545";
            showError(expiryMonthElement, "Expired Card(month)")
        }
    } else {//currentYear >CreditCardYear
        expiryYearElement.style.border="1px solid #dc3545";
        showError(expiryYearElement, "Expired Card(year)");
    }
    return validCard;
}

function validateCardNumber(){
    let cardNumber = cardNumberElement.value.trim();
    //cardNumber = '4512113014843252';
    let validCard = false;
    validCard = validateCardType();
    return validCard;
    //console.log("cardNumber: " + cardNumber + " cardType: " + cardType + "is Valid : " + validCard );
}

function validateCardType(){
    let cardNumber = cardNumberElement.value.trim();
    cardType = getCardType(cardNumber);
    
    let valid = false;
    if (cardType !== "unknown"){
        valid = validateLuhan(cardNumber);
    } 
    if (valid){
        //alert("credit card is valid");
        showSuccess(cardNumberElement);
    } else {
        //alert("card not be processed");
        showError(cardNumberElement, "Card Number is Invalid");
    }
    return valid;
}
function getCardType(cardNumber){
    let d1, d2, length, cardType;
    cardType = "invalid";
    length = cardNumber.length;
    d1 = cardNumber.substring(0,1);
    d2 = cardNumber.slice(0,2);
    let visaPrefix = validatePrefix(['4'], d1)
    let masterPrefix = validatePrefix(masterArray, d2);
    let americanPrefix = validatePrefix(['37'], d2);
    
    if ( visaPrefix){
        if(length === 13 || length === 16){
            cardType = "visa";
            cardTypeElement.value = "Visa";
        }
    } else if( masterPrefix){
        if( length === 16){
            cardType = "master";
            cardTypeElement.value = "MasterCard";
        }
    } else if(americanPrefix){
        if (length === 15){
            cardType = "american";
            cardTypeElement.value = "American Express";
        } 
    } else {
        cardType = "unknown";
        cardTypeElement.value = "Unknown Card";
        //showError(cardTypeElement, "Card cannot be processed");
    }
    if (cardType === "invalid" || cardType === "unknown"){
        cardTypeElement.value = "Unknown Card";
        showError(cardTypeElement, "Unkonwn Credit card cannot be processed");
    }
    return cardType;
}
function validatePrefix(prefixArray, str){
    let valid = false;
    for(let i=0; i<prefixArray.length; i++){
        if (str === prefixArray[i]){
            valid = true;
             break;
        }
    }
    return valid;
}
function isAllDigits(str){
    var pattern = /^\d+$/;
    var allDigits = pattern.test(str);
    return allDigits;
}
function validateLuhan(cardNumber1){
    let c, d, len, s, str, i, sum;
    str = "";
    cardNumber = cardNumber1.split("").reverse().join("");
    len = cardNumber.length;
    sum = 0;
    let valid = false;
    for ( i = 0; i<len; i++){
        let c = cardNumber.charAt(i);
        let d = parseInt(c);  
        if ( i%2 != 0){
            s = d*2;       
            c = s.toString();
            str = str + c;       
        } else{
            str = str + c;      
        }
    }
    //console.log("str is " + str);
    for (i =0; i<str.length; i++){
        c = str.charAt(i);
        d = parseInt(c);
        sum = sum + d;
    }
    //console.log("sum is " + sum);
    if(sum % 10 === 0){
        valid = true;
    }
    return valid;
}

function validateSelection(element, label, errMsg){
    let valid = true;
    const val = element.value.trim();
    if (val === label){
        showError(element, errMsg);
        valid = false;
        element.style.border="1px solid #dc3545";  
    } else {
        showSuccess(element);
        element.style.border = "1px solid #28a745";
    }
    return valid;
}
//
function validatePhone() {
    let phone = phoneElement.value.trim();
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneField = true;
    var validFormat = true;

    if (isNotEmpty(phone) === false ) {
        showError(phoneElement, "Phone cannot be blank");
        phoneField = false;
    }
    if (phoneField !== false) {
        //check if formatting of phone field is valid
        validFormat = regex.test(phone);
        if (!validFormat){
            showError(phoneElement, 'Invalid Format: Enter 9 digit numbers');
        }
    } 
    var validPhone = phoneField && validFormat;
    if(validPhone == true){
        showSuccess(phoneElement);
    }
    return validPhone;
}

function checkCity(){
    let city = cityElement.value.trim();
    validCity = false;
    if (isNotEmpty(city)=== false) {
        showError(cityElement, 'City cannot be blank');
    }  else {
        showSuccess(cityElement);
        validCity = true;
    }
    return validCity;
}

function checkState(){
    let state = stateElement.value.trim();
    //let validState = true;
    let validFormat = true;
    let stateField = true;
    if (isNotEmpty(state) === false ) {
        showError(stateElement, "Empty state field");
        stateField = false;
    }
    if (stateField === true){
        validFormat =  !/[^a-zA-Z]/.test(state);
        if( validFormat && state.length===2){
            showSuccess(stateElement);
        } else {
            showError(stateElement, 'Invalid state code');
            validFormat = false;
        }
    }
    let validState = validFormat && stateField
    return validState;
}
const checkEmail = () => {
    let valid = false;
    const email = emailElement.value.trim();
    if (isNotEmpty(email)=== false) {
        showError(emailElement, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailElement, 'Email is not valid.')
    } else {
        showSuccess(emailElement);
        valid = true;
    }
    return valid;
}

function checkAddressType(){
    let validOther = true;
    let validAddressSelection = true;
    const addressType = addressTypeElement.value.trim();
    const otherType = otherTypeElement.value.trim();
    if (addressType === 'disabledOption'){
        showError(addressTypeElement, 'Select a valid address type');
        addressTypeElement.style.border="1px solid #dc3545";  
        validAddressSelection = false
    } else {
        showSuccess(addressTypeElement);
        addressTypeElement.style.border = "1px solid #28a745";
    }
    return validAddressSelection;
}

function checkOtherType(){
    const addressType = addressTypeElement.value.trim();
    const otherType = otherTypeElement.value.trim();
    let validOther = true;
    if (addressType === 'other'){
        if (isNotEmpty(otherType)=== false) {
            showError(otherTypeElement, 'Other Address type cannot be blank.');
            validOther = false;
        } else {
            showSuccess(otherTypeElement);
        }
    }
    return validOther;
}
  
function checkAddress(){
    let valid = false;
    let address = addressElement.value.trim();
    if (isNotEmpty(address)=== false) {
        showError(addressElement, 'Address cannot be blank.');
    } else {
        showSuccess(addressElement);
        valid = true;
    }
    return valid;
}

function validateZipcode(){
    let valid = false;
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    let zipCode = zipCodeElement.value.trim();
    if (isNotEmpty(zipCode) == false) {
        showError(zipCodeElement, "Empty zip field");
    } else if (!zipCodePattern.test(zipCode)) {
        showError(zipCodeElement, "Invalid Zip");
    } else{
        valid = true;
        showSuccess(zipCodeElement);
    }
    return valid;
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
function checkUserName(){
    let validName = true;
    let name = nameElement.value;
    
    if (isNotEmpty(name) === false ) {
        validName = false;
        showError(nameElement, "Name cannot be blank");
    }
    var matches = name.match(/\d+/g);
    
    if (matches != null) {
       validName = false;
       showError(nameElement, "Name is invalid");
    } 
    if(validName == true){
        showSuccess(nameElement);
    }
    return validName;
}

const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const isNotEmpty = value => value === '' ? false : true;

function CheckOptions(val){
    var element=document.getElementById('otherType');
    if(val=='other'){
      element.style.display='block';
    } else  {
      element.style.display='none';
      clearErrorMsg(element);
   }
}

function clearErrorMsg(input){
    const formField = input.parentElement;
    // remove the error class
    formField.classList.remove('error');
    //formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}