import React, { useState, useEffect } from 'react';
import { FileUp, Brain, Image, Settings } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import MainLayout from './components/MainLayout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;