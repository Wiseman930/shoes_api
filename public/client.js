//reference buttons
const updateStockButton = document.querySelector(".update_stock")
const filterButton = document.querySelector(".filter_button")
const addCartButton = document.querySelector(".add_cart")

//reference filter stock dropdowns
const brand2Dropdown = document.getElementById("brands2")
const color2Dropdown = document.getElementById("color2")
const size2Dropdown = document.getElementById("size2")

//reference add stock dropdowns
const brandDropdown = document.getElementById("brands")
const colorDropdown = document.getElementById("color")
const sizeDropdown = document.getElementById("size")

//reference add stock textbox
const addingPrice = document.querySelector(".addPrice")
const addingQuantity = document.querySelector(".addQuantity")


//display stock of shoes
let shoesElem = document.querySelector('.shoes');
let shoesTemplateText = document.querySelector('.shoesTemplate');
let theShoesTemplate = Handlebars.compile(shoesTemplateText.innerText);

//Display cart items
const cartElem = document.querySelector('.carting')
let cartTemplate = document.querySelector('.cartTemplate')
let theCartTemplate = Handlebars.compile(cartTemplate.innerText)

//cancel button
let cancelButton = document.querySelector('.cancel_stock')

//checkout items
let checkoutButton = document.querySelector('.checkout_stock')


//axios.defaults.baseURL = 'http://localhost:3018';
// STOCK DATA
axios
.get("/")
.then(result => {
    let shoes = result.data;
    let shoeData = shoes.data;
    shoesElem.innerHTML = theShoesTemplate({
       shoeData
    });
});

function allShoes(){
axios
.get("/")
.then(result => {
    let shoes = result.data;
    let shoeData = shoes.data;
    shoesElem.innerHTML = theShoesTemplate({
       shoeData
    });
});

}

//CART DATA
axios
.get("/api/shoes/getcart")
.then(result => {
    let cart = result.data;
    let cartData = cart.data;
    cartElem.innerHTML = theCartTemplate({
       cartData
    });
});

function allCart(){
    axios
    .get("/api/shoes/getcart")
    .then(result => {

        let cart = result.data;
        let cartData = cart.data;
        cartElem.innerHTML = theCartTemplate({
           cartData
        });
    });
}


updateStockButton.addEventListener("click", function(){

const brand = brandDropdown.value;
const color = colorDropdown.value;
const size = sizeDropdown.value;
const price = addingPrice.value;
const quantity = addingQuantity.value;
if(brand && color && size && price && quantity){

axios
.post("/api/shoes",{
    brand_id: brand,
    color_id: color,
    size_id: size,
    price: price,
    quantity: quantity
  })
.then(result => {
    allShoes();
  });
}

})

filterButton.addEventListener("click", function(){

const brand = Number(brand2Dropdown.value);
const color = Number(color2Dropdown.value);
const size = Number(size2Dropdown.value);
const price = Number(addingPrice.value);
const quantity = Number(addingQuantity.value);

    if(brand && !color && !size){
    axios
    .get(`/api/shoes/brand/${brand}`)
    .then(result => {
        let shoes = result.data;
        let shoeData = shoes.data;
        shoesElem.innerHTML = theShoesTemplate({
        shoeData
        });
    });
    }
    if(color && !brand && !size){
        axios
        .get(`/api/shoes/color/${color}`)
        .then(result => {
            let shoes = result.data;
            let shoeData = shoes.data;
            shoesElem.innerHTML = theShoesTemplate({
            shoeData
            });
    });
    }
    if(size && !color && !brand){
        axios
        .get(`/api/shoes/size/${size}`)
        .then(result => {
            let shoes = result.data;
            let shoeData = shoes.data;
            shoesElem.innerHTML = theShoesTemplate({
            shoeData
            });
    });
    }

    if(brand && color && !size){
        axios
        .get(`/api/shoes/brand/${brand}/color/${color}`)
        .then(result => {
            let shoes = result.data;
            let shoeData = shoes.data;
            shoesElem.innerHTML = theShoesTemplate({
            shoeData
            });
    });
    }

    if(brand && size && !color){
        axios
        .get(`/api/shoes/brand/${brand}/color/${size}`)
        .then(result => {
            let shoes = result.data;
            let shoeData = shoes.data;
            shoesElem.innerHTML = theShoesTemplate({
            shoeData
            });
    });
    }

    if(color && size && !brand){
        axios
        .get(`/api/shoes/color/${color}/size/${size}`)
        .then(result => {
            let shoes = result.data;
            let shoeData = shoes.data;
            shoesElem.innerHTML = theShoesTemplate({
            shoeData
            });
    });
    }
    if(color && size && brand){
        axios
        .get(`/api/shoes/brand/${brand}/color/${color}/size/${size}`)
        .then(result => {
            let shoes = result.data;
            let shoeData = shoes.data;
            shoesElem.innerHTML = theShoesTemplate({
            shoeData
            });
    });
    }

})


$('.shoes').on('click', '.add_cart', function (e) {
let stockId = e.target.id;

    axios
    .post("/api/shoes/cart",{
        stock_id: stockId
    })
    .then(result => {
        allShoes()
        allCart()
    });
});

cancelButton.addEventListener("click", function(e){
    let cancel = e.target.value
    axios
    .post("/api/shoes/cancelcart", {
        cancel: cancel
    })
    .then(result => {
        allShoes()
        allCart()
    });
})

checkoutButton.addEventListener("click", function(e){
    let checkout = e.target.value
    axios
    .post("api/shoes/checkout", {
        checkout: checkout,
    })
    .then(result => {
        allShoes()
        allCart()
    });
})








