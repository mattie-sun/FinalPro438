import { addRating } from '../../services/firebase.js';
import {useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import './LeaveReview.css';

const LeaveReview = () => {
    const [form, setForm] = useState({
        rating: 0,
        difficulty: 0,
        enjoyment: 0,
        prof: '',
        tags: '',
        message: '',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    const handleChange = (e) => {
        setForm(f => ({
            ...f,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = {
                ...form,
                rating: Number(form.rating),
                difficulty: Number(form.difficulty),
                enjoyment: Number(form.enjoyment),
            };
            await addRating(id, data);
            navigate(`/class/${id}`);
        } catch (err) {
            setError('Form failed to submit. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="container my-5">
            <div className="card p-5 shadow-sm rounded-4">
                <h2 className="fw-bold mb-5">Rate this Course</h2>
                <form onSubmit={handleSubmit} className="">
                    {/* Enjoyment Rating */}
                    <div className="mb-5">
                        <label className="form-label fw-semibold text-start d-block">Enjoyment Rating</label>
                        <div className="d-flex justify-content-between rating-input">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={`enjoy-${value}`} className="text-center">
                                    <input
                                        type="radio"
                                        name="enjoyment"
                                        value={value}
                                        checked={form.enjoyment == value}
                                        onChange={handleChange}
                                        className="form-check-input d-block mx-auto"
                                    />
                                    <span>{value}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Rating */}
                    <div className="mb-5">
                        <label className="form-label fw-semibold text-start d-block">Difficulty Rating</label>
                        <div className="d-flex justify-content-between rating-input">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <label key={`diff-${value}`} className="text-center">
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        value={value}
                                        checked={form.difficulty == value}
                                        onChange={handleChange}
                                        className="form-check-input d-block mx-auto"
                                    />
                                    <span>{value}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Professor */}
                    <div className="mb-5">
                        <label className="form-label text-start d-block">Professor</label>
                        <input
                            name="prof"
                            type="text"
                            value={form.prof}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Prof. Name"
                        />
                    </div>

                    {/* Comments */}
                    <div className="mb-5">
                        <label className="form-label text-start d-block">Comments</label>
                        <textarea
                            name="message"
                            rows={3}
                            value={form.message}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Share your experience"
                        />
                    </div>

                    {error && <div className="text-danger mb-3">{error}</div>}
                    <button disabled={loading} type="submit" className="btn btn-primary rounded-pill px-4">
                        {loading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LeaveReview;