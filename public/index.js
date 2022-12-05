const shoesTemplateText = document.querySelector('.shoesTemplate');
const theShoesTemplate = Handlebars.compile(shoesTemplateText.innerText);

const carsTemplateText = document.querySelector('.carsTemplate');
const theCarsTemplate = Handlebars.compile(carsTemplateText.innerText);

const carsElem = document.querySelector('.cars');



//class to display
let stockElem = document.querySelector('.stock')
stockElem.innerHTML = '55'

axios
.get("https://api-tutor.herokuapp.com/v1/cars")
.then(result => {
    const cars = result.data

    carsElem.innerHTML = theCarsTemplate({
        cars
    });
});

/*axios
.get("https://api-tutor.herokuapp.com/v1/cars")
.then(result => {
    const shoes = result.data;

    stockElem.innerHTML = theShoesTemplate({
        shoes
    });
});*/

