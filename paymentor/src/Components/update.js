// import React, { useState, useEffect } from 'react'
// import { db } from '../backend/firebase'
// import { collection, addDoc , getDocs } from "firebase/firestore"

// // const Update = () => {

// //     const userCollectionRef = collection(db ,"User");

// //     const [users, setUsers] = useState([]);
// //     const [filterUser, setfilterUser] = useState([]);

// //     useEffect(() => {
        
// //         const getUsers = async () => {
// //             const data = await getDocs(userCollectionRef)
// //             setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.username})))
// //         }

// //         getUsers()
// //     }, [])



    
// function Update(){
//     const [newName, setnewName] = useState();
//     const [newUsername, setnewUsername] = useState();
//     const [newPass, setnewPass] = useState();
//     const [newClass, setnewClass] = useState();
//     const [newDept, setnewDept] = useState();
//     const [newCategory, setnewCategory] = useState();

//     const display = async (val) => {
//         users.filter((val) => {
//             if(val == "") {
//                 alert("Enter Correct Value")
//             } else if(val.toLowecase() == users.map((user) => {user.username})) {
//                 setfilterUser(data.docs.map((doc) => ({...doc.data(), id: doc.username})))
//             }
//         })
// }
    
//     return (
//         <>



//             <div className="container-fluid d-flex justify-content-center align-items-center ">
//                 <div className=" d-flex flex-column justify-content-center align-items-center">
//                 <div className="div">
//                 <label className="me-2" for="username">Username</label>
//                 <input type="text" name="username" id="username" 
//                     onChange={(e) => {
//                         setnewUsername(e.target.value);
//                     }}/>

//                         <input className="btn btn-primary ms-3" type="submit" name="submit" value="Submit" 
//                          onClick={() => {display(newUsername)}}
//                         />
//                 </div>
//                     {/* <div className="div">
//                         <p><label for="username">Username</label></p>
//                         <p><input type="text" name="username" id="username" 
//                             onChange={(e) => {
//                                 setnewUsername(e.target.value);
//                             }}/></p>
//                     </div> */}
                   
//                     <div className="mt-5">
//                         <p><label for="password">Password</label></p>
//                         <p><input type="text" name="password" id="password" 
//                         onChange={(e) => {
//                             setnewPass(e.target.value);
//                         }}/></p>
//                     </div>
//                     <div className="div">
//                         <p><label for="name">Name</label></p>
//                         <p><input type="text" name="name" id="name" 
//                             onChange={(e) => {
//                                 setnewName(e.target.value);
//                             }}/></p>
//                     </div>
//                     <div className="div">
//                         <p><label for="class">Class</label></p>
//                         <p><input type="text" name="class" id="class" 
//                         onChange={(e) => {
//                             setnewClass(e.target.value);
//                         }}/></p>
//                     </div>
//                     <div className="div">
//                         <p><label for="department">Department</label></p>
//                         <p><input type="text" name="department" id="department"
//                         onChange={(e) => {
//                             setnewDept(e.target.value);
//                         }}/></p>
//                     </div>
//                     <div className="div">
//                         <p><label for="category">Category</label></p>
//                         {/* <p><input type="text" name="category" id="category" /></p> */}
//                         <p><select className="px-5 py-1" type="text" id="category" name="category" 
//                         onChange={(e) => {
//                             setnewCategory(e.target.value);
//                         }} 
//                         >
//                             <option type="text" name="category" value="open">Open</option>
//                             <option type="text" name="category" value="obc">OBC</option>
//                             <option type="text" name="category" value="nt">NT</option>
//                             <option type="text" name="category" value="sc">SC</option>
//                             <option type="text" name="category" value="tfws">TFWS</option>
//                             </select></p>
//                     </div>
//                     <div className="div">
//                         <p><input className="btn btn-primary " type="submit" name="submit" value="Update" 
//                         //  onClick={() => {updateUser()}}
//                          /></p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Update;
