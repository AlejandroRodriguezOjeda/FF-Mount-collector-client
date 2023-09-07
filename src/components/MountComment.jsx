import React, { useContext } from 'react'
import { deleteCommentService } from '../services/service.comments'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/auth.context"


function MountComment(props) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  const { mountComments, updateComments } = props

  const deleteComment = async (event, commentId) => {
    event.preventDefault()
    try {
      await deleteCommentService(commentId)
      updateComments()
      console.log(updateComments);

    } catch (error) {
      console.log(error);
    }
  }

  
  

  return (
    mountComments.map((eachComment) => {
    <div className="comment-display">

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

      {user._id === usernameId || user.role === "admin" ? (
        <button onClick={(event) => deleteComment(event, eachComment._id)}>Borrar comentario</button>
      ) : null}

    </div>
 } ))
    }
  
  


export default MountComment