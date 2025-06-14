import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar/Navbar';
import Home from './Pages/Home/Home.jsx';
import Schools from './Pages/Schools/Schools.jsx';
import ClassInfo from './Pages/ClassInfo/ClassInfo.jsx';
import SearchResults from './Pages/SearchResults/SearchResults.jsx';
import LeaveReview from './Pages/LeaveReview/LeaveReview.jsx';
import Footer from './Components/footer/Footer';

import './App.css';

function App() {
    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schools" element={<Schools />} />
                    <Route path="/class/:id" element={<ClassInfo />} />
                    <Route path="/SearchResults" element={<SearchResults />} />
                    <Route path="/class/:id/LeaveReview" element={<LeaveReview />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
