module.exports = function (shoeService) {

    async function homeFunction(req, res, next){

        await shoeService.allTheStock()
        try {
            let results = await shoeService.returnAll()
            res.json({
                status: 'success',
                data: results
            });

        } catch (err) {
            next(err);
        }
    }

    
    async function addStockFunction(req, res, next){
        try {
            await shoeService.addStock(JSON.parse(JSON.stringify(req.body)))
            res.json({
                status: "success",
            });

        }
        catch (err) {
            next(err);
        }
    }

    async function filterStock(req, res, next){
        try {
            let brand = (req.body.brands)
            let color = (req.body.colors)
            let size = (req.body.size)

        if (brand && !color  && !size){
            await shoeService.filterByBrand(JSON.parse(JSON.stringify(req.body)))
        }
        else if (!brand && color  && !size){
        await shoeService.filterByColor(JSON.parse(JSON.stringify(req.body)))
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