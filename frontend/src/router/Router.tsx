import { Navbar } from '../components/shared/Navbar';
import { Search } from '../components/search';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/search" element={<Search />}/>
                    <Route path="*" element={<Navigate replace to="/search" />} />
                </Routes>
            </div>
        </Router>
    )
}