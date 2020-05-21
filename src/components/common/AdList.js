import React from 'react';
import InfoCard from './InfoCard';
import { Row, Col } from 'react-bootstrap';
import { addIconsToPetTypes } from "../../utils/iconsHelper";
import { getFormatedDateTimeFromISOTime } from '../../utils/dateTimeFormater';
import { host } from '../../utils/constants';

//dumb
function AdList (props) {
  const { ads, lgCol, mdCol, petTypes } = props;
  const { deleteAction, deleteInProgress, shouldAddModificationButtons } = props;
  const { showPrice, showImage } = props;
  const petTypes2Icons = addIconsToPetTypes(petTypes);

  function getImageURL(adType, imageName) {
    return showImage ? `${host}/ads_images/${adType}/${imageName}` : '';
  }

  function getAdTitle(petType, state, city) {
    return `${petType} - ${state} (${city})`;
  }

  function getAdInformation(phone, email, price) {
    return [{ name: 'Phone', value: phone },
            { name: 'Email', value: email },
            {...(showPrice && { name: 'Price', value: price})}];
  }

  function getLinkButtons(adId) {
    return [{ name: 'Update', 
              address: shouldAddModificationButtons && `/new/ad/${adId}`},
            { name: 'Delete', 
              transitionName: 'Deleting...', 
              transition: deleteInProgress && deleteInProgress.includes(adId), 
              action: shouldAddModificationButtons && deleteAction, 
              class: 'btn-danger' },
            { name: 'Details', 
              address: `/ad/details/${adId}`, 
              class: 'float-right'}];
  }

  return (
    <Row>
      {ads.map(ad => {
        return (
          <Col lg={lgCol} md={mdCol} key={ad._id}>
            <InfoCard
              id={ad._id}
              key={ad._id}
              imgUrl={getImageURL(ad.ad_type, ad.image_name)}
              date={getFormatedDateTimeFromISOTime(ad.updatedAt)}
              icon={petTypes2Icons.filter(item => item.name === ad.type).map(item => item.icon)[0]}
              title={getAdTitle(ad.type, ad.state, ad.city)}
              information={getAdInformation(ad.phone, ad.email, ad.price)}
              links={getLinkButtons(ad._id)}>
            </InfoCard>
          </Col>
        );
      })}
    </Row>
  );
}

export default AdList;