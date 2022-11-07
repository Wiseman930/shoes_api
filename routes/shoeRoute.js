module.exports = function shoeRouteFunction(myShoeFunction){

    async function homeFunction(req, res){
        res.render('index')
    }
    
    return {
        homeFunction
    }
}