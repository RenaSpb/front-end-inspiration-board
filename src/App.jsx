import { useState, useEffect } from 'react'
import axios from 'axios'
import BoardList from './components/BoardList'
import NewBoardForm from './components/NewBoardForm'
import './App.css'

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

function App() {
  const [boards, setBoards] = useState([])
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [showNewBoardForm, setShowNewBoardForm] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBoards()
  }, [])

  const fetchBoards = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/boards`)
      setBoards(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching boards:', error)
      setError('Failed to load boards')
    }
  }

  const createBoard = async (boardData) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/boards`, boardData)
      setBoards([...boards, response.data])
      setError('')
      return true
    } catch (error) {
      console.error('Error creating board:', error)
      setError('Failed to create board')
      return false
    }
  }

  const selectBoard = (board) => {
    setSelectedBoard(board)
  }

  const toggleNewBoardForm = () => {
    setShowNewBoardForm(!showNewBoardForm)
  }

  return (
    <div className="App">
      <header>
        <h1>Inspiration Board</h1>
      </header>

      <main>
        <div className="boards-section">
          <div className="boards-header">
            <h2>Boards</h2>
            <button onClick={toggleNewBoardForm}>
              {showNewBoardForm ? 'Hide Form' : 'New Board'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <BoardList 
            boards={boards}
            selectedBoard={selectedBoard}
            onSelectBoard={selectBoard}
          />

          {showNewBoardForm && (
            <NewBoardForm 
              onCreateBoard={createBoard}
            />
          )}

          {selectedBoard && (
            <div className="selected-board">
              <h3>Selected Board: {selectedBoard.title}</h3>
              <p>Owner: {selectedBoard.owner}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App