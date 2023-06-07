import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


/// Will Delete this file
const UpdateUserForm = () =>{
    const { id } = useParams();
    const dispatch = useDispatch();

    


    return (
        <div>
            <h3>Hello from Update User Form</h3>
        </div>
    );
}

export default UpdateUserForm;