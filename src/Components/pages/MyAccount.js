import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserProfile } from '../../store';


const MyAccount = () =>{

    const { id } = useParams();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.users.find((user) => user.id === id));
    console.log(user)

    useEffect(() => {
        dispatch(fetchProductById(id));
      }, [dispatch]);

    return(
        <div>
            <h1>hello</h1>
        </div>
    )
}
export default MyAccount;