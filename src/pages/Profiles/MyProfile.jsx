import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../../services/service.config";

function Profile() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [myFavorites, setMyFavorites] = useState([]);
  const [ownedMounts, setOwnedMounts] = useState([]);
  const { favoriteId } = useParams();
  const [mountIcons, setMountIcons] = useState({});

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
  
  
  
  const mappedOwnedMounts = mapMountsToIcons(ownedMounts, mountIcons);

  return (
    <div>
      <h3>{profileInfo.user.username}'s profile</h3>

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

export default Profile;
