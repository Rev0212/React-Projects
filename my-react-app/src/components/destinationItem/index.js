import React from 'react';
import './index.css'

const DestinationItem = ({ destinationDetails }) => (
  <li className="destinationItem">
    <img className="pic"src={destinationDetails.imgUrl} alt={destinationDetails.name} />
    <p className='name'>{destinationDetails.name}</p>
  </li>
);

export default DestinationItem;
