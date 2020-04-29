import React from 'react'
import Ad from './Ad'
import { Row, Col } from "react-bootstrap";

//dumb
function AdList ({ads, lgCol, mdCol}) {
  return (
    <>
      <Row>
        {ads.map(ad => {
          const url = `http://localhost:3001/ads_images/${ad.ad_type}/${ad.image_name}`;
          return (
            <Col lg={lgCol} md={mdCol} key={ad._id}>
              <Ad 
                id=           {ad._id}
                key=          {ad._id}
                ad_type=      {ad.ad_type}
                pet_type=     {ad.type}  
                phone_number= {ad.phone}  
                short_desc=   {''}
                email=        {ad.email}
                img_url=      {url}
                price=        {ad.price}
                state=        {ad.state}
                city=         {ad.city}>
              </Ad>
            </Col>
          );
        })}
      </Row>
      {ads.length === 0 && <h3>There is no ads yet...</h3>}
    </>
  );
}

export default AdList;