import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Mounts from "./Mounts"





function MountDetails() {

    const [mountDetails, setMountDetails] = useState(null)
    const {id} = useParams()


    useEffect(()=>{
        getMountDetails()
    },[id])



    const getMountDetails =  async () => {
        try {
            const response = await axios.get(`https://ffxivcollect.com/api/mounts/${id}`)
            console.log(response);
            setMountDetails(response.data)
        } catch (error) {
            console.log("I have found an error", error);
        }
    }


    if(mountDetails === null){
        return <h3>...loading</h3>
    }



    return(
        <div>

        <div>
            <h4>{mountDetails.name}</h4>
            <img src={mountDetails.image} alt="" />
            <hr />
            <b>{mountDetails.description}</b> 
            <hr/>
            <span>{mountDetails.enhanced_description}</span>

            <br />

            <b>seats: {mountDetails.seats} Patch: {mountDetails.patch}</b>

            <hr />

            <p>check out how it sounds:</p>

        
            <audio controls   src={mountDetails.bgm}/>



        </div>


        </div>
    )
}


export default MountDetails