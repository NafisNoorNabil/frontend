import { useState } from 'react';
import { useAuthContext } from './useAuthcontext';

export const useEmployLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/employ/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                localStorage.setItem('employer', JSON.stringify(json));

                dispatch({ type: 'LOGIN', payload: json });
            }
        } catch (error) {
            setError('An error occurred during login.');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
