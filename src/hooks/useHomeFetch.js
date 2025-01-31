// custom hook for fetching home results
import { useState, useEffect } from 'react';

// helpers
import { isPersistedState } from '../helpers';

import API from '../API';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    console.log(searchTerm);
    // function for making fetchMovies API call
    const fetchMovies = async (searchTerm = "", page) => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    };

    // initial and search
    // useEffect hook
    useEffect(() => {
        /*
        //sessionStorage
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
            if (sessionState) {
                console.log("Grabbing from sessionStorage");
                setState(sessionState);
                return;
            }
        }
        */
        
        console.log("Grabbing from API")
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    // Load more
     useEffect(() => {
              if(!isLoadingMore) return;

              fetchMovies(state.page + 1, searchTerm);
              setIsLoadingMore(false);
     }, [isLoadingMore, searchTerm, state.page]) ;
    
     /*
     // write Session Storage
     useEffect(() => {
        if(!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
     }, [searchTerm, state]);
     */
    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore};
};