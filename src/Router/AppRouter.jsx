import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAccount } from 'wagmi';
import Home from "../pages/Home/Home";

const AppRouter = () => {
  const { address } = useAccount();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* Redirect to home if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
