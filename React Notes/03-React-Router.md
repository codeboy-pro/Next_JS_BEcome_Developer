# 🛣️ React Router - Complete Revision Notes

## Table of Contents
1. [What is React Router?](#what-is-react-router)
2. [Setup & Basic Routing](#setup--basic-routing)
3. [Navigation Methods](#navigation-methods)
4. [useNavigate Hook](#usenavigate-hook)
5. [useParams Hook](#useparams-hook)
6. [Dynamic Routes](#dynamic-routes)
7. [Protected Routes](#protected-routes)
8. [Nested Routes](#nested-routes)
9. [useLocation & useSearchParams](#uselocation--usesearchparams)

---

## What is React Router?

**Definition:** React Router is a standard routing library for React that enables navigation between views/pages in a Single Page Application (SPA).

### Key Concepts

| Concept | Description |
|---------|-------------|
| **SPA** | Single Page Application - only one HTML page, content changes dynamically |
| **Route** | Maps a URL path to a component |
| **Link** | Navigation element (no page reload) |
| **Router** | Container that keeps UI in sync with URL |

### How SPA Routing Works

```
Traditional Website:                 Single Page App (SPA):
┌────────────────────┐              ┌────────────────────┐
│ Click Link         │              │ Click Link         │
│        ↓           │              │        ↓           │
│ Server Request     │              │ JavaScript Updates │
│        ↓           │              │ URL (no reload)    │
│ New HTML Page      │              │        ↓           │
│ (Full Reload)      │              │ New Component      │
└────────────────────┘              │ Renders            │
                                    └────────────────────┘
```

---

## Setup & Basic Routing

### Installation

```bash
npm install react-router-dom
```

### Basic Setup (v6+)

```jsx
// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

### Basic Routes

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />  {/* 404 page */}
      </Routes>
      
      <Footer />
    </div>
  );
}
```

### Route Components Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    BrowserRouter                             │
│  (Wraps entire app - enables routing functionality)         │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                      Routes                          │   │
│   │  (Container for Route components)                    │   │
│   │                                                       │   │
│   │   ┌─────────────────────────────────────────────┐   │   │
│   │   │ Route path="/" element={<Home />}           │   │   │
│   │   ├─────────────────────────────────────────────┤   │   │
│   │   │ Route path="/about" element={<About />}     │   │   │
│   │   ├─────────────────────────────────────────────┤   │   │
│   │   │ Route path="/contact" element={<Contact />} │   │   │
│   │   ├─────────────────────────────────────────────┤   │   │
│   │   │ Route path="*" element={<NotFound />}       │   │   │
│   │   └─────────────────────────────────────────────┘   │   │
│   │                                                       │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Navigation Methods

### Link vs NavLink vs useNavigate

| Method | Use Case | Provides Active State |
|--------|----------|----------------------|
| `<Link>` | Basic navigation | ❌ No |
| `<NavLink>` | Navigation with active styling | ✅ Yes |
| `useNavigate` | Programmatic navigation | ❌ No |

### Link Component

```jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      
      {/* Link with state */}
      <Link to="/dashboard" state={{ from: 'home' }}>
        Dashboard
      </Link>
    </nav>
  );
}
```

### NavLink Component (Active Styling)

```jsx
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      {/* Method 1: Using className function */}
      <NavLink 
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>

      {/* Method 2: Using style function */}
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        About
      </NavLink>

      {/* Method 3: Using children function */}
      <NavLink to="/contact">
        {({ isActive }) => (
          <span className={isActive ? 'active-link' : ''}>
            Contact
          </span>
        )}
      </NavLink>
    </nav>
  );
}
```

---

## useNavigate Hook

### Definition
`useNavigate` returns a function that lets you navigate programmatically.

### Basic Usage

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // After successful login
    const success = await loginUser();
    
    if (success) {
      navigate('/dashboard');  // Navigate to dashboard
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Login</button>
    </form>
  );
}
```

### Navigation Options

```jsx
import { useNavigate } from 'react-router-dom';

function NavigationExamples() {
  const navigate = useNavigate();

  // Basic navigation
  const goToHome = () => navigate('/');
  
  // Navigate with replace (no back button)
  const goToLogin = () => navigate('/login', { replace: true });
  
  // Navigate with state
  const goToProduct = (productId) => {
    navigate(`/product/${productId}`, { 
      state: { from: 'products-list' } 
    });
  };
  
  // Go back
  const goBack = () => navigate(-1);
  
  // Go forward
  const goForward = () => navigate(1);
  
  // Go back 2 pages
  const goBack2 = () => navigate(-2);

  return (
    <div>
      <button onClick={goToHome}>Home</button>
      <button onClick={goBack}>← Back</button>
      <button onClick={goForward}>Forward →</button>
    </div>
  );
}
```

### Real MERN Example: After Form Submission

```jsx
function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      // Navigate to the new post
      navigate(`/posts/${data._id}`, {
        state: { message: 'Post created successfully!' }
      });
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  return <PostForm onSubmit={handleSubmit} loading={loading} />;
}
```

---

## useParams Hook

### Definition
`useParams` returns an object of key/value pairs of URL parameters.

### Basic Usage

```jsx
import { useParams } from 'react-router-dom';

// Route definition
<Route path="/users/:userId" element={<UserProfile />} />

// Component
function UserProfile() {
  const { userId } = useParams();
  
  return <h1>User ID: {userId}</h1>;
}

// URL: /users/123
// userId = "123"
```

### Multiple Parameters

```jsx
// Route definition
<Route path="/posts/:postId/comments/:commentId" element={<CommentDetail />} />

// Component
function CommentDetail() {
  const { postId, commentId } = useParams();
  
  return (
    <div>
      <p>Post ID: {postId}</p>
      <p>Comment ID: {commentId}</p>
    </div>
  );
}

// URL: /posts/42/comments/7
// postId = "42", commentId = "7"
```

### Real MERN Example: Fetching Single Product

```jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
}
```

---

## Dynamic Routes

### Dynamic Route Patterns

```jsx
function App() {
  return (
    <Routes>
      {/* Static route */}
      <Route path="/products" element={<ProductList />} />
      
      {/* Dynamic route - single param */}
      <Route path="/products/:id" element={<ProductDetail />} />
      
      {/* Dynamic route - multiple params */}
      <Route path="/users/:userId/posts/:postId" element={<UserPost />} />
      
      {/* Optional parameter (v6) */}
      <Route path="/search/:category?" element={<Search />} />
      
      {/* Catch-all / Splat route */}
      <Route path="/files/*" element={<FileExplorer />} />
    </Routes>
  );
}
```

### URL Patterns Table

| Route Pattern | Example URL | Params |
|--------------|-------------|--------|
| `/users/:id` | `/users/123` | `{ id: "123" }` |
| `/posts/:postId/comments/:commentId` | `/posts/5/comments/10` | `{ postId: "5", commentId: "10" }` |
| `/search/:category?` | `/search` or `/search/books` | `{ category: undefined }` or `{ category: "books" }` |
| `/files/*` | `/files/docs/report.pdf` | `{ "*": "docs/report.pdf" }` |

### Real MERN Example: E-commerce Routes

```jsx
function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />
      
      {/* Products */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/categories/:categoryName" element={<CategoryProducts />} />
      
      {/* User */}
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/user/:userId/orders" element={<UserOrders />} />
      <Route path="/user/:userId/orders/:orderId" element={<OrderDetail />} />
      
      {/* Search */}
      <Route path="/search" element={<SearchResults />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

---

## Protected Routes

### Concept Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Protected Route Flow                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   User tries to access /dashboard                           │
│               │                                              │
│               ▼                                              │
│   ┌─────────────────────┐                                   │
│   │ Is User Logged In?  │                                   │
│   └──────────┬──────────┘                                   │
│              │                                               │
│      ┌───────┴───────┐                                      │
│      │               │                                       │
│      ▼               ▼                                       │
│   ┌──────┐       ┌──────────┐                               │
│   │ Yes  │       │   No     │                               │
│   └──┬───┘       └────┬─────┘                               │
│      │                │                                      │
│      ▼                ▼                                      │
│ Show Dashboard    Redirect to                                │
│ Component         /login                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Basic Protected Route Component

```jsx
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('token'); // Simple check
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, but save the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage in routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### Protected Route with Context

```jsx
// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
      verifyToken(token)
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

```jsx
// components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // Not logged in - redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for required role (optional)
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}
```

### Redirect After Login

```jsx
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the page they tried to visit
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      await login(formData.get('email'), formData.get('password'));
      // Redirect back to where they came from
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Nested Routes

### Concept

```
URL: /dashboard/settings

┌─────────────────────────────────────────┐
│               Dashboard Layout          │
│  ┌─────────┬───────────────────────┐   │
│  │ Sidebar │     <Outlet />         │   │
│  │         │   ┌─────────────────┐ │   │
│  │ - Home  │   │    Settings     │ │   │
│  │ - Stats │   │    Component    │ │   │
│  │ - Users │   │                 │ │   │
│  │         │   └─────────────────┘ │   │
│  └─────────┴───────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Implementation

```jsx
import { Routes, Route, Outlet, Link } from 'react-router-dom';

// App.jsx - Main Routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Nested routes */}
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}

// DashboardLayout.jsx - Parent with Outlet
function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/settings">Settings</Link>
          <Link to="/dashboard/users">Users</Link>
        </nav>
      </aside>
      
      <main className="content">
        {/* Child routes render here */}
        <Outlet />
      </main>
    </div>
  );
}

// DashboardHome.jsx - Index route
function DashboardHome() {
  return <h1>Welcome to Dashboard</h1>;
}
```

### Index Route

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  {/* Index route - renders at /dashboard */}
  <Route index element={<DashboardHome />} />
  
  {/* Other routes */}
  <Route path="settings" element={<Settings />} />
</Route>
```

---

## useLocation & useSearchParams

### useLocation

```jsx
import { useLocation } from 'react-router-dom';

function CurrentLocation() {
  const location = useLocation();

  // location object:
  // {
  //   pathname: "/products/123",
  //   search: "?color=red&size=large",
  //   hash: "#reviews",
  //   state: { from: "home" },
  //   key: "default"
  // }

  return (
    <div>
      <p>Path: {location.pathname}</p>
      <p>Search: {location.search}</p>
      <p>Hash: {location.hash}</p>
      <p>State: {JSON.stringify(location.state)}</p>
    </div>
  );
}
```

### useSearchParams

```jsx
import { useSearchParams } from 'react-router-dom';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get params
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page')) || 1;

  // Set params
  const handleCategoryChange = (newCategory) => {
    setSearchParams({ 
      category: newCategory, 
      sort, 
      page: '1'  // Reset to page 1
    });
  };

  const handleSortChange = (newSort) => {
    setSearchParams(prev => {
      prev.set('sort', newSort);
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  return (
    <div>
      {/* Category filter */}
      <select 
        value={category || ''} 
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>

      {/* Sort */}
      <select 
        value={sort} 
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      {/* Products list */}
      <ProductGrid category={category} sort={sort} page={page} />

      {/* Pagination */}
      <button onClick={() => handlePageChange(page - 1)}>Prev</button>
      <span>Page {page}</span>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
}

// URL example: /products?category=electronics&sort=price-low&page=2
```

---

## 🎯 Mini Project: Complete Routing Setup

```jsx
// App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <DashboardRoutes />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

// Nested dashboard routes
function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="orders" element={<Orders />} />
      <Route path="orders/:orderId" element={<OrderDetail />} />
    </Routes>
  );
}

export default App;
```

---

## 📝 Quick Summary

| Hook/Component | Purpose |
|---------------|---------|
| `<BrowserRouter>` | Wrap app to enable routing |
| `<Routes>` | Container for Route components |
| `<Route>` | Define path → component mapping |
| `<Link>` | Navigate without reload |
| `<NavLink>` | Link with active state |
| `<Outlet>` | Render child routes |
| `<Navigate>` | Redirect component |
| `useNavigate()` | Programmatic navigation |
| `useParams()` | Get URL parameters |
| `useLocation()` | Get current location object |
| `useSearchParams()` | Get/set query parameters |

### Common Route Patterns

```jsx
<Route path="/" element={<Home />} />              // Exact path
<Route path="/users/:id" element={<User />} />     // Dynamic param
<Route path="/docs/*" element={<Docs />} />        // Catch-all
<Route index element={<Index />} />                // Default child
<Route path="*" element={<NotFound />} />          // 404
```

---

*Next: [04-Component-Architecture.md](./04-Component-Architecture.md)*
