import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router";

function Favorite() {
  const [favoriteInfo, setFavoriteInfo] = useState(null);
  const { favoriteId } = useParams();
  const [editingComment, setEditingComment] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const navigate = useNavigate();
  const [mountIcons, setMountIcons] = useState([]);
  // Define a state variable to store the API response
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    getData();
    fetchMountIcons();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/mounts/${favoriteId}`);
      setFavoriteInfo(response.data);
      setUpdatedComment(response.data.mount.commentbox);
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
      // Store the API response in the state variable
      setApiResponse(iconResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/mounts/${favoriteId}/delete-fav`);
      navigate("/my-profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = () => {
    setEditingComment(true);
  };

  const handleSaveComment = async () => {
    try {
      await service.put(`/mounts/${favoriteId}/update`, {
        commentbox: updatedComment,
      });
  
      // After successfully saving the comment, fetch the updated data
      await getData(); // Refetch the data
      setEditingComment(false); // Disable editing mode
    } catch (error) {
      console.log(error);
    }
  };

  if (favoriteInfo === null || apiResponse === null) {
    return <h2>Loading...</h2>;
  }

  const mountFromDatabase = favoriteInfo.mount.mount;
  const matchedMount = apiResponse.results.find(
    (mount) => mount.id.toString() === mountFromDatabase
  );

  if (matchedMount) {
    const mountImageUrl = matchedMount.image;
    return (
      <div>
        <h2>Favorite Info</h2>
        <h1>Mount: {matchedMount.name}</h1>
        <img src={mountImageUrl} alt={favoriteInfo.mount.mount} />
        <h3>{matchedMount.description}</h3>
        <hr />
        <h4>{matchedMount.enhanced_description}</h4>
        {editingComment ? (
          <div>
            <textarea
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            />
            <button onClick={handleSaveComment}>Save</button>
          </div>
        ) : (
          <div>
            <p>Comment: {favoriteInfo.mount.commentbox}</p>
            <button onClick={handleEditComment}>Edit Comment</button>
          </div>
        )}

        {/* Delete Button */}
        <button onClick={handleDelete}>Delete</button>
        <br />
      </div>
    );
  } else {
    // Handle the case where a matching mount is not found
    return <p>No matching mount found.</p>;
  }
}

export default Favorite;
