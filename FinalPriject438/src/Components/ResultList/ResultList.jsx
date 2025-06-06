import SearchCard from "../SearchCard/Classes-SearchCard"
import './ResultList.css';

const ResultList = ({ classes }) => {

    if (classes.length === 0) {
        return <h2>No results found</h2>
    }

    return (
        <div className='cards-container'>
            {classes.map((course) => (
                <SearchCard
                    key={course.id}
                    course={course}
                />
            ))}
        </div>
    );
};

export default ResultList;