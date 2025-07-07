import { useState } from 'react';
import './NewCardForm.css';

const NewCardForm = ({onCreateCard, selectedBoard}) => {
    const [formData, setFormData] = useState({
        message:'',
    })
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ 
            ...formData, 
            message: e.target.value,
        });
        if (error) setError('');
        }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            setError('Message cannot be empty');
            return;
        }

        // create a card on the selected board/ use board id to link
        const newCardData = {
            message: formData.message.trim(),
            board_id: selectedBoard.board_id,
        };
        
        // call function from App.jsx
        onCreateCard(newCardData);

        setFormData({
            message: '',
        });
    }

    return(
      <div className="new-card-form">
        <h3>Create a New Card</h3>

       <form onSubmit={handleSubmit}> 

        <div className="form-group">
        <label htmlFor="message">Message: </label>
        <input
            id="message"
            type="text"
            value={formData.message}
            onChange={handleInputChange} 
            placeholder="Enter inspirational message"/>
        {error && <p className="error-message">{error}</p>}
        <button className="submit-card-button" type="submit"> submit </button>
      </div>
      </form>
      </div>
    )
};

export default NewCardForm