import SearchCard from "../SearchCard/Classes-SearchCard"

const ResultList = ({ classes }) => {

    if (classes.length === 0) {
        return <h2>No results found</h2>
        //potental for option to add a class
    }

    return (
        <div>
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