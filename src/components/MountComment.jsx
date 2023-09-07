import React, { useContext } from "react";
import { deleteCommentService } from "../services/service.comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useState, useEffect } from "react";
function MountComment() {
  const navigate = useNavigate();
  const { activeUserId  } = useContext(AuthContext);
  const { id } = useParams();
 console.log(activeUserId );

  const [mountComments, setMountComments] = useState([]);

  

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await service.get(`comment/${id}/comments`);
        // const comments = await response.json();
        setMountComments(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
  }, []);

  const deleteComment = async (event, commentId) => {
    event.preventDefault();
    try {
      await deleteCommentService(commentId);
   
      
    } catch (error) {
      console.log(error);
    }
  };

  return mountComments.map((eachComment) => {
    return (
      <div className="comment-display" key={eachComment._id}>
        {eachComment.username ? (
          <h5>
            <Link to={"/user/my-profile"}>
              <b>{`${eachComment.username.username}`}</b>
            </Link>
            <b> said </b> "{`${eachComment.comment}`}"
          </h5>
        ) : (
          <h5>
            <b>Unknown User</b> said "{`${eachComment.comment}`}"
          </h5>
        )}

        {activeUserId === eachComment.username._id /*|| user.role === "admin" */ ? (
          <button onClick={(event) => deleteComment(event, eachComment._id)}>
            Borrar comentario
          </button>
        ) : null}
      </div>
    );
  });
}

export default MountComment;
