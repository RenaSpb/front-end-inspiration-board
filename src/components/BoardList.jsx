import { useState } from 'react';
import './BoardList.css';

const BoardList = ({ boards, selectedBoard, onSelectBoard, onClickDeleteBoard }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleBoardClick = (board) => {
    onSelectBoard(board);
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="board-list">
      <h3 
        className="toggle-collapsible" 
        onClick={toggleCollapse}
      >
        All Boards ({boards.length})
        <span className="toggle-icon">
          {isCollapsed ? '+' : '−'}
        </span>
      </h3>

      {!isCollapsed && (
        boards.length === 0 ? (
          <p className="no-boards">No boards yet. Create one below!</p>
        ) : (
          <div className="boards-container">
            {boards.map((board) => (
              <div 
                key={board.id}
                className={`board-item ${selectedBoard?.id === board.id ? 'selected' : ''}`}
              >
                <div onClick={() => handleBoardClick(board)}>
                  <h4>{board.title}</h4>
                  <p>Owner: {board.owner}</p>
                </div>

                <button
                  className="delete-board-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickDeleteBoard(board.id);
                  }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default BoardList;