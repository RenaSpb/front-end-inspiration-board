import './BoardList.css'

const BoardList = ({ boards, selectedBoard, onSelectBoard, onClickDeleteBoard }) => {
  const handleBoardClick = (board) => {
    onSelectBoard(board)
  }

  return (
    <div className="board-list">
      <h3>All Boards ({boards.length})</h3>
      
      {boards.length === 0 ? (
        <p className="no-boards">No boards yet. Create one below!</p>
      ) : (
        <div className="boards-container">
          {boards.map((board) => (

            <div 
              key={board.id}
              className={`board-item ${selectedBoard?.id === board.id                ? 'selected' : ''}`}
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
              > 🗑️ </button>

              {selectedBoard?.id === board.id && (
                <div className="selected-indicator">✓ Selected</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BoardList