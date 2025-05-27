import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Home.css';


const Home = () => {
    const [query, searchQuery] = useState('');
    const navigate = useNavigate();

    const searchInput = (e) => {
        e.preventDefault();
        navigate(`/SearchResults`);
    }


    return (
        <>
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                    <h1>Welcome to Rate My Class</h1>
                </div>
                <div>
                    <p>lorem ipsum dolor</p>
                </div>

                <form onSubmit={searchInput}>
                    <div>
                        <input type="text" placeholder="Search for A Course" value={query} onChange={(e) => searchQuery(e.target.value)}/>
                        <button type="submit">Search</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Home;