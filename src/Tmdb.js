import React, { useEffect } from 'react';
import axios from 'axios';

const Tmdb = () => {
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=2685c7ff5ed7c6d106338b0631c3a318');
            console.log(response.data.results)
        };

        fetchData();
    }, []);

    return (
        <div>tmdb</div>
    );
};

export default Tmdb;
