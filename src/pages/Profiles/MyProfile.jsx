import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import service from "../../services/service.config"


function Profile() {

    const [profileInfo, setProfileInfo] = useState(null)
    const [myFavorites, setMyFavorites] = useState([])
    const [ownedMounts, setOwnedMounts] = useState([]);
    const { favoriteId } = useParams();

useEffect(() =>{
    getData()
},[])


const getData = async() => {
    try {
        const response = await service.get("/user/my-profile")
        console.log(response.data);
        setProfileInfo(response.data)


        // const favoriteResponse = await service.get(`/mounts/${favoriteId}`); 
        // const favoriteId = favoriteResponse.data._id;




        const favmount = await service.get(`/mounts/${favoriteId}`)
        console.log(favmount.data);
        setMyFavorites(favmount.data)

  // Fetch the user's owned mounts
  const ownedMountsResponse = await service.get("/user/owned-mounts");
  console.log(ownedMountsResponse.data);
  setOwnedMounts(ownedMountsResponse.data);


    } catch (error) {
        console.log(error);
    }
}

if(profileInfo === null ){
    return <h2>...loading</h2>
}


return(
    <div>
        <h3>{profileInfo.user.username}'s profile</h3>



<div>
    <h3>mounts {profileInfo.user.username} owns:
    <ul>
          {ownedMounts.map((mount) => (
            <li key={mount._id}>{mount.name}</li>
          ))}
        </ul>
    </h3>
</div>   
<div>

<h4>Favorites:</h4>
<ul>
       
        </ul>

</div>
 </div>
)

}

export default Profile