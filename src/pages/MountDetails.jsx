import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
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
    getComment()
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
      setMountComments(response);
      console.log("updated comment",response);
    } catch (error) {
      console.log("Error getting comments:", error);
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    const comment = {
      comment: newComment,
    };
    try {
      await createComment(id, comment);
      
      setNewComment("");
      // Fetch comments again to include the newly added comment
      getComment();
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
        <h4 style={{ color: 'white' }}>{mountDetails.name}</h4>
        <img src={mountDetails.image} alt="" />
        <hr />
        <b style={{ color: 'white' }}>{mountDetails.description}</b>
        <hr />
        <span style={{ color: 'white' }}>{mountDetails.enhanced_description}</span>
  
        <br />
  
        <b style={{ color: 'white' }}>
          seats: {mountDetails.seats} Patch: {mountDetails.patch}
        </b>
  
        <hr />
  
        <p style={{ color: 'white' }}>check out how it sounds:</p>
  
        <audio controls src={mountDetails.bgm} />
      </div>
  
      <div>
        <Link to={`/new-favorite/${id}`}>
          <Button>Create favorite</Button>
        </Link>
      </div>
  
      <div>
        <div>
          <hr className="mount-comment" />
  
          <h3 style={{ color: 'white' }}>Deja tu comentario</h3>
          <Form>
            <Form.Group controlId="commentTextarea">
              <Form.Label style={{ color: 'white' }}>Enter your comment here</Form.Label>
              <div className="d-flex justify-content-center">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={handleCommentChange}
                  style={{ width: '400px' }}
                />
              </div>
            </Form.Group>
            <Button onClick={addComment}>Comentar</Button>
          </Form>
        </div>
  
        <h3 style={{ color: 'white' }}>Comments about this mount</h3>
        {mountComments !== null ? (
          <MountComment
            mountComments={mountComments}
            updateComments={getMountDetails}
          />
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );

}


export default MountDetails;
