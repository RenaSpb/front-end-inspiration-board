import PropTypes from 'prop-types';
import './Card.css';

const Card = ({id, message, likesCount, onClickDeleteCard, onClickLikeCard}) => {
    const heart = likesCount > 0 ? '❤️' : '🤍';

  return (
    <div className="card">
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
};

export default Card;
