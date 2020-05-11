import React from 'react';
import InfoCard from './InfoCard';
import { Row, Col } from 'react-bootstrap';

//dumb
function AdList ({ads, lgCol, mdCol, shouldAddModificationButtons, deleteAction}) {
  return (
    <Row>
      {ads.map(ad => {
        return (
          <Col lg={lgCol} md={mdCol} key={ad._id}>
            <InfoCard
              id={ad._id}
              key={ad._id}
              imgUrl={`http://localhost:3001/ads_images/${ad.ad_type}/${ad.image_name}`}
              title={`${ad.type} - ${ad.state} (${ad.city})`}
              information={
                [{name: 'Phone', value: ad.phone}, 
                {name: 'Email', value: ad.email}, 
                {name: 'Price', value: ad.price}]
              }
              links={
                [{name: 'Update', address: shouldAddModificationButtons && `/new/ad/${ad._id}`},
                 {name: 'Delete', action: shouldAddModificationButtons && deleteAction, class: 'btn-danger' },
                 {name: 'Details', address: `/ad/details/${ad._id}`, class: 'float-right'}]
              }>
            </InfoCard>
          </Col>
        );
      })}
    </Row>
  );
}

export default AdList;