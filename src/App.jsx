import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ReportFill from './pages/ReportFill';
import ReportIssue from './pages/ReportIssue';

function App() {
  return (
    <Router>
      <Header />
      <main className="container animate-slide-up">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report-fill" element={<ReportFill />} />
          <Route path="/report-issue" element={<ReportIssue />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
