const genderAvatar = (gender) => {
  switch (gender) {
    case 'male':
      return '/images/male.png';
      break;
    case 'female':
      return '/images/female.png';
      break;
    case 'other':
      return '/images/other.png';
    default:
      return '/images/other.png';
  }
};

export default genderAvatar;
