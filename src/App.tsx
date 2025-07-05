import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './lib/auth';
import { api } from './lib/api';
import LoginForm from './components/Auth/LoginForm';
import CollegeSetup from './components/Setup/CollegeSetup';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import type { User, College } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          
          if (currentUser.college_id) {
            const collegeData = await api.getCollege(currentUser.college_id);
            setCollege(collegeData);
          } else if (currentUser.role === 'super_admin' || currentUser.role === 'college_admin') {
            setNeedsSetup(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
      if (!user) {
        setCollege(null);
        setNeedsSetup(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleCollegeSetup = (newCollege: College) => {
    setCollege(newCollege);
    setNeedsSetup(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (needsSetup) {
    return <CollegeSetup onComplete={handleCollegeSetup} userId={user.id} />;
  }

  return (
    <Router>
      <Layout user={user} college={college}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departments" element={<div>Departments (Coming Soon)</div>} />
          <Route path="/faculty" element={<div>Faculty Management (Coming Soon)</div>} />
          <Route path="/subjects" element={<div>Subject Management (Coming Soon)</div>} />
          <Route path="/classrooms" element={<div>Classroom Management (Coming Soon)</div>} />
          <Route path="/time-slots" element={<div>Time Slot Management (Coming Soon)</div>} />
          <Route path="/timetable" element={<div>Timetable Generation (Coming Soon)</div>} />
          <Route path="/reports" element={<div>Reports & Analytics (Coming Soon)</div>} />
          <Route path="/settings" element={<div>Settings (Coming Soon)</div>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;