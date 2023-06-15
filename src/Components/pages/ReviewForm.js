import React, {useState, useEffect} from 'react';
import { addReview } from '../../store';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewForm = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [reviewRating, setReviewRating] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleTitleChange = (e) => setReviewTitle(e.target.value);
    const handleReviewBodyChange = (e) => setReviewBody(e.target.value);
    const handleRatingChange = (e) => setReviewRating(parseInt(e.target.value));

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            name: reviewTitle,
            rating: reviewRating,
            description: reviewBody,
            productId: id
        }
        dispatch(addReview(reviewData));
        setReviewTitle('');
        setReviewBody('');
        setReviewRating('');
        setIsSubmitted(true);
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    return (
        <div>
            { !isSubmitted ? 
            <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
                name="name"
                value={reviewTitle}
                onChange={handleTitleChange}
            />
            <label>Rating</label>
            
            <div class="rating" value={reviewRating} onChange={handleRatingChange}>
                <input type="radio" name="rating" value="5" id="5"/>
                <label for="5"/>
                <input type="radio" name="rating" value="4" id="4"/>
                <label for="4"/>
                <input type="radio" name="rating" value="3" id="3"/>
                <label for="3"/>
                <input type="radio" name="rating" value="2" id="2"/>
                <label for="2"/>
                <input type="radio" name="rating" value="1" id="1"/>
                <label for="1"/>
            </div>

            <label>Review</label>
            <textarea  name={reviewBody} onChange={handleReviewBodyChange}rows="4" cols="50" placeholder="write a review!"></textarea>
            <button>Submit Review!</button>
        </form>     
            :  
            <div>
                <h1>Thank you for you review!</h1>         
                <p>redirecting shortly...</p>        
            </div>   
            }    
        </div>
    );
};

export default ReviewForm;