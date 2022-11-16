module.exports = function shoeRouteFunction(myShoeFunction){

    async function homeFunction(req, res, next){

        await myShoeFunction.allTheStock()

        try {
            res.render('index',{
                allMyStock: await myShoeFunction.returnAll()
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
            let update = req.body.fontSizeControl;


        if (brands != 0 && color != 0 && size != 0 && price != 0 && quantity != 0 && update){
            await myShoeFunction.addStock(JSON.parse(JSON.stringify(req.body)))
            res.redirect("/");
        }
        else if (brands == 0 || color == 0 || size == 0 || price == 0 || quantity == 0 && update){
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
        let brands2 = Number(req.body.brands2)
        let color2 = Number(req.body.colors2)
        let size2 = Number(req.body.size2)
        let filter = req.body.fontSizeControl1;

        if (filter){
            await myShoeFunction.allTheStock(brands2, color2, size2)
            // res.redirect("/");
        }
         if (brands2 == 0 || color2 == 0 || size2 == 0){
            res.redirect("/");
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