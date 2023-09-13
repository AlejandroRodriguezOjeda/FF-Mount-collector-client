import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react"; 
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Favorite() {
  const { activeUserId } = useContext(AuthContext); 
  const [favoriteInfo, setFavoriteInfo] = useState(null);
  const { favoriteId } = useParams();
  const [editingNote, setEditingNotes] = useState(false);
  const [updatedNote, setUpdatedNotes] = useState("");
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
      setUpdatedNotes(response.data.mount.notes);
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

  const handleEditNote = () => {
    setEditingNotes(true);
  };

  const handleSaveNote = async () => {
    try {
      await service.put(`/mounts/${favoriteId}/update`, {
        notes: updatedNote,
      });
  
      // After successfully saving the comment, fetch the updated data
      await getData(); // Refetch the data
      setEditingNotes(false); // Disable editing mode
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

    // Check if the active user created this favorite

    console.log("favoriteInfo.user._id:", favoriteInfo.mount.user);
console.log("activeUserId:", activeUserId);

const isCurrentUserFavorite = favoriteInfo.mount.user._id === activeUserId;
    

return (
  <div>
    <h2 style={{ color: 'white' }}>Favorite Info</h2>
    <h1 style={{ color: 'white' }}>Mount: {matchedMount.name}</h1>
    <img src={mountImageUrl} alt={favoriteInfo.mount.mount} />
    <hr />
    <h3 style={{ color: 'white' }}>{matchedMount.description}</h3>
    <hr />
    <h4 style={{ color: 'white' }}>{matchedMount.enhanced_description}</h4>
    {editingNote ? (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div style={{ width: '80%' }}>
          <textarea
            value={updatedNote}
            onChange={(e) => setUpdatedNotes(e.target.value)}
            style={{ width: '100%', height: '100px' }}
          />
          <button className="btn btn-primary" onClick={handleSaveNote}>Save</button>
        </div>
      </div>
    ) : (
      <div>
        <hr />
        <p style={{ color: 'white' }}>Personal Note: {favoriteInfo.mount.notes}</p>
        {isCurrentUserFavorite && (
          <button className="btn btn-primary" onClick={handleEditNote}>Edit Note</button>
        )}
      </div>
    )}

    <br />

    {isCurrentUserFavorite && (
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    )}
  </div>
);
  } else {
    // Handle the case where a matching mount is not found
    return <p>No matching mount found.</p>;
  }
}

export default Favorite;