import './Classes-SearchCard.css';


    const SearchCard = function TodoItem({ course }) {
        return (
            <div className="search-card">
                <h2>{course.dept} {course.title}</h2>

                <div>
                    <p>{course.courseDesc}</p>
                </div>
            </div>
        );
    }

export default SearchCard;