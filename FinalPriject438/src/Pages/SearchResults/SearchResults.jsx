import ResultList from "../../Components/ResultList/ResultList";
import './SearchResults.css';
import {getClasses} from "../../services/firebase.js";
import {useEffect, useState} from "react";


function SearchResults() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchClasses = async (query = "") => {
        setLoading(true);
        const loadedClasses = await getClasses(query);
        setClasses(loadedClasses);
        setLoading(false);
    };

    useEffect(() => {
        fetchClasses();
    }, []);

    const handleSearch = () => {
        fetchClasses(searchQuery);
    }

    if (loading) return <div className="text-center my-5">Loading...</div>;

    return (
        <div className='search-results'>
            <h2>Class Results</h2>
            <div>
                <ResultList classes={classes} />
            </div>
        </div>
    );
}


export default SearchResults;

