import React, { useContext, useState, useEffect } from "react";
// import { deleteCommentService } from "../services/service.comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";
import Button from 'react-bootstrap/Button';


function MountComment({Comments,updateComments}) {
  
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
   
    fetchComments();
  }, [id]); 

  
  useEffect(() => {
    fetchComments();
  }, [refreshKey]);

  const deleteComment = async (event, commentId) => {
    event.preventDefault();
    try {
     const response = await  service.delete(`/comment/${commentId}/delete`)
    
      
      setRefreshKey((prevKey) => prevKey + 1);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return mountComments.map((eachComment) => {
    return (
      <div className="comment-display" key={eachComment._id}>
        {eachComment.username ? (
          <h5>
            <Link
              to={
                activeUserId === eachComment.username._id
                  ? "/my-profile" // Link to your own profile
                  : `/user/${eachComment.username._id}/details` // Link to other users' profiles
              }
            >
              <b style={{ color: 'lightblue' }}>{eachComment.username.username}</b>
            </Link>
            <b style={{ color: 'white' }}> said: </b> "{eachComment.comment}"
          </h5>
        ) : (
          <h5>
            <b style={{ color: 'white' }}>Unknown User</b> said "{eachComment.comment}"
          </h5>
        )}
    
        {activeUserId === eachComment.username._id ? (
          <Button
            onClick={(event) => deleteComment(event, eachComment._id)}
            // style={{ backgroundColor: 'red', color: 'white' }}
          >
            Borrar comentario
          </Button>
        ) : null}
      </div>
    );
  });
}

export default MountComment;
