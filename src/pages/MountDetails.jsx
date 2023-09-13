import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import MountComment from "../components/Comment.jsx";
import service from "../services/service.config.js";

function MountDetails() {
  const [mountDetails, setMountDetails] = useState(null);
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [mountComments, setMountComments] = useState(null);

  const handleCommentChange = (event) => setNewComment(event.target.value);
  //   const mountId = useParams()

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

      const response2 = await getComment(id);
      setMountComments(response2);
    } catch (error) {
      console.log("I have found an error", error);
    }
  };

  const createComment = async (mountId, comment) => {
    try {
      const response = await service.post(
        `/comment/${id}/createComment`,
        comment
      );
      console.log(response);
      // Handle any response data or state updates as needed
    } catch (error) {
      console.log("Error creating comment:", error);
    }
  };

  const getComment = async (mountId) => {
    try {
      const response = await service.get(`comment/${id}/comments`);
      setMountComments(response.data);
      console.log(response);
    } catch (error) {
      console.log("Error getting comments:", error);
    }
  };

  // const updateComments = async () => {
  //   try {
  //     const response2 = await getCommentService(id);
  //     setMountComments(response2.data);
  //   } catch (error) {
  //     console.log("Error updating comments:", error);
  //   }
  // };

  const addComment = async (event) => {
    event.preventDefault();
    const comment = {
      comment: newComment,
    };
    try {
      await createComment(id, comment);
      // await updateComments();
    } catch (error) {
      console.log(error);
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
      </div>

      <div>
        <Link to={`/new-favorite/${id}`}>
          <button>Create favorite</button>
        </Link>
      </div>

      <div>
        <hr className="mount-comment" />

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
          <MountComment
            mountComments={mountComments}
            updateComments={getMountDetails}
          />
        ) : (
          <p>No comments available.</p>
        )}
      </div>

      {/* cambiar base de datos para deje de salir el error hex */}
    </div>
  );
}
export default MountDetails;
