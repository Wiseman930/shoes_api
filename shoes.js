module.exports = function ShoeApi(db){
    let allStock;
    let allmMyStock

    async function addStock(stock){
    let shoeColor =  stock.colors;
    let imageId = shoeColor == 1 ? 1 : shoeColor  == 3 ? 3 : shoeColor == 2 ? 2 : shoeColor == 4 ? 4 : shoeColor == 5 ? 5 : '';

   let countShoes = await db.oneOrNone('SELECT COUNT(*) FROM stock WHERE brand_id=$1 AND color_id=$2 AND size_id=$3 AND price=$4 AND quantity=$5 AND image_id=$6', [stock.brands, stock.colors, stock.size, stock.prices, stock.quantities, imageId]);
   if(countShoes.count == 0){
    await db.oneOrNone(`INSERT INTO stock (brand_id, color_id, size_id, price, quantity, image_id)
        VALUES ($1, $2, $3, $4, $5, $6)`, [stock.brands, stock.colors, stock.size, stock.prices, stock.quantities, imageId]);
        }
    }
    async function allTheStock(brands, colors, size){


        allmMyStock = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock
        INNER JOIN brands ON stock.brand_id = brands.id
        INNER JOIN colors ON stock.color_id = colors.id
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id`)

        if(brands && !colors && !size){
        allStock = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock
        INNER JOIN brands ON stock.brand_id = brands.id
        INNER JOIN colors ON stock.color_id = colors.id
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.brand_id=$1`, [brands])
        }
        if(!brands && colors  && !size){
        allStock = await db.manyOrNone(`SELECT stock.id, brands.brand, colors.color, sizes.size, stock.price, stock.quantity, stockImages.image
        FROM stock
        INNER JOIN brands ON stock.brand_id = brands.id
        INNER JOIN colors ON stock.color_id = colors.id
        INNER JOIN sizes ON stock.size_id = sizes.id
        INNER JOIN stockImages on stock.image_id = stockImages.id WHERE stock.color_id=$1`, [colors])

        }
    }
    async function returnAll(){
        let state;
        if(allStock == undefined){
            state = allmMyStock
        }
        else if (allStock !== undefined){
            state = allStock
        }
        return state
    }

    return {
        addStock,
        allTheStock,
        returnAll,
    }
}

