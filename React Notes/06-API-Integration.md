# 🌐 API Integration - Complete Revision Notes

## Table of Contents
1. [API Basics](#api-basics)
2. [Fetch vs Axios](#fetch-vs-axios)
3. [CRUD Operations](#crud-operations)
4. [Handling Loading & Errors](#handling-loading--errors)
5. [API Service Structure](#api-service-structure)
6. [Custom useFetch Hook](#custom-usefetch-hook)
7. [Real MERN Examples](#real-mern-examples)

---

## API Basics

### What is an API?

**Definition:** API (Application Programming Interface) is a way for your React frontend to communicate with your backend server.

### REST API Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Read/Retrieve data | Get all products |
| `POST` | Create new data | Create new user |
| `PUT` | Update entire resource | Update user profile |
| `PATCH` | Partial update | Update user email only |
| `DELETE` | Remove data | Delete a product |

### API Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    API Request Flow                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   React Frontend              Backend API          Database │
│   ┌──────────┐               ┌──────────┐        ┌────────┐│
│   │          │   HTTP        │          │  Query │        ││
│   │   fetch  │──────────────►│  Express │───────►│MongoDB ││
│   │  /axios  │   Request     │  Server  │        │        ││
│   │          │               │          │        │        ││
│   │          │◄──────────────│          │◄───────│        ││
│   │          │   JSON        │          │  Data  │        ││
│   └──────────┘   Response    └──────────┘        └────────┘│
│                                                              │
│   Example:                                                   │
│   GET /api/products ─────► app.get('/api/products') ─────►  │
│   ◄───── { products: [...] } ◄───── Product.find()         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Fetch vs Axios

### Comparison Table

| Feature | Fetch (Built-in) | Axios (Library) |
|---------|------------------|-----------------|
| Installation | None | `npm install axios` |
| JSON parsing | Manual `.json()` | Automatic |
| Error handling | Only network errors | HTTP errors too |
| Request timeout | Manual | Built-in |
| Interceptors | No | Yes |
| Request cancellation | AbortController | CancelToken |
| Browser support | Modern browsers | All browsers |

### Fetch Examples

```jsx
// GET Request
async function getProducts() {
  try {
    const response = await fetch('/api/products');
    
    // Fetch doesn't throw on HTTP errors, check manually
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();  // Must parse JSON manually
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// POST Request
async function createProduct(productData) {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create error:', error);
    throw error;
  }
}
```

### Axios Examples

```jsx
import axios from 'axios';

// GET Request
async function getProducts() {
  try {
    const response = await axios.get('/api/products');
    return response.data;  // Already parsed
  } catch (error) {
    // Axios throws on HTTP errors automatically
    console.error('Axios error:', error.response?.data || error.message);
    throw error;
  }
}

// POST Request
async function createProduct(productData) {
  try {
    const response = await axios.post('/api/products', productData);
    return response.data;
  } catch (error) {
    console.error('Create error:', error.response?.data || error.message);
    throw error;
  }
}
```

### Axios Instance (Recommended)

```jsx
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## CRUD Operations

### Complete CRUD Example

```jsx
// services/productApi.js
import api from './api';

export const productAPI = {
  // GET all products
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // GET single product
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // POST - Create product
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // PUT - Full update
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // PATCH - Partial update
  partialUpdate: async (id, updates) => {
    const response = await api.patch(`/products/${id}`, updates);
    return response.data;
  },

  // DELETE
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Search products
  search: async (query) => {
    const response = await api.get('/products/search', {
      params: { q: query }
    });
    return response.data;
  }
};
```

### Using in Components

```jsx
// pages/Products.jsx
import { useState, useEffect } from 'react';
import { productAPI } from '../services/productApi';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET - Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getAll();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // POST - Create new product
  const handleCreate = async (formData) => {
    try {
      const newProduct = await productAPI.create(formData);
      setProducts([...products, newProduct]);
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT - Update product
  const handleUpdate = async (id, formData) => {
    try {
      const updated = await productAPI.update(id, formData);
      setProducts(products.map(p => p._id === id ? updated : p));
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE - Remove product
  const handleDelete = async (id) => {
    try {
      await productAPI.delete(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard 
          key={product._id}
          product={product}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

---

## Handling Loading & Errors

### State Pattern

```jsx
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await api.get('/endpoint');
        setData(result.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
}
```

### Reusable Loading Component

```jsx
// components/common/LoadingSpinner.jsx
function LoadingSpinner({ size = 'medium', text = 'Loading...' }) {
  return (
    <div className={`spinner-container spinner-${size}`}>
      <div className="spinner"></div>
      {text && <p>{text}</p>}
    </div>
  );
}

// CSS
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### Reusable Error Component

```jsx
// components/common/ErrorMessage.jsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <span className="error-icon">⚠️</span>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}

// Usage
<ErrorMessage 
  message={error} 
  onRetry={() => fetchData()} 
/>
```

### Loading States Pattern

```jsx
// Multiple loading states
function Dashboard() {
  const [loading, setLoading] = useState({
    users: true,
    products: true,
    orders: true
  });

  const [data, setData] = useState({
    users: [],
    products: [],
    orders: []
  });

  useEffect(() => {
    // Fetch in parallel
    Promise.all([
      api.get('/users'),
      api.get('/products'),
      api.get('/orders')
    ]).then(([usersRes, productsRes, ordersRes]) => {
      setData({
        users: usersRes.data,
        products: productsRes.data,
        orders: ordersRes.data
      });
      setLoading({
        users: false,
        products: false,
        orders: false
      });
    });
  }, []);

  return (
    <div className="dashboard">
      <section>
        {loading.users ? <Spinner /> : <UserList users={data.users} />}
      </section>
      <section>
        {loading.products ? <Spinner /> : <ProductList products={data.products} />}
      </section>
    </div>
  );
}
```

---

## API Service Structure

### Recommended Folder Structure

```
src/
├── services/
│   ├── api.js              # Axios instance
│   ├── authApi.js          # Auth endpoints
│   ├── userApi.js          # User endpoints
│   ├── productApi.js       # Product endpoints
│   ├── orderApi.js         # Order endpoints
│   └── index.js            # Barrel export
```

### Base API Configuration

```jsx
// services/api.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log in development
    if (import.meta.env.DEV) {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`📥 ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle specific error codes
    if (response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    if (response?.status === 403) {
      window.location.href = '/unauthorized';
    }
    
    if (response?.status === 500) {
      console.error('Server error:', response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

### Auth API Service

```jsx
// services/authApi.js
import api from './api';

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (updates) => {
    const response = await api.put('/auth/profile', updates);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await api.post(`/auth/reset-password/${token}`, {
      password: newPassword
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};
```

### Barrel Export

```jsx
// services/index.js
export { default as api } from './api';
export { authAPI } from './authApi';
export { userAPI } from './userApi';
export { productAPI } from './productApi';
export { orderAPI } from './orderApi';

// Usage
import { authAPI, productAPI } from '@/services';
```

---

## Custom useFetch Hook

### Basic useFetch Hook

```jsx
// hooks/useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: Abort fetch on unmount
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;

// Usage
function Products() {
  const { data: products, loading, error } = useFetch('/api/products');

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;

  return <ProductList products={products} />;
}
```

### Advanced useFetch with Refetch

```jsx
// hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

function useFetch(url, { immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(url, { params });
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData
  };
}

export default useFetch;

// Usage
function Products() {
  const { 
    data: products, 
    loading, 
    error, 
    refetch 
  } = useFetch('/products');

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {/* ... */}
    </div>
  );
}
```

### useMutation Hook for POST/PUT/DELETE

```jsx
// hooks/useMutation.js
import { useState } from 'react';
import api from '../services/api';

function useMutation(method = 'post') {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (url, body = null) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api[method](url, body);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
}

export default useMutation;

// Usage
function CreateProduct() {
  const { mutate, loading, error } = useMutation('post');

  const handleSubmit = async (formData) => {
    try {
      await mutate('/products', formData);
      alert('Product created!');
    } catch (err) {
      // Error already set in hook
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create Product'}
      </button>
    </form>
  );
}
```

---

## Real MERN Examples

### Example 1: Product Listing with Filters

```jsx
// pages/Products.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/productApi';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });

  // Get filter values from URL
  const filters = {
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAll(filters);
        setProducts(response.products);
        setPagination({
          page: response.page,
          totalPages: response.totalPages,
          total: response.total
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]); // Refetch when URL params change

  const updateFilter = (key, value) => {
    setSearchParams(prev => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      prev.set('page', '1'); // Reset to page 1
      return prev;
    });
  };

  return (
    <div className="products-page">
      {/* Filters */}
      <aside className="filters">
        <input
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
        
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => updateFilter('sort', e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </aside>

      {/* Products */}
      <main>
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && (
          <>
            <p>Showing {products.length} of {pagination.total} products</p>
            
            <div className="product-grid">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page) => updateFilter('page', page.toString())}
            />
          </>
        )}
      </main>
    </div>
  );
}
```

### Example 2: CRUD Dashboard

```jsx
// pages/admin/ProductsAdmin.jsx
import { useState, useEffect } from 'react';
import { productAPI } from '../../services/productApi';

function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create
  const handleCreate = async (formData) => {
    try {
      const newProduct = await productAPI.create(formData);
      setProducts([newProduct, ...products]);
      setIsModalOpen(false);
    } catch (err) {
      throw err; // Let form handle the error
    }
  };

  // Update
  const handleUpdate = async (formData) => {
    try {
      const updated = await productAPI.update(editingProduct._id, formData);
      setProducts(products.map(p => 
        p._id === updated._id ? updated : p
      ));
      setEditingProduct(null);
      setIsModalOpen(false);
    } catch (err) {
      throw err;
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    
    try {
      await productAPI.delete(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // Open modal for editing
  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Open modal for creating
  const openCreateModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

  return (
    <div className="admin-products">
      <header>
        <h1>Manage Products</h1>
        <button onClick={openCreateModal}>+ Add Product</button>
      </header>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><img src={product.image} alt="" width="50" /></td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => openEditModal(product)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
```

---

## 📝 Quick Summary

| Concept | Key Points |
|---------|------------|
| **Fetch** | Built-in, manual JSON parsing, manual error handling |
| **Axios** | Library, auto JSON, interceptors, better errors |
| **GET** | Retrieve data, use useEffect |
| **POST** | Create data, handle form submit |
| **PUT/PATCH** | Update data |
| **DELETE** | Remove data |
| **Loading State** | Show spinner while fetching |
| **Error State** | Display error message, offer retry |
| **API Service** | Separate API logic from components |

### Best Practices

1. **Use Axios instance** with interceptors
2. **Separate API services** by resource
3. **Handle all states** (loading, error, empty, success)
4. **Use custom hooks** for reusable data fetching
5. **Cancel requests** on component unmount
6. **Use environment variables** for API URLs

---

*Next: [07-Authentication-Flow.md](./07-Authentication-Flow.md)*
