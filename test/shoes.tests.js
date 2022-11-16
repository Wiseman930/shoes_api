const assert = require('assert');
const myShoes = require('../shoes');
const pgp = require('pg-promise')();


const DATABASE_URL =   process.env.DATABASE_URL || "postgresql://postgres:pg1999@localhost:5432/test";
const config = {
    connectionString: DATABASE_URL
}
const db = pgp(config);

describe('Greetings function', function(){

    beforeEach(async function(){
    await db.none("delete from stock")
    });

it("a new shoe brand should be added into my stock", async function(){
    let shoes = myShoes(db);
    await shoes.allTheStock()
   /* await shoes.addStock({
        brands: '1',
        colors: '5',
        size: '3',
        prices: '300',
        quantities: '25',
        fontSizeControl: 'Update'
      }
      )
    assert.deepEqual([
        {
          id: 27,
          brand: 'tago',
          color: 'white',
          size: '7',
          price: 300,
          quantity: 25,
          image: 'https://github.com/Wiseman930/shoes_api/blob/master/images/white.jpg?raw=true'
        }
      ],
      await shoes.returnAllTheStock());*/

});


})
