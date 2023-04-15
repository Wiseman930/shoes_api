module.exports = function ShoeApi(db){
    let allStock;
    //let allmMyStock

    async function allTheStock(){
        try{
            let results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
            FROM stock
            INNER JOIN brands ON stock.brand_id = brands.id
            INNER JOIN colors ON stock.color_id = colors.id
            INNER JOIN sizes ON stock.size_id = sizes.id
            INNER JOIN stockImages on stock.image_id = stockImages.id ORDER BY id`)

        return results;
    }catch (err) {
        console.log(err);
      }
    }

    async function addStock(stock){
    let shoeColor =  stock.color_id;
    let imageId_id = shoeColor == 1 ? 1 : shoeColor  == 3 ? 3 : shoeColor == 2 ? 2 : shoeColor == 4 ? 4 : shoeColor == 5 ? 5 : '';

    let countShoes = await db.oneOrNone('SELECT COUNT(*) FROM stock WHERE brand_id=$1 AND color_id=$2 AND size_id=$3 AND price=$4 AND image_id=$5',
    [stock.brand_id, stock.color_id, stock.size_id, stock.price, imageId_id]);

    if(countShoes.count == 0){
        await db.oneOrNone(`INSERT INTO stock (brand_id, color_id, size_id, price, quantity, image_id) VALUES ($1, $2, $3, $4, $5, $6)`,
        [stock.brand_id, stock.color_id, stock.size_id, stock.price, stock.quantity, imageId_id]);
        }
    if(countShoes.count == 1){
        let quantity_id = await db.oneOrNone('SELECT id FROM stock WHERE brand_id=$1 AND color_id=$2 AND size_id=$3 AND price=$4 AND image_id=$5',
        [stock.brand_id, stock.color_id, stock.size_id, stock.price, imageId_id]);
        await db.oneOrNone(`UPDATE stock SET quantity=$1+quantity WHERE id=$2`,
        [stock.quantity, quantity_id.id]);
        }
    }

    async function filterBrand(brand, color, size){
        let results
        try{
            if(brand){
                results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
                FROM stock
                INNER JOIN brands ON stock.brand_id = brands.id
                INNER JOIN colors ON stock.color_id = colors.id
                INNER JOIN sizes ON stock.size_id = sizes.id
                INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id=$1 ORDER BY id`, [brand])
            }
            if(color){
               results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
               FROM stock
               INNER JOIN brands ON stock.brand_id = brands.id
               INNER JOIN colors ON stock.color_id = colors.id
               INNER JOIN sizes ON stock.size_id = sizes.id
               INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.color_id=$1 ORDER BY id`, [color])
            }
            if(size){
               results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
               FROM stock
               INNER JOIN brands ON stock.brand_id = brands.id
               INNER JOIN colors ON stock.color_id = colors.id
               INNER JOIN sizes ON stock.size_id = sizes.id
               INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.size_id=$1 ORDER BY id`, [size])
            }
            if(brand && color){
               results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
               FROM stock
               INNER JOIN brands ON stock.brand_id = brands.id
               INNER JOIN colors ON stock.color_id = colors.id
               INNER JOIN sizes ON stock.size_id = sizes.id
               INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id=$1 AND stock.color_id=$2 ORDER BY id`, [brand, color])
               }
            if(brand && size){
                results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
                FROM stock
                INNER JOIN brands ON stock.brand_id = brands.id
                INNER JOIN colors ON stock.color_id = colors.id
                INNER JOIN sizes ON stock.size_id = sizes.id
                INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id=$1 AND stock.size_id=$2 ORDER BY id`, [brand, size])
            }
            if(color && size){
                results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
                FROM stock
                INNER JOIN brands ON stock.brand_id = brands.id
                INNER JOIN colors ON stock.color_id = colors.id
                INNER JOIN sizes ON stock.size_id = sizes.id
                INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.color_id=$1 AND stock.size_id=$2 ORDER BY id`, [color, size])
            }
            if(brand && color && size){
                results = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
                FROM stock
                INNER JOIN brands ON stock.brand_id = brands.id
                INNER JOIN colors ON stock.color_id = colors.id
                INNER JOIN sizes ON stock.size_id = sizes.id
                INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id=$1 AND stock.color_id=$2 AND stock.size_id=$3 ORDER BY id`, [brand, color, size])
            }

        return results
        }catch (err) {
            console.log(err);
          }
    }

    async function addCart(cart_items){
        let stockId = Number(cart_items.stock_id);
        try{
            if(stockId){

           let results =  await db.manyOrNone(`SELECT id, brand_id, color_id, size_id, price, quantity, image_id
           FROM stock WHERE id=$1`, [stockId])
           let cart_items = results[0]

           let count = await db.oneOrNone(`SELECT COUNT(*) FROM cart WHERE stock_id=$1`, [stockId])
           let stockQuantity = await db.oneOrNone(`SELECT quantity FROM stock WHERE id=$1`, [stockId])
           let cartQuantity = await db.oneOrNone(`SELECT quantity FROM cart WHERE stock_id=$1`, [stockId])


           if(count.count == 0){
            await db.oneOrNone(`INSERT INTO cart (brand, color, size, price, quantity, stock_id, cart_image) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [cart_items.brand_id, cart_items.color_id, cart_items.size_id, cart_items.price, 1, cart_items.id, cart_items.image_id])
           }
           if(count.count == 1 && stockQuantity.quantity > cartQuantity.quantity){
            await db.oneOrNone(`UPDATE cart SET quantity=quantity+1 WHERE stock_id=$1`, [stockId])
           }
        }

        }catch(err){
            console.log(err)
        }
    }

    async function displayCart(){
        try{
            let cartShoes = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, cart.quantity, stockImages.image
            FROM cart
            INNER JOIN stock ON cart.stock_id = stock.id
            INNER JOIN brands ON stock.brand_id = brands.id
            INNER JOIN colors ON stock.color_id = colors.id
            INNER JOIN sizes ON stock.size_id = sizes.id
            INNER JOIN stockImages on stock.image_id = stockImages.id
            ORDER by id`)

            return cartShoes;
        }catch(err){
            console.log(err)
        }
    }
    async function cancelCart(){
        try{
        await db.oneOrNone('DELETE FROM cart')
        }catch(err){
            console.log(err)
        }
    }

    async function checkoutCart(cart){
        try{
        const cartArr = cart.map(object => object.id);
        const quantArr = cart.map(object => object.quantity);

        for(let i = 0; i < cartArr.length; i++){
            await db.oneOrNone(`UPDATE stock SET quantity=quantity-$1 WHERE id=$2`, [quantArr[i], cartArr[i]])
            await db.oneOrNone('DELETE FROM cart')
            await db.oneOrNone('DELETE FROM stock WHERE quantity <=$1', [0])

        }

        }catch(err){
            console.log(err)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }
    }
    return {
        addStock,
        allTheStock,
        filterBrand,
        addCart,
        displayCart,
        cancelCart,
        checkoutCart
    }
}

