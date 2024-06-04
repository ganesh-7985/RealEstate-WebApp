import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        dispatch(signInStart());
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const response = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,  // Use displayName instead of name
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate with server');
            }

            const data = await response.json();
            dispatch(signInSuccess(data));
            navigate('/');
            // console.log(data);
        } catch (error) {
            console.error("Error while using Google Authentication", error);
            dispatch(signInFailure());
        }
    };

    return (
        <div className='p-3 max-w-sm md:max-w-lg mx-auto'>
            <button onClick={handleGoogleAuth} type='button' className='bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-95 disabled:opacity-80'>
                Continue With Google
            </button>
        </div>
    );
}

export default OAuth;
