import { useState } from 'react';
import './NewCardForm.css';

const NewCardForm = ({onCreateCard, selectedBoard}) => {
    const [formData, setFormData] = useState({
        message:'',
    })
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ 
            ...formData, 
            message: e.target.value,
        });
        if (error) setError('');
        }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            setError('Message cannot be empty');
            return;
        }

        if (formData.message.trim().length > 500) {
            setError('Message is too long (max 500 characters)');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // create a card on the selected board/ use board id to link
            const newCardData = {
                message: formData.message.trim(),
                // board_id: selectedBoard.id,
            };
            
            // call function from App.jsx
            await onCreateCard(newCardData);

            setFormData({
                message: '',
            });
        } catch (err) {
            setError('Failed to create card. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const characterCount = formData.message.length;
    const maxLength = 500;

    return(
      <div className="new-card-form">
        <div className="selected-board-info">
          <h3>{selectedBoard.title} By {selectedBoard.owner}</h3>
        </div>
        
        <h4>Post a new card!</h4>

       <form onSubmit={handleSubmit}> 
        <div className="form-group">
          <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange} 
              placeholder="Add a message"
              className={error ? 'error-input' : ''}
              rows="3"
              maxLength={maxLength}
          />
          <div className="character-count">
            {characterCount}/{maxLength}
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
        <button 
          className="submit-card-button" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Submit'}
        </button>
      </form>
      </div>
    )
};

export default NewCardForm