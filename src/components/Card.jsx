import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, message, likesCount, onClickDeleteCard, onClickLikeCard, className = "" }) => {
  const heart = likesCount > 0 ? '❤️' : '🤍';

  return (
    <div className={`card ${className}`}>
      <button onClick={() => onClickDeleteCard(id)}>🗑️</button>
      <p>{message}</p>
      <button onClick={() => onClickLikeCard(id)}>{likesCount} {heart}</button>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  onClickDeleteCard: PropTypes.func.isRequired,
  onClickLikeCard: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Card;
