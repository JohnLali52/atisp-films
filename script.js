// ATISP FILMS - React Frontend (basic Netflix-style video platform)

// File: src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import LoginGate from './pages/LoginGate';

function App() {
  const hasAccess = localStorage.getItem('atispAccess') === '151532';

  return (
    <Router>
      <Routes>
        <Route path="/" element={hasAccess ? <Home /> : <LoginGate />} />
        <Route path="/browse" element={hasAccess ? <Browse /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

// --- FILE: src/pages/LoginGate.jsx ---
import React, { useState } from 'react';

const LoginGate = () => {
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    if (code === '151532') {
      localStorage.setItem('atispAccess', '151532');
      window.location.reload();
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl mb-4">Enter Access Password</h1>
      <input
        type="password"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="p-2 text-black"
      />
      <button onClick={handleSubmit} className="mt-4 p-2 bg-red-600 rounded">Enter</button>
    </div>
  );
};

export default LoginGate;

// --- FILE: src/pages/Home.jsx ---
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <img src="/logo.png" alt="ATISP Logo" className="w-32 h-32 mb-4 rounded-full" />
      <h1 className="text-4xl font-bold mb-2">ATISP FILMS</h1>
      <p className="mb-6">Stream and upload short films. Fast. Creative. Yours.</p>
      <Link to="/browse" className="bg-red-600 px-6 py-2 rounded">Browse</Link>
    </div>
  );
};

export default Home;

// --- FILE: src/pages/Browse.jsx ---
import React, { useState, useEffect } from 'react';

const mockVideos = [
  { title: 'Sunset Dreams', thumbnail: '/thumb1.jpg', url: '#' },
  { title: 'City Life', thumbnail: '/thumb2.jpg', url: '#' },
];

const Browse = () => {
  const [query, setQuery] = useState('');

  const filtered = mockVideos.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Browse Films</h1>
      <input
        type="text"
        placeholder="Search by title..."
        className="mb-4 p-2 text-black"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((video, index) => (
          <div key={index} className="bg-gray-800 p-2 rounded">
            <img src={video.thumbnail} alt={video.title} className="w-full mb-2" />
            <h2>{video.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;

// --- FILE: public/logo.png ---
// Upload your "orange-face" image as logo.png into the /public folder.

// --- FILE: tailwind.config.js ---
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// --- FILE: postcss.config.js ---
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// --- FILE: index.css ---
@tailwind base;
@tailwind components;
@tailwind utilities;

// --- FILE: package.json ---
{
  "name": "atisp-films",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0",
    "tailwindcss": "^3.3.2"
  },
  "scripts": {
    "start": "vite",
    "build": "vite build",
    "dev": "vite"
  }
}

// --- Vite & Tailwind assumed setup ---
// Initialize with:
// npm create vite@latest atisp-films --template react
// cd atisp-films
// npm install
// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
// Replace code as above
// npm run dev