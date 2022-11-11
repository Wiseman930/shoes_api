module.exports = function shoeRouteFunction(myShoeFunction){

    async function homeFunction(req, res, next){
        await myShoeFunction.allTheStock()
        try {
            res.render('index',{
                allMyStock: await myShoeFunction.returnAllTheStock()
                }
            );
        } catch (err) {
            next(err);
        }
    }
    async function addStockFunction(req, res, next){
        try {
            let brands = Number(req.body.brands)
            let color = Number(req.body.colors)
            let size = Number(req.body.size)
            let price = Number(req.body.prices)
            let quantity = Number(req.body.quantities)

        if (brands != 0 && color != 0 && size != 0 && price != 0 && quantity != 0){
            await myShoeFunction.addStock(JSON.parse(JSON.stringify(req.body)))
            res.redirect("/");
        }
        else if (brands == 0 || color == 0 || size == 0 || price == 0 || quantity == 0){
            //flash error
            res.redirect("/");
        } else {
            res.redirect("/")
        }
        } catch (err) {
            next(err);
        }
    }

    async function filterStock(req, res, next){
        try {
            let brands = (req.body.brands)
            let color = (req.body.colors)
            let size = (req.body.size)
            let stock = JSON.parse(JSON.stringify(req.body));
            let filterBrand = stock.brands || 0

        if (brands && !color  && !size){
            await myShoeFunction.filter(filterBrand)
            res.redirect("/");
        }
        else if (brands == 0 || color == 0 || size == 0){
            //flash error
            res.redirect("/");
        }
         else {
            res.redirect("/")
        }
        } catch (err) {
            next(err);
        }
    }
    return {
        homeFunction,
        addStockFunction,
        filterStock
    }
}