module.exports = function(shoeService) {

    async function homeFunction(req, res, next){
        try {
            let results = await shoeService.allTheStock()
            res.json({
                status: 'success',
                data: results
            });

        } catch (err) {
            next(err);

        }
    }

    async function addingStock(req, res, next){
        try{
            let stock = req.body;
            await shoeService.addStock(stock)
            res.json({
                status: 'success',
            })
        }catch(err){
            res.json({
                status: "error",
                error: err.stack
            });
        }
    }

    async function addToCart(req, res, next){
        try{
            let cart = req.body;
            await shoeService.addCart(cart)
            res.json({
                status: 'success',
            })
        }
        catch (err) {
            next(err);
        }
    }

    async function getCart(req, res, next){
        try{
           let results = await shoeService.displayCart();
           res.json({
            status: 'success',
            data: results
        });
        }
        catch (err) {
            next(err);
        }
    }

    async function filteredBrand (req, res, next){
    try{
        let brand = req.params.brand;
        let color = req.params.color;
        let size = req.params.size;

        let results = await shoeService.filterBrand(brand, color, size)
        res.json({
            status: 'success',
            data: results
        })

    }
        catch (err) {
            next(err);
        }
    }
    async function cancelMyCart(req, res, next){
        try{
            let cancel = req.body.cancel;
            if(cancel){
                await shoeService.cancelCart()
            }
            res.json({
                status: 'success',
            })

        }
            catch (err) {
                next(err);
            }
    }

    async function checkoutMyCart(req, res, next){
        try{
            let checkout = req.body.checkout;
            let cartData = await shoeService.displayCart()

            if(checkout){
                await shoeService.checkoutCart(cartData)
            }
            res.json({
                status: 'success',
            })

        }
            catch (err) {
                next(err);
            }
    }

    /*try{

    }
    catch (err) {
        next(err);
    }*/

    return {
        homeFunction,
        filteredBrand,
        addingStock,
        addToCart,
        getCart,
        cancelMyCart,
        checkoutMyCart
    }
}