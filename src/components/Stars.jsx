import star from '../assets/Star 3.svg'
import halfStar from '../assets/Star 5.svg'
import { Group } from '@mantine/core';
const StarRating = ({ rating }) => {
  const stars = [];
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < filledStars; i++) {
    stars.push(<img key={i} src={star} alt='star' className='w-4 sm:w-5' />);
  }
  if (hasHalfStar) {
    stars.push(<img key={stars.length}  src={halfStar} alt='star' className='w-[7px] sm:w-[9px]'   />);
  }
  return <Group gap={2}>{stars}</Group>;
};

export default StarRating;