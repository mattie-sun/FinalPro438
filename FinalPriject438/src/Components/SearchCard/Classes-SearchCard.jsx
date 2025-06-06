import './Classes-SearchCard.css';
import{ useNavigate } from 'react-router-dom';
import { calculateAverages} from "../../services/firebase.js";
import {useEffect, useState} from "react";

function SearchCard({course}) {
    const navigate = useNavigate();
    const [averages, setAverages] = useState({
        avgEnjoyment: 0,
        avgDifficulty: 0,
        avgRating: 0
    });

    const handleClick = () => {
        navigate(`/class/${course.id}`);
    };

    useEffect(() => {
        async function fetchData() {
            const result = await calculateAverages(course.id);
            console.log(result);
            setAverages(result);
        }
        fetchData();
    }, [course.id]);

    const formatAverage = value =>
        Number.isFinite(value) ? value.toFixed(2) : "N/A";


    return (
        <div
            className="classCard card p-3 mb-4 shadow-sm border-0"
            onClick={handleClick}
            style={{
                borderRadius: '1rem',
                backgroundColor: '#f7f7fb',
                cursor: 'pointer',
            }}
        >
            <div className="row">
                <div className="col-md-3 d-flex flex-column justify-content-between">
                    <div>
                        <h6 className="fw-bold mb-2">{course.department} {course.courseNumber}</h6>
                        <div className="d-flex align-items-center mb-1 text-muted" style={{fontSize: '0.9rem'}}>
                            <i className="bi bi-star me-2"></i> Course Rating: {formatAverage(averages?.avgRating)}
                        </div>
                        <div className="d-flex align-items-center mb-1 text-muted" style={{fontSize: '0.9rem'}}>
                            <i className="bi bi-star me-2"></i> Enjoyment: {formatAverage(averages?.avgEnjoyment)}

                        </div>
                        <div className="d-flex align-items-center mb-1 text-muted" style={{fontSize: '0.9rem'}}>
                            <i className="bi bi-star me-2"></i>
                            Difficulty:{formatAverage(averages?.avgDifficulty)}
                        </div>

                    </div>
                </div>

                <div className="col-md-9">
                    <h5 className="fw-semibold mb-2">{course.courseTitle}</h5>
                    <p className="text-secondary mb-3" style={{fontSize: '0.95rem'}}>
                        {course.courseDesc}
                    </p>

                    <div className="d-flex flex-wrap gap-2">
                        {course.tags?.map((tag, i) => (
                            <span key={i} className="badge rounded-pill border text-secondary"
                                  style={{fontSize: '0.75rem'}}>
                                  {tag.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchCard;