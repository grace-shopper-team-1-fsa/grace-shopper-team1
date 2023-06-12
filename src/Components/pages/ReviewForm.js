import React, {useState, useEffect} from 'react';
import { addReview } from '../../store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const ReviewForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [reviewRating, setReviewRating] = useState(0);

    const handleTitleChange = (e) => setReviewTitle(e.target.value);
    const handleReviewBodyChange = (e) => setReviewBody(e.target.value);
    const handleRatingChange = (e) => setReviewRating(parseInt(e.target.value));


    const handleSubmit = (e) => {
        console.log(e)
        e.preventDefault();
        const reviewData = {
            name: reviewTitle,
            rating: reviewRating,
            description: reviewBody,
            productId: id
        }
        console.log("REVIEW DATA:", reviewData)
        dispatch(addReview(reviewData));
        setReviewTitle('');
        setReviewBody('');
        setReviewRating('');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    name="name"
                    value={reviewTitle}
                    onChange={handleTitleChange}
                />
                <label>Rating</label>
                <select value={reviewRating} onChange={handleRatingChange}>
                    <option value={1} selected>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <label>Review</label>
                <textarea  name={reviewBody} onChange={handleReviewBodyChange}rows="4" cols="50" placeholder="write a review!"></textarea>
                <button>Submit Review!</button>
            </form>
        </div>
    );
};

export default ReviewForm;