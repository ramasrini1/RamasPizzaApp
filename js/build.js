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

var total = 0;

let totalElement =  document.querySelector('#total');
const buildForm = document.querySelector('#buildOrderForm');

function getPricingInfo(id){
    var keys;
    var ele = document.getElementById('doughPrice');
    var doughPrice = 0;
    //Clear the drop down menu list
    ele.innerHTML = "";

    doughOptions.forEach(dough => {
        if (dough.id === id){
            //Get the keys
            let item, price, display;
            keys = Object.keys(dough);
            for (let i = 1; i<keys.length; i++){
                console.log(keys[i]);
            }
           
            for (var i = 1; i < keys.length; i++) {
                // POPULATE Drop down menu list
                item = keys[i];
                price = dough[item];
                display = item + " ($" + price + ")";
                ele.innerHTML = ele.innerHTML +
                    //'<option value="' + birds[i]['ID'] + '">' + birds[i]['Bird_Name'] + '</option>';
                    '<option value="' + item + '">' + display + '</option>';
            }
            ele.selectedIndex = 0;
            
        }
    });
}

const btn = document.querySelector('#gridRadios');
var radios = buildForm.elements["gridRadios"];
//var radios = document.forms["formA"].elements["myradio"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        alert(this.value);
    }
}
//let result = document.querySelector('#result');
//document.body.addEventListener('change', function (e) {
btn.addEventListener('change', function (e) {
    let target = e.target;
    getPricingInfo(target.id);
    
    
});

function displayCost(cost) {
    totalElement.textContent = cost;
}