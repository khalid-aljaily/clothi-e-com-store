import React from 'react';
import star from '../assets/Star 3.svg'
import halfStar from '../assets/Star 5.svg'
import { Group } from '@mantine/core';
const StarRating = ({ rating }) => {
  const stars = [];
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Push filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<img key={i} src={star} alt='star'  />);
  }

  // Push half star if necessary
  if (hasHalfStar) {
    stars.push(<img  src={halfStar} alt='star'  />);
  }

  // Push empty stars
//   while (stars.length < 5) {
//     stars.push(<span key={stars.length} className="star empty-star"></span>);
//   }

  return <Group gap={2}>{stars}</Group>;
};

export default StarRating;