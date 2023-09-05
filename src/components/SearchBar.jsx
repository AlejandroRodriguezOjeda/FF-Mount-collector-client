import { useState } from "react";

function Search(props){
    const [queryInput,setQueryInput] = useState("")



    const handleSearch = (e) =>{
        console.log(event.target.value);
        setQueryInput(event.target.value)




        const filteredArr = props.allMounts.filter((eachMount)=>{
            if(eachMount.name.startsWith(event.target.value)=== true){
                return true
            }else{
                return false
            }
        })


        props.setMountsToRender(filteredArr)


    }

    return(
        <div>

            <form>

        <label htmlFor="query">Search</label>
        <input type="text" name="query" value={queryInput} onChange={handleSearch} />



            </form>
        </div>
    )
}


export default Search