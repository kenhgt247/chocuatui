
import React from 'react';
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

const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Navigation */}
      <Navbar />

      <main className="flex-grow pb-24 md:pb-0">
        <div className="max-w-7xl mx-auto md:px-6">
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
      </main>

      {/* Mobile Navigation */}
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
