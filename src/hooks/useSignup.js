import { useState } from 'react';
import { useAuthContext } from './useAuthcontext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading with false
    const { dispatch } = useAuthContext();

    const signup = async (email, password, username, phone) => { // Add username and phone parameters
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username, phone }) // Include username and phone in the body
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            // update loading state
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
