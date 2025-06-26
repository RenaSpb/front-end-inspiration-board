import { useState } from 'react'
import './NewBoardForm.css'

const NewBoardForm = ({ onCreateBoard }) => {
  const [formData, setFormData] = useState({
    title: '',
    owner: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Title is required'
    }

    if (!formData.owner || formData.owner.trim() === '') {
      newErrors.owner = 'Owner name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    const cleanedData = {
      title: formData.title.trim(),
      owner: formData.owner.trim()
    }

    const success = await onCreateBoard(cleanedData)
    
    if (success) {
      setFormData({ title: '', owner: '' })
      setErrors({})
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="new-board-form">
      <h3>Create a New Board</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Board Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? 'error-input' : ''}
            placeholder="Enter board title"
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="owner">Owner Name:</label>
          <input
            type="text"
            id="owner"
            name="owner"
            value={formData.owner}
            onChange={handleInputChange}
            className={errors.owner ? 'error-input' : ''}
            placeholder="Enter owner name"
          />
          {errors.owner && <div className="error-message">{errors.owner}</div>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Creating...' : 'Create Board'}
        </button>
      </form>
    </div>
  )
}

export default NewBoardForm