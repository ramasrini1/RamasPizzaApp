//const form = document.getElementById('#deliveryForm');
const form = document.querySelector('#deliveryForm');
 // GET THE VALUES FROM THE TEXT BOXES
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


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    let validName    = checkUserName();
    let validEmail   = checkEmail();
    let validZip     = validateZipcode();
    let validAddType = checkAddressType();
    let validOther   = checkOtherType();
    let validAdd     = checkAddress();
    let validState   = checkState();
    let validCity    = checkCity();
    let validPhone   = validatePhone();
    let validForm = validName && validEmail && validZip && validAddType
                    && validOther && validAdd && validState && validCity
                    && validPhone;
    if (validForm){
        //Save form data in local storage
        saveFormData();
        //show the build order form
        window.open("BuildOrder.html", "Select Your Pizza", "width=850,height=850"); 
    }
    
});

//Save form data in local storage
function saveFormData(){
    localStorage.setItem("name",        nameElement.value.trim() );
    localStorage.setItem("email",       emailElement.value.trim() );
    localStorage.setItem("address",     addressElement.value.trim() );
    localStorage.setItem("addressType", addressTypeElement.value.trim() );
    localStorage.setItem("otherType",   otherTypeElement.value.trim() );
    localStorage.setItem("city",        cityElement.value.trim() );
    localStorage.setItem("state",       stateElement.value.trim() );
    localStorage.setItem("zip",         zipCodeElement.value.trim() );
    localStorage.setItem("phone",       phoneElement.value.trim() );
    if (appartmentElement.value == ""){
        localStorage.setItem("appartment",   "" );
    } else{
        localStorage.setItem("appartment",   appartmentElement.value.trim() );
    }
}

// Validates phone The following formats returns true
//validate('1234567890')     // true
//validate(1234567890)       // true
//validate('(078)789-8908')  // true
//validate('123-345-3456')   // true
function validatePhone() {
    let phone = phoneElement.value.trim();
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneField = true;
    var validFormat = true;
    //alert("Phone is " + phone);
    //validPhone = regex.test(phone);
    if (isNotEmpty(phone) === false ) {
        showError(phoneElement, "Phone cannot be blank");
        phoneField = false;
    }
    if (phoneField !== false) {
        //check if formatting of phone field is valid
        validFormat = regex.test(phone);
        if (!validFormat){
            showError(phoneElement, 'Invalid Format: Enter 10 digit number');
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