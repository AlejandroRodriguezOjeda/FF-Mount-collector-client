import React, { useContext, useState, useEffect } from "react";
import { deleteCommentService } from "../services/service.comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";

function MountComment({Comments,updateComments}) {
  const navigate = useNavigate();
  const { activeUserId } = useContext(AuthContext);
  const { id } = useParams();
  console.log(activeUserId);

  const [mountComments, setMountComments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // A key to trigger component refresh

  const fetchComments = async () => {
    try {
      const response = await service.get(`comment/${id}/comments`);
      setMountComments(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch comments initially
    fetchComments();
  }, [id]); // Only refresh when the 'id' parameter changes

  // Add a dependency on 'refreshKey' to trigger a refresh when it changes
  useEffect(() => {
    fetchComments();
  }, [refreshKey]);

  const deleteComment = async (event, commentId) => {
    event.preventDefault();
    try {
      await deleteCommentService(commentId);
      // Increment the refresh key to trigger a refresh
      setRefreshKey((prevKey) => prevKey + 1);
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

        {activeUserId === eachComment.username._id ? (
          <button onClick={(event) => deleteComment(event, eachComment._id)}>
            Borrar comentario
          </button>
        ) : null}
      </div>
    );
  });
}

export default MountComment;
