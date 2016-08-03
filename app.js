var apple = new Fruit('Apple', 2);
var orange = new Fruit('Orange', 2);
var pears = new Fruit('Pears', 2);
var banana = new Fruit('Bananas', 2);

// object constrcutor
var customer = {
    totalCash: 100,
    totalApple: 0,
    totalBananas: 0,
    totalPears: 0,
    totalOrange: 0
};




var fruitArray = [apple, orange, pears, banana];



$(document).ready(function() {

    setInterval(function() {
        changePrice();
    }, 10000);

    function changePrice() {
        // console.log("");
        fruitArray.forEach(function(fruit) {
            // console.log("changed", fruit.name);
            var randomInterval = randomNumber(0, 50);
            randomInterval = randomInterval / 100;
            var flip = randomNumber(0, 1);
            // console.log(flip);
            if (flip === 0) {
                fruit.price += randomInterval;
                fruit.price = Math.round(fruit.price * 100) / 100;
                // console.log(fruit.price);

                if (fruit.price > 9.99) {
                    fruit.price = 9.99;
                }
                $('.' + fruit.name + "Price").text(fruit.price);
            }
            if (flip == 1) {
                fruit.price -= randomInterval;
                fruit.price = Math.round(fruit.price * 100) / 100;
                if (fruit.price <= .5) {
                    fruit.price = .5;
                }
                // console.log(fruit.price);
                $('.' + fruit.name + "Price").text(fruit.price);
            }
        });

    };


    $('#totalCash').text(customer.totalCash);

    $('button').click(function() {

        var button = this.id;
        switch (this.id) {
            case "buyApple":
                buyFruit(apple);
                break;
            case "buyOrange":
                buyFruit(orange);
                break;
            case "buyPear":
                buyFruit(pears);
                break;
            case "buyBanana":
                buyFruit(banana);
                break;
            case "sellApple":
                sellFruit(apple);
                break;
            case "sellOrange":
                sellFruit(orange);
                break;
            case "sellPear":
                sellFruit(pears);
                break;
            case "sellBanana":
                sellFruit(banana);
                break;
        }

    });


});


//==========================================================
//                    functions
// =========================================================


function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

// object consrtuctor for fruits
function Fruit(name, price) {
    this.name = name;
    this.price = price;
    // this.img = this.name + ".png";
    this.average = [];
}

function buyFruit(fruit) {
  if (customer.totalCash > fruit.price) {
    customer["total" + fruit.name]++;
    customer.totalCash -= fruit.price;
    // calc avg fruit price
    fruit.average.push(fruit.price);
    $('.avg' + fruit.name).text(Math.round(calcAvg(fruit.average) *100) /100);
    $("#totalCash").text(Math.round(customer.totalCash * 100) / 100);
    $('#total' + fruit.name).text(customer["total" + fruit.name]);
}
};

function sellFruit(fruit) {
    if (customer["total" + fruit.name] > 0) {
        customer["total" + fruit.name]--;
        customer.totalCash += fruit.price;
        $("#totalCash").text(Math.round(customer.totalCash * 100) / 100);
        $('#total' + fruit.name).text(customer["total" + fruit.name]);
    }
};

function calcAvg(average) {
    var total = 0;
    average.forEach(function(price) {
        total += price;
    });
    return total / average.length;
};

// avg $ per friut
