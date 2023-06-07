import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UpdateUserForm = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')


    return (
        <div>
            <h3>Hello from Update User Form</h3>
        </div>
    );
}

export default UpdateUserForm;