import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../../services/service.config";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';


function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [myFavorites, setMyFavorites] = useState([]);
  const [ownedMounts, setOwnedMounts] = useState([]);
  const { favoriteId } = useParams();
  const [mountIcons, setMountIcons] = useState({});

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
      const response = await service.get("/user/my-profile");
      console.log(response.data);
      setProfileInfo(response.data);

      if (favoriteId) {
        const favmount = await service.get(`/mounts/${favoriteId}`);
        console.log(favmount.data);
        setMyFavorites(favmount.data);
      }

      // Fetch the user's owned mounts
      const ownedMountsResponse = await service.get("/user/owned-mounts");
      console.log(ownedMountsResponse.data);
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
   
  
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
  
    setIsUploading(true); 
  
    const uploadData = new FormData(); 
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    console.log(uploadData);
    console.log(event.target.files[0]);
  
    try {
      
      const response = await axios.post(`${ import.meta.env.VITE_SERVER_URL}/upload`, uploadData)
  
      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
  
      setIsUploading(false); // to stop the loading animation
    } catch (error) {
console.log(error);
    }
  };

  


  const mappedOwnedMounts = mapMountsToIcons(ownedMounts, mountIcons);

  return (
    <div>
      <h3>{profileInfo.user.username}'s profile</h3>
  
      {imageUrl ? (
        <div>
          <Image
            src={imageUrl}
            alt="Profile Image"
            rounded
            style={{ width: '200px', margin: '0 auto' }}
          />
        </div>
      ) : null}
  
      <div className="favorites">
        <h4>Favorites:</h4>
        <Container>
          <Row>
            {mappedOwnedMounts.map((mount) => (
              <Col key={mount._id} xs={6} md={4}>
                <a href={`/mounts/${mount._id}`}>
                  <Image
                    src={mount.iconUrl}
                    alt={mount.mount}
                    thumbnail
                    style={{  width: '80px',
                    margin: '10px 5px',
                    backgroundColor: 'black',
                    padding: '5px',  }}
                  />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div>
        <form>
          <label>Change profile picture: </label>
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          {isUploading ? <h3>... uploading image</h3> : null}
          <button disabled={isUploading}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
