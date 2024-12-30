import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { URL } from '../url';

const Review = ({productId, userId}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${URL}/api/reviews/${productId}`, {
                userId,
                rating,
                comment
            });
            console.log('review post',res.data)
            setMessage('Review Submitted successfully!');
            setRating(0);
            setComment('');


        } catch (error) {
            setMessage(error.res?.data?.message || 'An error occured while submitting the review');
         
        }
    }



  return (
    <div className="review-page">
    <h2>Write a Review</h2>
    <form onSubmit={handleSubmit}>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here..."
        rows="4"
      />
      <button type="submit">Submit Review</button>
    </form>
    {message && <p className="message">{message}</p>}
  </div>
  )
}

export default Review