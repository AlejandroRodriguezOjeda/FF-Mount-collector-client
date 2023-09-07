import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router";

function Favorite() {
  const [favoriteInfo, setFavoriteInfo] = useState(null);
  const [mountDetails, setMountDetails] = useState(null);
  const { favoriteId } = useParams();
  const [editingComment, setEditingComment] = useState(false); // Track whether the comment is being edited
  const [updatedComment, setUpdatedComment] = useState(""); // Store the updated comment
  const navigate = useNavigate();

  console.log(favoriteId);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/mounts/${favoriteId}`);
      console.log(response);
      console.log(response.data);
      setFavoriteInfo(response.data);

      // Set the initial value for the updated comment
      setUpdatedComment(response.data.mount.commentbox);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleEditComment = () => {
    setEditingComment(true);
  };

  const handleSaveComment = async () => {
    try {
      // Make a PUT request to update the commentbox
      await service.put(`/mounts/${favoriteId}/update`, {
        commentbox: updatedComment,
      });
      setEditingComment(false);
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
  
      <p>Mount: {favoriteInfo.mount.mount}</p>

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
}

export default Favorite;
