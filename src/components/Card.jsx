import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ id, message, likesCount, onClickDeleteCard, onClickLikeCard, className = "" }) => {
  const heart = likesCount > 0 ? '❤️' : '🤍';

  return (
    <div className={`card ${className}`}>
      <p>{message}</p>
      <div className="card-actions">
        <button onClick={() => onClickLikeCard(id)} title="Like this card">
          {likesCount} {heart}
        </button>
        <button onClick={() => onClickDeleteCard(id)} title="Delete this card">🗑️</button>
      </div>
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