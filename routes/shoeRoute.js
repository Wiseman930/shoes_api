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
    return {
        homeFunction
    }
}