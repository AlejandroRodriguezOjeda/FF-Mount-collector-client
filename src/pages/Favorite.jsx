import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router";


function Favorite() {
    const [favoriteInfo , setFavoriteInfo] = useState(null)
    const { favoriteId } = useParams();

    const navigate = useNavigate()

    useEffect(() =>{
        getData()
    },[])



    const getData = async() => {
        try {
            const response = await service.get(`/mounts/${favoriteId}`);
      
            
            setFavoriteInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }



    const handleDelete = async () => {
        try {
          // Make a DELETE request to delete the favorite
          await service.delete(`/mounts/${favoriteId}/delete-fav`);
          // Redirect to a different page after successful deletion
          navigate("/my-profile");
        } catch (error) {
          console.log(error);
        }
      };
    if (favoriteInfo === null) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
          <h2>Favorite Info</h2>
        
          <p>User: {favoriteInfo.username}</p>
          




      {/* Delete Button */}
      <button onClick={handleDelete}>Delete</button>
      <br />
      <button>Edit</button>
        </div>
      );



}


export default Favorite;