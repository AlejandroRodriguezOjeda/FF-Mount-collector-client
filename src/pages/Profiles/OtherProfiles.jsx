import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../../services/service.config";

function OtherProfiles() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [myFavorites, setMyFavorites] = useState([]);
  const [ownedMounts, setOwnedMounts] = useState([]);
  const { favoriteId } = useParams();
  const [mountIcons, setMountIcons] = useState({});
  const { userId } = useParams()

  const [imageUrl, setImageUrl] = useState(null); 
const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    fetchMountIcons(); // Fetch mount icons separately
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/user/${userId}/details`)
      console.log(response.data);
      setProfileInfo(response.data);

      if (favoriteId) {
        const favmount = await service.get(`/mounts/${favoriteId}`);
        console.log(favmount.data);
        setMyFavorites(favmount.data);
      }

      // Fetch the user's owned mounts
      const ownedMountsResponse = await service.get(`/user/${userId}/owned-mounts`);
    setOwnedMounts(ownedMountsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMountIcons = async () => {
    try {
      const iconResponse = await axios.get(
        `https://ffxivcollect.com/api/mounts/`
      );
      console.log(iconResponse.data);
      setMountIcons(iconResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (profileInfo === null) {
    return <h2>...loading</h2>;
  }
/// Function to map your mounts to their corresponding icons
const mapMountsToIcons = (mounts, icons) => {
    // Check if the icons object has a 'results' array
    if (!icons.results || !Array.isArray(icons.results)) {
      return mounts.map((mount) => ({ ...mount, iconUrl: "" })); // Return mounts with no icons
    }
  
    // Create a map of mount IDs to icons for faster lookup
    const iconMap = {};
    icons.results.forEach((icon) => {
      iconMap[icon.id] = icon.icon;
    });
  
    return mounts.map((mount) => {
     
      const iconUrl = iconMap[mount.mount] || "";
      return { ...mount, iconUrl };
    });
  };

  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
  
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
  
    setIsUploading(true); // to start the loading animation
  
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")
  
    try {
    
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/upload`, uploadData)
  
      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
  
      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newItem = {
      image: imageUrl 
    };

    try {
      const response = await service.post("/upload", newItem);

      // Handle the response as needed (e.g., update UI, show success message)
      console.log("Image uploaded successfully:", response.data);
  
      // Clear the image URL and any other form-related state as needed
      setImageUrl("");
      setIsUploading(false);
      

    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };
  
  const mappedOwnedMounts = mapMountsToIcons(ownedMounts, mountIcons);

  return (
    <div>
      <h3>{profileInfo.username}'s profile</h3>

      {imageUrl ? (<div><img src={imageUrl} alt="img" width={200} /></div>) : null}

      <div className="favorites">
        <h4>Favorites:</h4>
        <ul>
          {mappedOwnedMounts.map((mount) => (
            <Link key={mount._id} to={`/mounts/${mount._id}`}>
              <>
                <img src={mount.iconUrl} alt={mount.mount} style={{width: 80, margin: 10}} />
                {/* {mount.mount} */}
              </>
            </Link>
          ))}
        </ul>


</div>
</div>
  );
}

export default OtherProfiles;
