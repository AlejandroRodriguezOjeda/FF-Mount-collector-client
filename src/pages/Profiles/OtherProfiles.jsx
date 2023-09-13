import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../../services/service.config";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

function OtherProfiles() {
  const [profileInfo, setProfileInfo] = useState(null);
  const [myFavorites, setMyFavorites] = useState([]);
  const [ownedMounts, setOwnedMounts] = useState([]);
  const { favoriteId } = useParams();
  const [mountIcons, setMountIcons] = useState({});
  const { userId } = useParams();

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
      const response = await service.get(`/user/${userId}/details`);
      console.log(response.data);
      setProfileInfo(response.data);

      if (favoriteId) {
        const favmount = await service.get(`/mounts/${favoriteId}`);
        console.log(favmount.data);
        setMyFavorites(favmount.data);
      }

      // Fetch the user's owned mounts
      const ownedMountsResponse = await service.get(
        `/user/${userId}/owned-mounts`
      );
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
      <h3>{profileInfo.username}'s profile</h3>

      {imageUrl ? (
        <div>
          <Image
            src={imageUrl}
            alt="Profile Image"
            rounded
            style={{ width: "200px", margin: "0 auto" }}
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
                    style={{
                      width: "80px",
                      margin: "10px 5px",
                      backgroundColor: "black",
                      padding: "5px",
                    }}
                  />
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default OtherProfiles;
