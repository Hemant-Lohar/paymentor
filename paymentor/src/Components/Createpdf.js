import React, { useState } from 'react'
import axios from "axios"
import { saveAs } from "file-saver"

const Createpdf = () => {

    const [Name, setName] = useState()
    const [receipt, setreceipt] = useState()
    const [price1, setprice1] = useState()
    const [price2, setprice2] = useState()
    const [info, setinfo] = useState({
        name: "",
        price1: 0,
        price2: 0,
        receiptid: 0
    })





    const generatePdf = () => {
        try {axios.post('/create-pdf', info)
          .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
            saveAs(pdfBlob, 'newPdf.pdf');
          })
      } catch (error) {
        console.log(error);
    }
    
}
   

    
    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className="div">
                            <p><label for="username">Username</label></p>
                            <p><input type="text" name="name" id="username"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}/></p>
                </div>
                <div className="div">
                            <p><label for="receiptid">rid</label></p>
                            <p><input type="number" name="receiptid" id="username"
                                onChange={(e) => {
                                    setreceipt(e.target.value);
                                }}/></p>
                </div>
                <div className="div">
                            <p><label for="price1">p1</label></p>
                            <p><input type="number" name="price1" id="username"
                                onChange={(e) => {
                                    setinfo.price1(e.target.value);
                                }}/></p>
                </div>
                <div className="div">
                            <p><label for="price2">p2</label></p>
                            <p><input type="number" name="price2" id="username"
                                onChange={(e) => {
                                    setinfo.price2(e.target.value);
                                }}/></p>
                </div>
                           {/* <button className="btn btn-primary px-4 py-2" 
                           onClick={createAndDownloadPdf} >Create</button> */}

                    <p><input className="btn btn-primary " type="submit" name="submit" value="Create" 
                        onClick={generatePdf} 
                        /></p>
            </div>
        </>
    )
}

export default Createpdf
