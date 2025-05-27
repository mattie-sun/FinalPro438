import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar/Navbar';
import Home from './Pages/Home/Home.jsx';
import Schools from './Pages/Schools/Schools.jsx';
import ClassInfo from './Pages/ClassInfo/ClassInfo.jsx';
import SearchResults from './Pages/SearchResults/SearchResults.jsx';

import './App.css';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/class" element={<ClassInfo />} />
                <Route path="/SearchResults" element={<SearchResults />} />
            {/*    proper syntax*/}
            </Routes>
        </>
    );
}

export default App;
