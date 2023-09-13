import { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import { Link } from "react-router-dom";
import Search from "../components/SearchBar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Mounts(props){
    const navigate = useNavigate()


    const [allMounts, setAllMounts] = useState([])

    const [mountsToRender, setMountsToRender] = useState (allMounts)
    

   

    useEffect(()=>{
        getMounts()
    },[])


    const getMounts = async () => {
        try {
            const response = await axios.get("https://ffxivcollect.com/api/mounts")
            console.log(response);
            setAllMounts(response.data.results)
            setMountsToRender(response.data.results);
           
        } catch (error) {
            console.log(error);
        }
    }

        if (allMounts === null){
            return <h2>...loading</h2>
        }



        return (
          <div>
            <Search allMounts={allMounts} setMountsToRender={setMountsToRender} />
            <hr />
            <h3>All Mounts...</h3>
            <div className="centered">
              {mountsToRender.length === 0 ? (
                <h2>...loading</h2>
              ) : (
                <div className="allMounts">
                  {mountsToRender.map((eachMount) => (
                    <ul key={eachMount.id} className="mountbox">
                      <Link to={`/${eachMount.id}`}>
                        
                        <Card bg="dark" text="white" style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={eachMount.image} alt="" />
                          <Card.Body>
                            <Card.Title>{eachMount.name}</Card.Title>
                          
                            <Button variant="primary">Check this one out!</Button>
                          </Card.Body>
                        </Card>
                      </Link>
                    </ul>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
        
    }









export default Mounts;