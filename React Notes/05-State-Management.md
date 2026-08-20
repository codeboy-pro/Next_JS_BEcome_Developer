# 🗃️ State Management - Complete Revision Notes

## Table of Contents
1. [State Management Overview](#state-management-overview)
2. [Local State (useState)](#local-state-usestate)
3. [Context API](#context-api)
4. [useReducer Pattern](#usereducer-pattern)
5. [Context + useReducer](#context--usereducer)
6. [Redux Toolkit (Basics)](#redux-toolkit-basics)
7. [When to Use What](#when-to-use-what)

---

## State Management Overview

### Types of State

| Type | Description | Example |
|------|-------------|---------|
| **Local State** | State in single component | Form inputs, toggles |
| **Lifted State** | State shared between siblings | Filter affecting list |
| **Global State** | State needed everywhere | User auth, theme |
| **Server State** | Data from API | Products, users |
| **URL State** | State in URL | Search params, page |

### State Management Solutions

```
┌─────────────────────────────────────────────────────────────┐
│                 State Management Options                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Simple ◄────────────────────────────────────────► Complex │
│                                                              │
│   useState     useReducer     Context API     Redux Toolkit │
│      │              │              │                │        │
│      │              │              │                │        │
│   Local         Complex        Avoid Prop       Large-scale │
│   State         Logic          Drilling         Apps        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Local State (useState)

### When to Use
- Component-specific state
- Form inputs
- UI state (modals, dropdowns)
- Simple counters/toggles

### Examples

```jsx
import { useState } from 'react';

function LocalStateExamples() {
  // Simple values
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Arrays
  const [items, setItems] = useState([]);
  
  // Objects
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  // Update object (preserve other properties)
  const updateEmail = (email) => {
    setForm(prev => ({ ...prev, email }));
  };

  // Add to array
  const addItem = (item) => {
    setItems(prev => [...prev, item]);
  };

  // Remove from array
  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    // JSX
  );
}
```

### Lifting State Up

```jsx
// ❌ Before: State in each component (can't sync)
function SearchPage() {
  return (
    <>
      <SearchInput />  {/* Has its own state */}
      <SearchResults /> {/* Has its own state */}
    </>
  );
}

// ✅ After: State lifted to parent
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    const data = await searchAPI(searchQuery);
    setResults(data);
  };

  return (
    <>
      <SearchInput value={query} onSearch={handleSearch} />
      <SearchResults results={results} />
    </>
  );
}
```

---

## Context API

### When to Use
- Avoid prop drilling (passing props through many levels)
- Global data: Theme, User, Language
- Moderately complex state

### Context API Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     Context Flow                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. createContext() ─────► Create the context                │
│                                                              │
│  2. <Context.Provider value={...}> ─► Provide value at top  │
│                                                              │
│  3. useContext(Context) ─────────► Consume anywhere below   │
│                                                              │
└─────────────────────────────────────────────────────────────┘

    ┌─────────────────────────┐
    │    ThemeProvider        │ value={{ theme, setTheme }}
    │  ┌───────────────────┐  │
    │  │       App         │  │
    │  │  ┌─────────────┐  │  │
    │  │  │   Navbar    │  │  │◄─── Can access theme
    │  │  └─────────────┘  │  │
    │  │  ┌─────────────┐  │  │
    │  │  │   Content   │  │  │
    │  │  │ ┌─────────┐ │  │  │
    │  │  │ │ Button  │ │  │  │◄─── Can access theme
    │  │  │ └─────────┘ │  │  │
    │  │  └─────────────┘  │  │
    │  └───────────────────┘  │
    └─────────────────────────┘
```

### Complete Theme Context Example

```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create Context
const ThemeContext = createContext(null);

// 2. Create Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Custom Hook (recommended)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Default export
export default ThemeContext;
```

```jsx
// main.jsx
import { ThemeProvider } from './contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

```jsx
// components/ThemeToggle.jsx
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

### Auth Context Example (MERN)

```jsx
// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authAPI.getProfile();
        setUser(userData);
      }
    } catch (err) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const { token, user } = await authAPI.login(email, password);
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const { token, user } = await authAPI.register(userData);
      localStorage.setItem('token', token);
      setUser(user);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
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

## useReducer Pattern

### When to Use
- Complex state logic
- Multiple sub-values
- Next state depends on previous
- State transitions need to be predictable

### useReducer vs useState

| useState | useReducer |
|----------|------------|
| Simple state | Complex state |
| Independent values | Related values |
| Simple updates | State machine logic |
| `setState(newValue)` | `dispatch({ type, payload })` |

### Reducer Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Reducer Pattern                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Action                     Reducer                 State   │
│   { type, payload }  ───►  (state, action)  ───►   newState │
│                              switch(type)                    │
│                                                              │
│   Example:                                                   │
│   { type: 'ADD_TODO',    case 'ADD_TODO':     { todos: [    │
│     payload: 'Buy milk'    return {             'Buy milk'  │
│   }                          todos: [...,       ]           │
│                              action.payload]   }             │
│                            }                                 │
└─────────────────────────────────────────────────────────────┘
```

### Basic useReducer Example

```jsx
import { useReducer } from 'react';

// Initial state
const initialState = {
  count: 0,
  step: 1
};

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'RESET':
      return initialState;
    case 'SET_STEP':
      return { ...state, step: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      
      <input
        type="number"
        value={state.step}
        onChange={(e) => dispatch({ 
          type: 'SET_STEP', 
          payload: Number(e.target.value) 
        })}
      />
    </div>
  );
}
```

### Shopping Cart Reducer Example

```jsx
// reducers/cartReducer.js
export const cartInitialState = {
  items: [],
  total: 0,
  itemCount: 0
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      let newItems;
      if (existingIndex >= 0) {
        // Item exists, increase quantity
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => item._id !== action.payload
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const newItems = state.items.map(item =>
        item._id === id ? { ...item, quantity } : item
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    }

    case 'CLEAR_CART':
      return cartInitialState;

    default:
      return state;
  }
}

// Helper functions
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateItemCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
```

---

## Context + useReducer

### The Power Combo

Combine Context (for global access) + useReducer (for complex logic)

```
┌─────────────────────────────────────────────────────────────┐
│              Context + useReducer Pattern                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌───────────────────────────────────────────────┐         │
│   │              CartContext.Provider              │         │
│   │         value={{ state, dispatch }}            │         │
│   │                                                │         │
│   │   ┌─────────────────────────────────────────┐ │         │
│   │   │              useReducer                  │ │         │
│   │   │   state ◄──── reducer ◄──── dispatch    │ │         │
│   │   └─────────────────────────────────────────┘ │         │
│   │                                                │         │
│   │   Any component can:                          │         │
│   │   • Read state with useContext                │         │
│   │   • Update state with dispatch                │         │
│   └───────────────────────────────────────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Complete Cart Context Example

```jsx
// contexts/CartContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react';
import { cartReducer, cartInitialState } from '../reducers/cartReducer';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Initialize from localStorage
  const [state, dispatch] = useReducer(cartReducer, cartInitialState, () => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : cartInitialState;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Action creators (optional but cleaner)
  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    ...state,           // items, total, itemCount
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
```

```jsx
// components/ProductCard.jsx
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}
```

```jsx
// components/CartSummary.jsx
import { useCart } from '../contexts/CartContext';

function CartSummary() {
  const { items, total, itemCount, removeItem, updateQuantity } = useCart();

  return (
    <div className="cart-summary">
      <h2>Cart ({itemCount} items)</h2>
      
      {items.map(item => (
        <div key={item._id} className="cart-item">
          <span>{item.name}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
            min="1"
          />
          <span>${item.price * item.quantity}</span>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
      
      <div className="cart-total">
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
}
```

---

## Redux Toolkit (Basics)

### When to Use Redux
- Very large applications
- Complex state with many reducers
- Need middleware (logging, async)
- Team prefers Redux patterns
- DevTools for debugging

### Redux Toolkit Setup

```bash
npm install @reduxjs/toolkit react-redux
```

### Redux Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Redux Flow                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   UI Component                                               │
│       │                                                      │
│       │ dispatch(action)                                    │
│       ▼                                                      │
│   ┌──────────┐                                              │
│   │  Action  │  { type: 'counter/increment' }               │
│   └────┬─────┘                                              │
│        │                                                     │
│        ▼                                                     │
│   ┌──────────┐                                              │
│   │  Store   │  Sends to reducers                           │
│   └────┬─────┘                                              │
│        │                                                     │
│        ▼                                                     │
│   ┌──────────┐                                              │
│   │ Reducer  │  Updates state                               │
│   └────┬─────┘                                              │
│        │                                                     │
│        ▼                                                     │
│   New State ───► UI re-renders                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Basic Redux Toolkit Example

```jsx
// store/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;  // RTK uses Immer, so mutation is OK
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
```

```jsx
// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  }
});
```

```jsx
// main.jsx
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

```jsx
// components/Counter.jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/slices/counterSlice';

function Counter() {
  // Select state
  const count = useSelector((state) => state.counter.value);
  
  // Get dispatch function
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```

### Async Actions with createAsyncThunk

```jsx
// store/slices/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default productsSlice.reducer;

// Usage in component
function Products() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
```

---

## When to Use What

### Decision Chart

```
┌─────────────────────────────────────────────────────────────┐
│                 State Management Decision                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Is state local to one component?                           │
│      │                                                       │
│      ├── YES ──► useState                                   │
│      │                                                       │
│      └── NO                                                  │
│           │                                                  │
│           ▼                                                  │
│  Is the state logic complex?                                │
│      │                                                       │
│      ├── NO ──► Lift state up + useState                    │
│      │                                                       │
│      └── YES ──► useReducer                                 │
│           │                                                  │
│           ▼                                                  │
│  Do many components need it?                                │
│      │                                                       │
│      ├── NO ──► useReducer + props                          │
│      │                                                       │
│      └── YES ──► Context + useReducer                       │
│           │                                                  │
│           ▼                                                  │
│  Is it a very large app?                                    │
│      │                                                       │
│      ├── NO ──► Context + useReducer is enough              │
│      │                                                       │
│      └── YES ──► Consider Redux Toolkit                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Quick Reference

| Scenario | Solution |
|----------|----------|
| Form input state | `useState` |
| Toggle/modal state | `useState` |
| Complex form with validation | `useReducer` |
| Theme preference | Context |
| User authentication | Context + `useReducer` |
| Shopping cart | Context + `useReducer` |
| Large app with many features | Redux Toolkit |
| Server state (API data) | React Query / SWR |

---

## 📝 Quick Summary

| Pattern | When to Use | Complexity |
|---------|-------------|------------|
| `useState` | Simple, local state | ⭐ |
| Lifted State | Shared between siblings | ⭐⭐ |
| `useReducer` | Complex state logic | ⭐⭐ |
| Context API | Avoid prop drilling | ⭐⭐ |
| Context + useReducer | Global + Complex | ⭐⭐⭐ |
| Redux Toolkit | Large-scale apps | ⭐⭐⭐⭐ |

### Key Takeaways

1. **Start Simple** - Use `useState` until you need more
2. **Lift State** - When siblings need to share state
3. **Context for Global** - Auth, Theme, Language
4. **useReducer for Complex** - Multiple related values
5. **Redux for Scale** - Large teams/apps

---

*Next: [06-API-Integration.md](./06-API-Integration.md)*
