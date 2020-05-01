import React/* , {useEffect, useState} */ from 'react';
import { Card } from 'react-bootstrap';

//dumb
function ImageSelector({imgName, onChange, url, error}) {
  return (
    <>
      <div className="input-group mb-3">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="image_name"
            name='image_name'
            accept="image/*"
            onChange={onChange}>
          </input>
          <label className="custom-file-label" htmlFor="image_name">
            {imgName}
          </label>
        </div>
      </div>
      {error && <div className='alert alert-danger'>{error}</div>}
      {url && 
      <Card>
        <Card.Img className="selected-img" variant="top" src={url}/>
      </Card>}
    </>
  );
}

export default ImageSelector;