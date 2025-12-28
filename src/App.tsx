
import React from 'react';
// Use BrowserRouter which is standard for web applications and ensures export availability
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import PostWizard from './pages/PostWizard';
import ListingDetail from './pages/ListingDetail';
import ChatList from './pages/ChatList';
import ChatRoom from './pages/ChatRoom';
import Profile from './pages/Profile';
import AuthPage from './pages/AuthPage';
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles.css';

// @google/genai Fix: Made children prop optional to resolve errors where property 'children' was reported as missing in Route components
const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow bg-slate-50">
        <div className="max-w-7xl mx-auto w-full md:px-6">
          <div className="bg-white md:min-h-screen md:shadow-sm md:border-x border-slate-100 mx-auto md:max-w-4xl lg:max-w-5xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/auth" element={<AuthPage />} />
              
              <Route path="/post" element={<PrivateRoute><PostWizard /></PrivateRoute>} />
              <Route path="/chats" element={<PrivateRoute><ChatList /></PrivateRoute>} />
              <Route path="/chat/:chatId" element={<PrivateRoute><ChatRoom /></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Desktop Footer */}
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
