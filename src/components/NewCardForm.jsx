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

        if (formData.message.trim().length > 42) {
            setError('Keep it short! (max 42 characters)');
            return;
        }

        const newCardData = {
            message: formData.message.trim(),
        };
        
        onCreateCard(newCardData);

        setFormData({
            message: '',
        });
        setError('');
    }

    const characterCount = formData.message.length;
    const maxLength = 42;
    const remaining = maxLength - characterCount;

    return(
      <div className="new-card-form">
        <div className="selected-board-info">
          <h3>{selectedBoard.title} By {selectedBoard.owner}</h3>
        </div>
        
        <h4>Post a new card!</h4>

       <form onSubmit={handleSubmit}> 
        <div className="form-group">
          <input
              id="message"
              type="text"
              value={formData.message}
              onChange={handleInputChange} 
              placeholder="Add a message"
              className={error ? 'error-input' : ''}
              maxLength={maxLength}
          />
          <div className={`character-count ${remaining <= 5 ? 'warning' : ''}`}>
            {remaining} characters left
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button className="submit-card-button" type="submit">Submit</button>
      </form>
      </div>
    )
};

export default NewCardForm