import React, { useState, useEffect } from 'react'
import axios from "axios"
import { saveAs } from "file-saver"
import firebase from "../backend/firebase"
import { useAuth } from "../contexts/AuthContext"

const Generatepdf = () => {
    const { currentUser } = useAuth()
    const namestr = currentUser &&currentUser.email

    const [info, setinfo] = useState({
        name: "",
        receiptid: 0,
        fee: 0,
        // class: 0,
        // dept: "",
        // category:""
    })

    console.log(namestr.slice(0,-14));
    console.log(info);
    // const receipt = () =>{
        
    // }

    useEffect(() => {
  
            const ref= firebase.firestore();
            ref.collection("Payment").doc(namestr.slice(0,-14)).get()
            .then(snapshot=>
            setinfo({...info, name: snapshot.get("URN"),
                    receiptid: snapshot.get("orderId"),
                    // class: snapshot.get("Class"),
                    // dept: snapshot.get("depertment"),
                    // category: snapshot.get("Category"),
                    fee: snapshot.get("Amount")})
        
        
        )

        // setinfo({...info, 
        //     name: currentUser.URN,
        //     receiptid: currentUser.Password,
        //     class: currentUser.Class,
        //     dept: currentUser.department,
        //     category: currentUser.Category,
        //     fee: currentUser.Fee,
        // })
        
    }, [])

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
    console.log(info);
    
}
    return (
        <>
            {/* setinfo({...info, name: e.target.value}); */}
                                

            <p><input className="btn btn-primary " type="submit" name="submit" value="Receipt" 
                onClick={generatePdf} 
            /></p>
            
        </>
    )
}

export default Generatepdf
