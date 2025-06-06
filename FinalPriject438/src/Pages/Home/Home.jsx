import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './Home.css';


const Home = () => {
    const [query, searchQuery] = useState('');
    const navigate = useNavigate();

    const searchInput = (e) => {
        e.preventDefault();
        navigate(`/SearchResults`);
    }


    return (
            <div className="container col-xl-10 col-xxl-8 px-4 py-5">
                <div className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                    <h1>Welcome to Rate My Course</h1>
                </div>
                <div>
                    <p>Discover the best classes for you—based on real student reviews, <br />
                        Rate My Class helps you make confident course decisions.</p>
                </div>

                <form onSubmit={searchInput}>
                    <div className="d-flex justify-content-center align-items-center my-3">
                        <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
        <span className="input-group-text bg-white border-end-0 rounded-pill-start ps-3">
          <i className="bi bi-search text-muted"></i>
        </span>
                            <input
                                type="text"
                                className="form-control border-start-0 border-end-0 rounded-0"
                                placeholder="Search for a Course (e.g., HCDE 303, Python, A&H)"
                                value={query}
                                onChange={(e) => searchQuery(e.target.value)}
                                style={{
                                    borderTop: '1px solid #ccc',
                                    borderBottom: '1px solid #ccc',
                                    boxShadow: 'none',
                                }}
                            />
                            <button type="submit" className="input-group-text border-start-0 rounded-pill-end pe-3">
                                <i className="bi bi-arrow-right-circle text-muted"> Search</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    );
}

export default Home;