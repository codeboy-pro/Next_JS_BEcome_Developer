# 🔐 Authentication Flow - Complete Revision Notes

## Table of Contents
1. [Authentication Overview](#authentication-overview)
2. [JWT (JSON Web Token)](#jwt-json-web-token)
3. [Login & Register Flow](#login--register-flow)
4. [Storing Tokens](#storing-tokens)
5. [Adding Token to Headers](#adding-token-to-headers)
6. [Auth Context Setup](#auth-context-setup)
7. [Protected Routes](#protected-routes)
8. [Complete Auth Implementation](#complete-auth-implementation)

---

## Authentication Overview

### What is Authentication?

**Definition:** Authentication is the process of verifying who a user is (identity verification).

### Auth vs Authorization

| Authentication | Authorization |
|---------------|---------------|
| Who are you? | What can you do? |
| Login process | Permission check |
| Verify identity | Access control |
| "Are you John?" | "Can John access admin?" |

### Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  Authentication Flow                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. User submits login form                                 │
│     │                                                        │
│     ▼                                                        │
│  2. Frontend sends credentials to backend                   │
│     POST /api/auth/login { email, password }                │
│     │                                                        │
│     ▼                                                        │
│  3. Backend validates credentials                           │
│     • Check if user exists                                  │
│     • Compare password hash                                 │
│     │                                                        │
│     ▼                                                        │
│  4. Backend returns JWT token                               │
│     { token: "eyJhbG...", user: { ... } }                   │
│     │                                                        │
│     ▼                                                        │
│  5. Frontend stores token (localStorage)                    │
│     localStorage.setItem('token', token)                    │
│     │                                                        │
│     ▼                                                        │
│  6. Token sent with every request                           │
│     Authorization: Bearer <token>                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## JWT (JSON Web Token)

### What is JWT?

**Definition:** JWT is a compact, URL-safe token format for securely transmitting information between parties.

### JWT Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      JWT Structure                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMjM0NSJ9.signature   │
│   └─────┬─────┘        └─────────┬─────────┘   └────┬────┘  │
│         │                        │                   │       │
│      HEADER                   PAYLOAD            SIGNATURE  │
│                                                              │
│   Header:   { "alg": "HS256", "typ": "JWT" }                │
│                                                              │
│   Payload:  { "userId": "12345", "role": "user",            │
│               "iat": 1234567890, "exp": 1234571490 }        │
│                                                              │
│   Signature: HMACSHA256(header + "." + payload, secret)     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### JWT Payload Common Fields

| Field | Full Name | Description |
|-------|-----------|-------------|
| `sub` | Subject | User identifier |
| `iat` | Issued At | When token was created |
| `exp` | Expiration | When token expires |
| `iss` | Issuer | Who created the token |
| `aud` | Audience | Intended recipient |

### Token Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    Token Lifecycle                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   User Login ────► Token Created ────► Stored in Client     │
│                    (exp: 1 hour)       (localStorage)        │
│                         │                                    │
│                         ▼                                    │
│   Token Valid ◄────── Check exp ───► Token Expired          │
│       │                                    │                 │
│       ▼                                    ▼                 │
│   Access Granted              Redirect to Login             │
│                               (or refresh token)             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Login & Register Flow

### Register Flow

```jsx
// Backend (Node.js/Express) - For context
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  // 1. Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  
  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // 3. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
  
  // 4. Generate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  
  // 5. Send response
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email }
  });
});
```

### Frontend Register

```jsx
// pages/Register.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      await register(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Create Account</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>
        
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
```

### Frontend Login

```jsx
// pages/Login.jsx
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get redirect path
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h1>Login</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
```

---

## Storing Tokens

### Storage Options Comparison

| Storage | Pros | Cons |
|---------|------|------|
| **localStorage** | Persists across sessions | XSS vulnerable |
| **sessionStorage** | Clears on tab close | XSS vulnerable |
| **Cookies (httpOnly)** | Not accessible by JS | Needs backend setup |
| **Memory (state)** | Most secure | Lost on refresh |

### localStorage Pattern (Most Common)

```jsx
// Store token
const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token
const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token
const removeToken = () => {
  localStorage.removeItem('token');
};

// Check if token exists
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
```

### Token Storage Service

```jsx
// services/tokenService.js
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const tokenService = {
  // Token operations
  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  
  // User operations
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  removeUser: () => localStorage.removeItem(USER_KEY),
  
  // Clear all auth data
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  
  // Check if authenticated
  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
  
  // Decode token (without verification)
  decodeToken: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  },
  
  // Check if token is expired
  isTokenExpired: () => {
    const decoded = tokenService.decodeToken();
    if (!decoded || !decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }
};
```

---

## Adding Token to Headers

### Method 1: Manual Headers

```jsx
// Add token to each request manually
const getProducts = async () => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/products', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
};
```

### Method 2: Axios Interceptor (Recommended)

```jsx
// services/api.js
import axios from 'axios';
import { tokenService } from './tokenService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Request interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      tokenService.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## Auth Context Setup

### Complete Auth Context

```jsx
// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { tokenService } from '../services/tokenService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = tokenService.getToken();
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Check if token is expired
      if (tokenService.isTokenExpired()) {
        tokenService.clearAuth();
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (err) {
      tokenService.clearAuth();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      tokenService.setToken(token);
      tokenService.setUser(user);
      setUser(user);
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', {
        name,
        email,
        password
      });
      const { token, user } = response.data;
      
      tokenService.setToken(token);
      tokenService.setUser(user);
      setUser(user);
      
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw err;
    }
  };

  const logout = () => {
    tokenService.clearAuth();
    setUser(null);
  };

  const updateProfile = async (updates) => {
    try {
      const response = await api.put('/auth/profile', updates);
      const updatedUser = response.data;
      
      tokenService.setUser(updatedUser);
      setUser(updatedUser);
      
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

## Protected Routes

### Protected Route Component

```jsx
// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

### Public Route (Redirect if Logged In)

```jsx
// components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  // Already logged in - redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;
```

### Route Setup

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth routes - redirect if logged in */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin only routes */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Error pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </AuthProvider>
  );
}
```

---

## Complete Auth Implementation

### File Structure

```
src/
├── contexts/
│   └── AuthContext.jsx
├── services/
│   ├── api.js
│   └── tokenService.js
├── components/
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
└── App.jsx
```

### Navbar with Auth State

```jsx
// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MyApp</Link>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            
            <div className="user-menu">
              <span>Hi, {user.name}</span>
              {user.role === 'admin' && (
                <Link to="/admin">Admin</Link>
              )}
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
```

### Dashboard with User Data

```jsx
// pages/Dashboard.jsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <section className="user-info">
          <h2>Profile Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <button onClick={() => navigate('/orders')}>View Orders</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
```

---

## 🎯 Mini Project: Complete Auth System

```jsx
// Complete working example structure

// 1. tokenService.js - Token management
// 2. api.js - Axios with interceptors
// 3. AuthContext.jsx - Auth state management
// 4. ProtectedRoute.jsx - Route protection
// 5. Login.jsx - Login page
// 6. Register.jsx - Register page
// 7. Dashboard.jsx - Protected page
// 8. Navbar.jsx - Conditional rendering
// 9. App.jsx - Route setup

// This creates a complete authentication flow:
// - User can register/login
// - Token stored in localStorage
// - Token sent with all API requests
// - Protected routes check authentication
// - Role-based access control
// - Automatic logout on token expiry
```

---

## 📝 Quick Summary

| Concept | Key Points |
|---------|------------|
| **JWT** | Token with header.payload.signature |
| **Login Flow** | Send credentials → Get token → Store token |
| **Storage** | localStorage (convenient), httpOnly cookie (secure) |
| **Headers** | `Authorization: Bearer <token>` |
| **Interceptors** | Auto-add token, handle 401 errors |
| **Auth Context** | Centralized auth state management |
| **Protected Routes** | Check auth before rendering |

### Security Checklist

- [ ] Store sensitive tokens securely
- [ ] Use HTTPS in production
- [ ] Implement token refresh
- [ ] Handle token expiration
- [ ] Validate on both client and server
- [ ] Use httpOnly cookies for maximum security

---

*Next: [08-Forms-Validation.md](./08-Forms-Validation.md)*
