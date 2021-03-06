import React, { useState } from 'react'
import axios from "axios"
import { saveAs } from "file-saver"

const Createpdf = () => {

    
    const [info, setinfo] = useState({
        name: "",
        receiptid: 0,
        price1: 0,
        price2: 0
    })

console.log(info);



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
                                    setinfo({...info, name: e.target.value});
                                }}/></p>
                </div>
                <div className="div">
                            <p><label for="receiptid">rid</label></p>
                            <p><input type="number" name="receiptid" id="username"
                                onChange={(e) => {
                                    setinfo({...info, receiptid: e.target.value});
                                }}/></p>
                </div>
                <div className="div">
                            <p><label for="price1">p1</label></p>
                            <p><input type="number" name="price1" id="username"
                                onChange={(e) => {
                                    setinfo({...info, price1: e.target.value});
                                }}/></p>
                </div>
                <div className="div">
                            <p><label for="price2">p2</label></p>
                            <p><input type="number" name="price2" id="username"
                                onChange={(e) => {
                                    setinfo({...info, price2: e.target.value});
                                }}/></p>
                </div>
                          

                    <p><input className="btn btn-primary " type="submit" name="submit" value="Create" 
                        onClick={generatePdf} 
                        /></p>
            </div>
        </>
    )
}

export default Createpdf
