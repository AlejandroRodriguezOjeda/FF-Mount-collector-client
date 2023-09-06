import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Mounts from "./Mounts"
import service from "../services/service.config"





function MountDetails() {

    const [mountDetails, setMountDetails] = useState(null)
    const {id} = useParams()
    const [addToFavs, setAddToFavs] = useState(true)


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

const handleAddtoFav = async (e) =>{
    e.preventDefault();
    try {
    const response = await service.patch(`/mounts/${id}/fav`)
    console.log(response);
    setMountDetails(response.data)
    } catch (error) {
        console.log("cant add to favs",error);
    }
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

        <div>
            <button>Add to owned:</button>
            <button>Add to planning to get:</button>
            <button onClick={handleAddtoFav}>Create favorite</button>
        </div>


        </div>
    )
}


export default MountDetails