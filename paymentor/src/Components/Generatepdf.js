import React, { useState, useEffect } from 'react'
import axios from "axios"
import { saveAs } from "file-saver"
import firebase from "../backend/firebase"
import { useAuth } from "../contexts/AuthContext"
import { useCookies } from 'react-cookie'

const Generatepdf = () => {
    const { currentUser } = useAuth()
    const namestr = currentUser &&currentUser.email

    const [newName, setnewName] = React.useState("");
    const [cookies, setCookie] = useCookies(['user']);
      setCookie(cookies.get("Name"))

    const [info, setinfo] = useState({
        name: "",
        receiptid: "",
        fee: 0,
        Class: "",
        dept: "",
        category:""
    })

    console.log(namestr.slice(0,-14));
    console.log(info);
    // const receipt = () =>{
        
    // }

    // useEffect(() => {
  
        
        
        
    //     )

        // setinfo({...info, 
        //     name: currentUser.URN,
        //     receiptid: currentUser.Password,
        //     class: currentUser.Class,
        //     dept: currentUser.department,
        //     category: currentUser.Category,
        //     fee: currentUser.Fee,
        // })
        
    // }, [])

    const generatePdf = () => {
        const ref= firebase.firestore();
        ref.collection("Payment").doc().get()
        .then(snapshot=>
        setinfo({...info, name:snapshot.get("Name"),
                Class: snapshot.get("Class"),
                dept: snapshot.get("department"),
                category: snapshot.get("Category"),
                receiptid: snapshot.get("OrderId"),
                fee: snapshot.get("Amount")})
        )

        // ref.collection("User","Payment").doc(namestr.slice(0,-14)).get()
        // .then(snapshot=>
        // setinfo({...info, name:snapshot.get("Name"),
        //         Class: snapshot.get("Class"),
        //         department: snapshot.get("depertment"),
        //         category: snapshot.get("Category")})
        // )
            
            try {axios.post('/create-pdf', info)
          .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
          .then((res) => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
            saveAs(pdfBlob, 'FeeReceipt.pdf');
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
