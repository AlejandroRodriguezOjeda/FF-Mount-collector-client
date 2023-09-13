import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function Search(props) {
  const [queryInput, setQueryInput] = useState("");

  
  const handleSearch = (event) => {
    const inputValue = event.target.value.toLowerCase()
    console.log(event.target.value);
    setQueryInput(event.target.value);

    const filteredArr = props.allMounts.filter((eachMount) => {
      const mountName = eachMount.name.toLowerCase(); 
      return mountName.startsWith(inputValue);
    });

    props.setMountsToRender(filteredArr);
  };

  return (
    <>
      <FloatingLabel controlId="floatingInput" label="Search" className="mb-3">
        <Form.Control
          type="text"
          name="query"
          value={queryInput}
          onChange={handleSearch}
          placeholder="Search"
        />
      </FloatingLabel>
    </>
  );
}

export default Search;
