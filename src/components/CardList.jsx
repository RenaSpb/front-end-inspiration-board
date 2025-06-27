import PropTypes from 'prop-types';
import './CardList.css';
import Card from './Card.jsx';

const CardList = ({cards, onClickLikeCard, onClickDeleteCard}) => {
  const getCardListJSX = () => {
    return cards.map((card) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          message={card.message}
          likesCount={card.likesCount}
          onClickDeleteCard={onClickDeleteCard}
          onClickLikeCard={onClickLikeCard}
        />
      );
    });
  };

  return (
    <ul className='cards__list no-bullet'>
      {getCardListJSX()}
    </ul>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClickDeleteCard: PropTypes.func,
  onClickLikeCard: PropTypes.func.isRequired,
};

export default CardList;
