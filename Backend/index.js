const express = require('express')
const Razorpay = require('razorpay')
const  path = require('path')
const shortid = require('shortid')
const cors = require('cors')
const bodyParser = require('body-parser')

const pdf = require('html-pdf')
const pdfTemplate = require('./document');
const { info } = require('console')
// const  db = require ('firebase')
// const collection = ("firebase/firestore")
// var firebase = require("firebase");
// firebase.initializeApp({
//   databaseURL: "httpss://addyourfirebasedatabaseurl.firebaseio.com/"
// });
// var dbRef = firebase.database().ref("User");
// console.log(dbRef);

// const [userDetails, setUserDetails] = useState('')
// const userCollectionRef = collection(db ,"User");
// const cityRef = userCollectionRef.doc('19131087');
// const doc =  cityRef.get();
// if (!doc.exists) {
// console.log('No such document!');
// } else {
// console.log('Document data:', doc.data());
// }

// collection(db, "User").doc("19131087").get().then(doc => {
//     console.log(doc.data);
// })

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const razorpay = new Razorpay ({
    key_id:'rzp_test_92sXJEdsMzESab',
    key_secret:'m9Tb4rQIqDg9zlt8wikjCfN0'
})

const port= 8000;

app.get('/logo.svg', (req, res) => {
    res.sendFile(path.join(__dirname, './paymentor.svg'))
})


app.post('/razorpay', async (req, res) => {
    const payment_capture=1
    const amt = req.body.amt
    const curr = 'INR'
    console.log(amt);
    
    const options = {
        amount: amt * 100,
        currency: curr,
        receipt: shortid.generate(), 
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

// app.get('/razorpay', async(req, res) => {
//         console.log(res);
// })


// ----------Pdf Create-------


//post
app.post('/create-pdf', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    });
});

//get

app.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})



app.get("/", (req, res) => {
    res.send("Hi there !")
})

app.listen(port, ()=>{
    console.log(`Listen on ${port}`);
})









