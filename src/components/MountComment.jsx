import React, { useContext } from "react";
import { deleteCommentService } from "../services/service.comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import { useState, useEffect } from "react";
function MountComment(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [mountComments, setMountComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await service.get(`/${id}/createComment`);
        const comments = await response.json();
        setMountComments(comments);
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
      updateComments();
      console.log(updateComments);
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

        {user._id === eachComment.username._id || user.role === "admin" ? (
          <button onClick={(event) => deleteComment(event, eachComment._id)}>
            Borrar comentario
          </button>
        ) : null}
      </div>
    );
  });
}

export default MountComment;
