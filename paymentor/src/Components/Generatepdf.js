import React, { useState, useEffect } from 'react'
import axios from "axios"
import { saveAs } from "file-saver"
import firebase from "../backend/firebase"
import { useAuth } from "../contexts/AuthContext"
import Add from './Add'
import ReactLoading from 'react-loading';


const Generatepdf = () => {
    const { currentUser } = useAuth()
    const namestr = currentUser &&currentUser.email

    const [name, setname] = useState("")
    const [Class, setClass] = useState("")
    const [dept, setdept] = useState("")
    const [fee, setfee] = useState(0)
    const [category, setcategory] = useState("")
    const [recept, setrecept] = useState("")
    const [loading, setloading] = useState()

    const [info, setinfo] = useState({
        name: "",
        receiptid: "",
        fee: 0,
        Class: "",
        dept: "",
        category:""
    })

    
    const addData =  () => {
        
        const ref= firebase.firestore();
        ref.collection("User").doc(namestr.slice(0,-14)).get()
        .then(snapshot=>{
        {setname(snapshot.get("Name"))}
        {setClass(snapshot.get("Class"))}
        {setdept(snapshot.get("department"))}
        {setcategory(snapshot.get("Category"))}
        }
        )

        ref.collection("Payment").doc(namestr.slice(0,-14)).get()
        .then(snapshot=>{
                {setfee(snapshot.get("Amount"))}
                {setrecept(snapshot.get("OrderId"))}
                }
        )
        
        setinfo(
        {...info, 
                name: name,
                receiptid: recept,
                fee: fee,
                Class: Class,
                dept: dept,
                category:category    
        }
        )
        console.log(info);

        const generatePdf = () => {
            
                    try {axios.post('/create-pdf', info)
                .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
                .then((res) => {
                    const  pdfBlob = new Blob([res.data], { type: 'application/pdf' });
            
                    saveAs(pdfBlob, 'FeeReceipt.pdf');
                })
            } catch (error) {
                console.log(error);
                
            }
    
        }

        if (info.name!="") {
            generatePdf()
            setloading(false)

        }else {
            setloading(true)
        }
        
    }
       

    

//     const generatePdf = () => {


        
//             try { axios.post('/create-pdf', info)
//           .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
//           .then((res) => {
//              const  pdfBlob = new Blob([res.data], { type: 'application/pdf' });
    
//             saveAs(pdfBlob, 'FeeReceipt.pdf');
//           })
//       } catch (error) {
//         console.log(error);
        
//     }
    
// }
    return (
        <>
            {/* setinfo({...info, name: e.target.value}); */}
                                

            <p><input className="btn btn-primary " type="submit" name="submit" value="Receipt" 
                onClick={addData} 
            /></p>

            <div className="div">
            { !loading ? "": (<ReactLoading type={'bubbles'} color={"#193044"} height={100} width={150} />)}
            </div>
            
        </>
    )
}

export default Generatepdf