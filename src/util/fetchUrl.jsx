import { useState, useEffect } from 'react';

function useFetchUrl() {
    const [preloadData, setPreloadData] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        let checkPreloadDataInterval;
        if (window.myPreloadData && window.myPreloadData.value !== undefined) {
            setPreloadData(window.myPreloadData.value);
            setLoading(false); // Set loading to false when data is available
        } else {
            checkPreloadDataInterval = setInterval(() => {
                if (window.myPreloadData && window.myPreloadData.value !== undefined) {
                    setPreloadData(window.myPreloadData.value);
                    setLoading(false); // Set loading to false when data is available
                    clearInterval(checkPreloadDataInterval);
                }
            }, 500); // Adjust the interval as needed
        }

        return () => {
            clearInterval(checkPreloadDataInterval);
        };
    }, []);

    return [ preloadData, loading ]; // Return both preloadData and loading state
}

export default useFetchUrl;
