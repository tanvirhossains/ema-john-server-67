
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g2gty.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db('emaJohn').collection('product')

        app.get('/product', async (req, res) => {

            console.log('query', req.query)
            const query = {}  // {} it means getting  the all data 

            const size = parseInt(req.query.size)
            const page = parseInt(req.query.page)
            const cursor = productCollection.find(query)
            let products
            if (page || size) {
                //0--> skip: 0 get:0-10(10)
                //1--> skip: 1*10 get:11-20(10)
                //2 --> skip: 2*10 get:21-30
                products = await cursor.skip(page * size).limit(size).toArray()
            }
            else {
                products = await cursor.toArray()  //

            }

            // const product = await cursor.limit(10).toArray()  //limit(10 ) means 10 product will show in the shop browser
            res.send(products)

            app.get('/productscount', async (req, res) => {
                const quer = {}
                const cursor = productCollection.find(quer);
                const count = await cursor.count();
                // res.json(count) //both will work 
                res.send({ count })
            })
        })
    }
    finally {
    }
}
run().catch(console.div)





app.get('/', (req, res) => {
    res.send('running ema john')
})

app.listen(port, () => {
    console.log('Listing to the poort', port)
})