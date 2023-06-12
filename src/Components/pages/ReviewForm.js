import React, {useState} from 'react';

const ReviewForm = () => {
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');

    const handleTitleChange = (e) => setReviewBody(e.target.value);
    const handleReviewBodyChange = (e) => setReviewBody(e.target.value);


    return (
        <div>
            <form>
                <label>Title</label>
                <input
                    name="name"
                    value={formTitle}
                    onChange={handleTitleChange}
                />
                <label>Review</label>
                <textarea  rows="4" cols="50" placeholder="write a review!"></textarea>
            </form>
        </div>
    );
};

export default ReviewForm;