import { useContext,useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import { Link } from "react-router-dom";


function Mounts(props){
    const navigate = useNavigate()


    const [allMounts, setAllMounts] = useState([])

    const [mountsToRender, setMountsToRender] = useState([])

    useEffect(()=>{
        getMounts()
    },[])


    const getMounts = async () => {
        try {
            const response = await axios.get("https://ffxivcollect.com/api/mounts")
            console.log(response);
            setAllMounts(response.data.results)
           
        } catch (error) {
            console.log(error);
        }
    }

        if (allMounts === null){
            return <h2>...loading</h2>
        }

        // const handleSearch = (filteredArr) => {
        //     setMountsToRender(filteredArr);

        return (

            <div>
                {/* <Search allMounts={allMounts} /> */}

            <div>
              {allMounts.length === 0 ? (
                <h2>...loading</h2>
              ) : (
                <div className="allMounts">
                  {allMounts.map((eachMount) => (
                    <ul key={eachMount.id} className="mountbox">
                        <Link to={`/${eachMount.id}`}>
                      <img src={eachMount.image} alt="" />
                      </Link>
                      <div>
                        <h3>{eachMount.name}</h3>
                      </div>
                    </ul>
                  ))}
                </div>
              )}
            </div>
            </div>
          );
    }









export default Mounts;