
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
            const query = {}  // {} it means getting  the all data 
            const cursor = productCollection.find(query)
            const product = await cursor.toArray()  //
            // const product = await cursor.limit(10).toArray()  //limit(10 ) means 10 product will show in the shop browser
            res.send(product)

            app.get('/product/count', async (req, res) => {
                const quer = {}
                const cursor = productCollection.find(quer);
                const count= await cursor.count();
                // res.json(count) //both will work 
                res.send({count})
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