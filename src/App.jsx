import { useState, useEffect } from 'react';
import axios from 'axios';
import BoardList from './components/BoardList';
import NewBoardForm from './components/NewBoardForm';
import CardList from './components/CardList';
import NewCardForm from './components/NewCardForm';
import './App.css';

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;

function App() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [error, setError] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/boards`);
      setBoards(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching boards:', error);
      setError('Failed to load boards');
    }
  };

  const createBoard = async (boardData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/boards`, boardData);
      setBoards([...boards, response.data]);
      setError('');
      return true;
    } catch (error) {
      console.error('Error creating board:', error);
      setError('Failed to create board');
      return false;
    }
  };

  const deleteBoardById = (id) => {
    axios
      .delete(`${BACKEND_URL}/boards/${id}`)
      .then(() => {
        setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));

        if (selectedBoard && selectedBoard.id === id) {
          setSelectedBoard(null);
          setCards([]);
        }
      })
      .catch((error) => console.log('Error deleting board', error));
  };

  const selectBoard = (board) => {
    setSelectedBoard(board);
  };

  const goHome = () => {
    setSelectedBoard(null);
    setCards([]);
  };

  useEffect(() => {
    if (selectedBoard) {
      axios
        .get(`${BACKEND_URL}/boards/${selectedBoard.id}/cards`)
        .then((response) => {
          setCards(response.data.cards);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedBoard]);

  const createCard = (newCardData) => {
    axios
      .post(`${BACKEND_URL}/boards/${selectedBoard.id}/cards`, newCardData)
      .then((response) => {
        setCards((prevCards) => [response.data, ...prevCards]);
      })
      .catch((error) => console.log('Error creating card', error));
  };

  const likeCardById = (card_id) => {
    axios
      .patch(`${BACKEND_URL}/cards/${card_id}/like`)
      .then((response) => {
        const updatedCard = response.data.card;
        setCards((prevCards) =>
          prevCards.map((card) => (card.card_id === card_id ? updatedCard : card))
        );
      })
      .catch((error) => console.log('Error cannot like card', error));
  };

  const deleteCardById = (card_id) => {
    axios
      .delete(`${BACKEND_URL}/cards/${card_id}`)
      .then(() => {
        setCards((prevCards) => prevCards.filter((card) => card.card_id !== card_id));
      })
      .catch((error) => console.log('Error deleting card', error));
  };

  return (
    <div className="App">
      <main>
        <div className="boards-section">
          <h2 className="boards-home-title" onClick={goHome}>
            Our board
          </h2>

          <NewBoardForm onCreateBoard={createBoard} />

          {error && <div className="error-message">{error}</div>}

          <BoardList
            boards={boards}
            selectedBoard={selectedBoard}
            onSelectBoard={selectBoard}
            onClickDeleteBoard={deleteBoardById}
          />
        </div>

        <div className={`right-panel ${selectedBoard ? 'has-board' : 'no-board'}`}>
          {selectedBoard ? (
            <>
              <NewCardForm
                onCreateCard={createCard}
                selectedBoard={selectedBoard}
              />
              <CardList
                cards={cards}
                onClickLikeCard={likeCardById}
                onClickDeleteCard={deleteCardById}
              />
            </>
          ) : (
            <div className="placeholder-container">
              <img src="/home.png" alt="Welcome" className="placeholder-image" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;