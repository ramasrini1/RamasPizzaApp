var doughOptions = [
    {
        "id": "handTossed",
        "Small": "9.99",
        "Medium": "12.99",
        "Large":  "14.99"
    },
    {
        "id": "thinCrust",
        "Medium": "12.99",
        "Large":  "14.99"
    },
    {
        "id": "nystyle",
        "Large":  "14.99",
        "Extra Large": "19.99"
    },
    {
        "id": "glutenFree",
        "Small": "10.99"
    },
];

var doughSelected = false;
var sizeSelected = false;
var errorMsg = "First select your dough and pizza size."

let map = new Map();
let cheeseMap = new Map();
let sauceMap = new Map();
initMaps();

//Get Dom Elements
let totalElement =  document.querySelector('#total');
let detailElement = document.querySelector("#detail");
const buildForm = document.querySelector('#buildOrderForm');
const btn = document.querySelector('#gridRadios');
var radios = buildForm.elements["gridRadios"];
let doughPriceElement = document.querySelector('#doughPrice');
let cheesePriceElement = document.querySelector('#cheeseQty');
let saucePriceElement = document.querySelector('#sauce');
let toppingsElement = document.querySelector('#toppingsId');

initLists();

//Handle click event for radio buttons
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        let item = this.id;
        initLists();
        populateDoughList(item);
        updateCost();
    }
}

//Add Event Listener to dough price List
doughPriceElement.addEventListener('change', function() {
    var myId = this[this.selectedIndex].id; //ex handTossed
    var x = doughOptions.find(x => x.id === myId);
    var item = this.value; //ex Small
    var cost = x[item];
    //alert("cost is " + x + " item " + item + "cost " + cost);
    var doughLabel = map.get(myId); //ex Hand Tossed
    //totalCost = totalCost + cost;
    cost = Number(cost);
    doughCost = cost;
    //updateCost(doughLabel, this.value, cost );
    updateCost();
    //Enable other options after the doughoptions is selected
    doughSelected = true;
    //Added this to fix 
    

}, false);

//Add Event Listener to cheese selection drop list
cheesePriceElement.addEventListener('change', function() {
    var myid = this[this.selectedIndex].id;
    var item = this.value;
    if (doughSelected === false){
        alert(errorMsg);
        cheesePriceElement.options[0].selected = true;
        updateCost();
    } else{
        let cost = cheeseMap.get(myid);
        cost = Number(cost);
        //alert("cost is " + cost);
        cheeseCost = cost;
        updateCost();
    } 
  }, false);
  
//Add Event Listener to sauce selection drop list
saucePriceElement.addEventListener('change', function() {
    var myid = this[this.selectedIndex].id;
    var item = this.value;
    if (doughSelected === false){
        alert(errorMsg);
        saucePriceElement.options[0].selected = true;
    } else{
        let cost = sauceMap.get(myid);
        cost = Number(cost);
        sauceCost = cost;
        updateCost();
    }
    
  }, false);

//Add Event Listener to toppings selection drop list
//document.multiselect('#toppingsId').setCheckBoxClick(value, handler);
  $('#toppingsId').change(function() {
    //get values
    if (doughSelected === false ){
        alert(errorMsg);
        //alert("my message");
        //window.console.log("should deselect the toppings list");
        updateCost();
        
    } else{
        var toppingsList = $('#toppingsId').val();
        //console.log(toppingsList);
        let numItems = toppingsList.length;
        toppingsCost = numItems * 0.99
        updateCost();
    }
});

buildForm.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
    if (doughSelected ){
        var submitForm = confirm("Do you want to proceed to billing");
        if (submitForm){
            window.open("Billing.html", "Billing Page", "width=850,height=850");
        }
    } else{
        alert("Unable to build the pizza!.\nFirst select your dough and pizza size. ")
    }
    
});

function updateCost(){
    var topCost = getToppingsCostFromList();
    //topCost = Number.parseFloat(topCost);
    totalCost = doughCost + sauceCost + topCost + cheeseCost;
    totalCost = Number.parseFloat(totalCost).toPrecision(4);
    totalElement.textContent  = "Total Cost: $" + totalCost;
}

function populateDoughList(id){
    let counter = -1;
    var keys;
    var ele = document.getElementById('doughPrice');
    var doughPrice = 0;
    //Clear the drop down menu list
    ele.innerHTML = "";
    doughOptions.forEach(dough => {
        if (dough.id === id){
            //Get the keys
            counter++;
            let optionVar = '<option value="';

            let item, price, display;
            keys = Object.keys(dough);
            for (let i = 1; i<keys.length; i++){
                console.log(keys[i]);
            }
            //Populate the 1st item which is disabled
            ele.innerHTML = ele.innerHTML +
                            '<option value="select" disabled>Select Pizza Size</option>';
            
            for (var i = 1; i < keys.length; i++) {
                // POPULATE Drop down menu list
                item = keys[i];
                price = dough[item];
                display = item + " ($" + price + ")";
                ele.innerHTML = ele.innerHTML +
                    '<option value="' + item + '"' + ' id="' + id + '">' + display + '</option>';
            }
            ele.selectedIndex = 0;           
        }
    });
}

function initMaps(){
    map.set('handTossed', 'Hand Tossed');   
    map.set('thinCrust', 'Thin Crust');     
    map.set('nystyle', 'New York Style'); 
    map.set('glutenFree', 'Gluten Free');

    cheeseMap.set('Light', 0);
    cheeseMap.set('Normal', 0);
    cheeseMap.set('Extra', 2.99);
    cheeseMap.set('Double', 3.99);

    sauceMap.set('regularTomato', 0);
    sauceMap.set('heartyTomato', 0.99);
    sauceMap.set('bbqSauce', 1.99);
}

function initLists(){
    totalCost = 0;
    doughCost = 0;
    cheeseCost = 0;
    toppingsCost = 0;
    sauceCost = 0;
    cheesePriceElement.options[0].selected = true;
    saucePriceElement.options[0].selected = true;
    doughSelected = false;
    //initilizeToppings()
    updateCost();
}

 function initilizeToppings(){
     //alert("init toppings");
    $('#toppingsId').multiselect({
        columns: 1,
        placeholder: 'Select Toppings'
        });
 }
 

 function getToppingsCostFromList(){
    var toppingsList = $('#toppingsId').val();
    console.log(toppingsList);
    let numItems = toppingsList.length;
    var tcost = numItems * 0.99;
    return tcost;
}