// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import service from "../services/service.config";
// import { useNavigate } from "react-router";

// function MarkAsOwned(){
//     const [owned, setOwned] = useState(null)
//     const {id} = useParams()

//     const navigate = useNavigate()
//     useEffect(() =>{
//         getData()
//     },[])


//     const getData = async() =>{
//         try {
//             const response = await axios.get(`https://ffxivcollect.com/api/mounts/${id}`)
//             setOwned(response.data)
//         } catch (error) {
//             console.log(error);
//         }
//     }



//   const handleAddToOwned = async () => {
//     try {
//         const response = await service.post(`/mounts/mark-as-owned`, {
//             mountId: id,
//           });
//           console.log(response);

//       navigate("/my-profile")
//     } catch (error) {
//       console.log("Error adding to owned:", error);
//     }
//   };

//   return
// }

// export default MarkAsOwned