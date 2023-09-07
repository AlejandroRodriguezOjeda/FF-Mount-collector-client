import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router";


function Favorite() {
    const [favoriteInfo , setFavoriteInfo] = useState(null)
    const { favoriteId } = useParams();


    useEffect(() =>{
        getData()
    },[])



    const getData = async() => {
        try {
            const response = await axios.get(`/mounts/${favoriteId}`);
      
            
            setFavoriteInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    if (favoriteInfo === null) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
          <h2>Favorite Info</h2>
          {/* <p>Favorite ID: {favoriteInfo._id}</p> */}
          <p>User: {favoriteInfo.user.username}</p>
          
        </div>
      );



}


export default Favorite;