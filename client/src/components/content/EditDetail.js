import React from 'react';

const EditDetail = () => {

  const onHandleChange = (event) => {
    
  }

  const handleSubmit = (event) => {
    
  }

  return (
    <form onSubmit={handleSubmit} onChange={onHandleChange}>
      <h3> Edit Movie </h3>
      <ul className="list-group">
        <li className="list-group-item"><label>Title: <input type="text" name="nameField" value="a" /></label></li>
        <li className="list-group-item"><label>Type: <input type="text" name="typeField" value="a" /></label></li>
        <li className="list-group-item"><label>Year: <input type="text" name="yearField" value="a" /></label></li>
        <li className="list-group-item"><label>Poster: <input type="text" name="posterField" value="a" /></label></li>
      </ul>
    </form>
  )
}

export default EditDetail;