import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../services/service.config";
import { useNavigate } from "react-router";

function AddToFavorites() {

  const [mountDetails, setMountDetails] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");


  const navigate = useNavigate()

  useEffect(() => {
    // Fetch the mount details using the id from the URL
    async function fetchMountDetails() {
      try {
        const response = await axios.get(
          `https://ffxivcollect.com/api/mounts/${id}`
        );
        setMountDetails(response.data);
      } catch (error) {
        console.log("Error fetching mount details:", error);
      }
    }

    fetchMountDetails();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddtoFav = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post(`/mounts/new-favorite`,{
      mount: mountDetails.id,
     notes: comment,

    })

    navigate("/my-profile")
    console.log(response);
    } catch (error) {
      console.log("cant add to favs", error);
    }
  };

  return (
    <div>
      <h1>Add to your Favorites</h1>
      {mountDetails && (
        <div>
          <h2>{mountDetails.name}</h2>
          <img src={mountDetails.image} alt={mountDetails.name} />
          <p>{mountDetails.description}</p>
        </div>
      )}
      <form onSubmit={handleAddtoFav}>
        <textarea
          placeholder="Add your notes here.."
          value={comment}
          onChange={handleCommentChange}
        />

        <button type="submit">Add to Favorites</button>
      </form>
    </div>
  );
}

export default AddToFavorites;
