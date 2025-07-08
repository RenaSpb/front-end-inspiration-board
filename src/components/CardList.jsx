import PropTypes from 'prop-types';
import './CardList.css';
import Card from './Card.jsx';

const CardList = ({ cards, onClickLikeCard, onClickDeleteCard }) => {
  if (!cards.length) {
    return <p className="no-cards">No cards yet. Time to inspire!</p>;
  }

  return (
    <ul className="cards-list">
      {cards.map((card, index) => (
        <Card
          key={card.card_id}
          id={card.card_id}
          message={card.message}
          likesCount={card.likes_count}
          onClickDeleteCard={onClickDeleteCard}
          onClickLikeCard={onClickLikeCard}
          className={index === 0 ? "newly-added" : ""}
        />
      ))}
    </ul>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number,
      message: PropTypes.string,
      likes_count: PropTypes.number,
    })
  ).isRequired,
  onClickDeleteCard: PropTypes.func,
  onClickLikeCard: PropTypes.func.isRequired,
};

export default CardList;