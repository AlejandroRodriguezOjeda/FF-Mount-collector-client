import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Mounts from "./Mounts";
import service from "../services/service.config";
import { useNavigate } from "react-router";
import { createCommentService, getCommentService } from '../services/service.comments'
import MountComment from "../components/mountComment";
import MarkAsOwned from "./MarkAsOwned";

function MountDetails() {
  const [mountDetails, setMountDetails] = useState(null);
  const { id } = useParams();
  const [addToFavs, setAddToFavs] = useState(true);
  const [newComment, setNewComment] = useState("")
  const [mountComments, setMountComments] = useState(null)

  const handleCommentChange = (event) => setNewComment(event.target.value)
//   const mountId = useParams()

const navigate = useNavigate()




  useEffect(() => {
    getMountDetails();
  }, [id]);

  const getMountDetails = async () => {
    try {
      const response = await axios.get(
        `https://ffxivcollect.com/api/mounts/${id}`
      );
      console.log(response);
      setMountDetails(response.data);
      

      const response2 = await getCommentService(id)
      setMountComments(response2.data)
    } catch (error) {
      console.log("I have found an error", error);
    }
  };


  const addComment = async (event) => {
    event.preventDefault();
    //edits the comment field 
    const comment = {
      comment: newComment
    }
    try {
     
      await createCommentService(id, comment)
    //   const response = await getCommentService(id);
    //   setMountComments(response.data);
    //   setNewComment("");
    getMountDetails()
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToOwned = async () => {
    try {
        const response = await service.get(`/user/my-profile`, {
            mountId: id,
            status: "owned"
          });
          console.log(response);

      navigate("/my-profile")
    } catch (error) {
      console.log("Error adding to owned:", error);
    }
  };



  if (mountDetails === null) {
    return <h3>...loading</h3>;
  }


return (
  <div>
    <div>
      <h4>{mountDetails.name}</h4>
      <img src={mountDetails.image} alt="" />
      <hr />
      <b>{mountDetails.description}</b>
      <hr />
      <span>{mountDetails.enhanced_description}</span>

      <br />

      <b>
        seats: {mountDetails.seats} Patch: {mountDetails.patch}
      </b>

      <hr />

      <p>check out how it sounds:</p>

      <audio controls src={mountDetails.bgm} />

      {/* Hacer un link con el id  */}
    </div>

    <div>
      <button onClick={handleAddToOwned}>Add to owned:</button>
      <Link to={`/new-favorite/${id}`}>
      <button>Create favorite</button>
      </Link>
    </div>

    <div>
        <hr className='mount-comment' />

        
  <h3>Deja tu comentario</h3>
  <div className="comment-form">
    <textarea
      placeholder="Enter your comment here"
      value={newComment}
      onChange={handleCommentChange}
    />
    <button onClick={addComment}>Comentar</button>
  </div>

        <h3>Comments about this mount</h3>
        {mountComments !== null ? (
    <MountComment mountComments={mountComments} updateComments={getMountDetails} />
  ) : (
    <p>No comments available.</p>
  )}
      </div>

    {/* cambiar base de datos para deje de salir el error hex */}
  </div>
);
}
export default MountDetails;
