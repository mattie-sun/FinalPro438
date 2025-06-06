import {useParams} from "react-router-dom";
import { useEffect, useState } from 'react';
import {getClassById, getRatings, upvote, downvote} from '../../services/firebase.js';
import {useNavigate} from "react-router-dom";
import './ClassInfo.css';


const ClassInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [votes, setVotes] = useState({});

    useEffect(() => {
        async function fetchData() {
            const classInfo = await getClassById(id);
            const classRatings = await getRatings(id);
            setClassData(classInfo);
            setRatings(classRatings);
            setLoading(false);
        }
        fetchData();
    }, [id]);


    const handleClick = () => {
        navigate(`/class/${id}/LeaveReview`);
    };


    const getRatingById = (ratingID) =>
        ratings.find((r) => r.id === ratingID) || {};

    const handleUpvote = async (ratingID) => {
        const prevVote = votes[ratingID];
        const orig = getRatingById(ratingID);

        if (prevVote === 'up') {
            // Undo upvote
            setRatings(ratings =>
                ratings.map(r =>
                    r.id === ratingID
                        ? { ...r, upvotes: (r.upvotes || 1) - 1 }
                        : r
                )
            );
            setVotes(v => ({ ...v, [ratingID]: null }));
            await upvote(id, ratingID, (orig.upvotes || 1) - 1); // update in db
        } else {
            // If previously down, remove downvote and add upvote
            let newUp = (orig.upvotes || 0) + 1;
            let newDown = orig.downvotes || 0;
            if (prevVote === 'down') {
                newDown = Math.max(0, newDown - 1);
                setRatings(ratings =>
                    ratings.map(r =>
                        r.id === ratingID
                            ? { ...r, upvotes: newUp, downvotes: newDown }
                            : r
                    )
                );
                await downvote(id, ratingID, newDown);
            } else {
                setRatings(ratings =>
                    ratings.map(r =>
                        r.id === ratingID
                            ? { ...r, upvotes: newUp }
                            : r
                    )
                );
            }
            setVotes(v => ({ ...v, [ratingID]: "up" }));
            await upvote(id, ratingID, newUp);
        }
    };


    const handleDownvote = async (ratingID) => {
        const prevVote = votes[ratingID];
        const orig = getRatingById(ratingID);

        if (prevVote === 'down') {
            setRatings(ratings =>
                ratings.map(r =>
                    r.id === ratingID
                        ? { ...r, downvotes: (r.downvotes || 1) - 1 }
                        : r
                )
            );
            setVotes(v => ({ ...v, [ratingID]: null }));
            await downvote(id, ratingID, (orig.downvotes || 1) - 1);
        } else {
            let newDown = (orig.downvotes || 0) + 1;
            let newUp = orig.upvotes || 0;
            if (prevVote === 'up') {
                newUp = Math.max(0, newUp - 1);
                setRatings(ratings =>
                    ratings.map(r =>
                        r.id === ratingID
                            ? { ...r, upvotes: newUp, downvotes: newDown }
                            : r
                    )
                );
                await upvote(id, ratingID, newUp);
            } else {
                setRatings(ratings =>
                    ratings.map(r =>
                        r.id === ratingID
                            ? { ...r, downvotes: newDown }
                            : r
                    )
                );
            }
            setVotes(v => ({ ...v, [ratingID]: "down" }));
            await downvote(id, ratingID, newDown);
        }
    };



    if (loading) return <div className="text-center my-5">Loading...</div>;

    return (
        <div className="d-flex justify-content-center mb-4">
            <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '960px' }}>
                <div className="row align-items-start">
                <div className="row align-items-start">
                    {/* Course title + tags */}
                    <div className="col-md-4">
                        <h3>{classData.department} - {classData.courseTitle}</h3>
                        <div className="mb-2">
                            {classData.tags?.map(tag => (
                                <span key={tag} className="badge bg-light text-dark border me-2">{tag}</span>
                            ))}
                        </div>
                        <button className="btn btn-outline-primary btn-sm mt-2" onClick={handleClick}>
                            Leave A Review
                        </button>
                    </div>

                    <div className="col-md-3">
                        <p><strong>Enjoyment:</strong> {classData.enjoyment}/5</p>
                        <p><strong>Difficulty:</strong> {classData.difficulty}/5</p>
                    </div>

                    <div className="col-md-5">
                        <h5>Course Description</h5>
                        <p>{classData.courseDesc}</p>
                        {classData.dawgPathURL && (
                            <a href={classData.dawgPathURL} target="_blank" rel="noreferrer">
                                View in DawgPath
                            </a>
                        )}
                    </div>
                </div>
            </div>

                {/*Sections of code populates the reviews section of each class with the existing reviews.*/}
                {/*Section of HTML also handles upvote/ downvote interactions.*/}


                <h3 className="mb-3">See what students are saying</h3>
                <div className="d-flex justify-content-center">
                    <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: '960px' }}>
                        <h5>Ratings</h5>
                        {ratings.length === 0 ? (
                            <p>No ratings yet. Be the first!</p>
                        ) : (
                            ratings.map((rating) => (
                                <div key={rating.id} className="border-bottom py-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-1"><strong>{rating.user || "Anonymous"}:</strong> {rating.message}</p>
                                            <p className="mb-1">
                                               <strong>Enjoyment: {rating.enjoyment} | Difficulty: {rating.difficulty} Professor: {rating.prof} | Grade: {rating.grade || "N/A"}</strong> </p>
                                        </div>
                                        <hr />
                                    </div>
                                    <div>
                                        <button
                                        className={`btn btn-sm me-2 LRV ${votes[rating.id] === "up" ? "btn-success" : "btn-outline-success"}`}
                                                onClick={() => handleUpvote(rating.id)}
                                        >▲</button>

                                        <span>{(rating.upvotes || 0) - (rating.downvotes || 0)}</span>

                                        <button className={`btn btn-sm me-2 LRV ${votes[rating.id] === "up" ? "btn-success" : "btn-outline-success"}`}
                                                onClick={() => handleDownvote(rating.id)}
                                        >▼</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassInfo;