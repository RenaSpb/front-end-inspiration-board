import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, message, likesCount, onClickDeleteCard, onClickLikeCard }) => {
  const heart = likesCount > 0 ? '❤️' : '🤍';

  return (
    <div className="card">
      <button onClick={() => onClickDeleteCard(id)} title="Delete this card">🗑️</button>
      <p>{message}</p>
      <button onClick={() => onClickLikeCard(id)} title="Like this card">
        {likesCount} {heart}
      </button>
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
