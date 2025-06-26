import './BoardList.css'

const BoardList = ({ boards, selectedBoard, onSelectBoard }) => {
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
              key={board.board_id}
              className={`board-item ${selectedBoard?.board_id === board.board_id ? 'selected' : ''}`}
              onClick={() => handleBoardClick(board)}
            >
              <h4>{board.title}</h4>
              <p>Owner: {board.owner}</p>
              {selectedBoard?.board_id === board.board_id && (
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