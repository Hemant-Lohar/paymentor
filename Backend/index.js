import express from 'express'
import Razorpay from 'razorpay'
import { join } from 'path'
import cors from 'cors'

const app = express()

app.use(cors())

const port= 8000;

app.get('/logo.svg', (req, res) => {
    res.sendFile(join(__dirname, './logo.svg'))
})


const razorpay = new Razorpay ({
    key_id:'rzp_test_92sXJEdsMzESab',
    key_secret:'m9Tb4rQIqDg9zlt8wikjCfN0'
})


app.post('/razorpay', async (req, res) => {

    const payment_capture=1
    const amount = 5000
    const currency = 'INR'
    
    const options = {
        amount: (amount * 100).toString(),
        currency, 
        payment_capture,
    }

    
    const response = await razorpay.orders.create(options)
    console.log(response);
    res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
    })

   
    

})

app.get("/", (req, res) => {
    res.send("Hi there !")
})

app.listen(port, ()=>{
    console.log(`Listen on ${port}`);
})









