import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import service from "../../services/service.config"


function Profile() {

    const [profileInfo, setProfileInfo] = useState([])
    const [myFavorites, setMyFavorites] = useState([])
    const [whatIown, setWhatIown] = useState([])


useEffect(() =>{
    getData()
},[])


const getData = async() => {
    try {
        const response = await service.get("/my-profile")
        console.log(response.data);
        setProfileInfo(response.data)


        const response2 = await service.get("/my-profile/myfavorite")
    } catch (error) {
        console.log(error);
    }
}




return(
    <div>
        <h3>profile</h3>
    </div>
)

}

export default Profile