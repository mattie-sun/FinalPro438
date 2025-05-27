import ResultList from "../../Components/ResultList/ResultList";
import './SearchResults.css';
import {getClasses} from "../../services/firebase.js";
import {useEffect, useState} from "react";

function SearchResults() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            const loadedClasses = await getClasses();
            setClasses(loadedClasses);
            setLoading(false);
        };
        fetchClasses();
    }, []);

    return (
        <div className='search-results'>
            <h1>Class Results</h1>
            <div>
                <ResultList classes={classes} />
            </div>
        </div>
    );
}

export default SearchResults;

