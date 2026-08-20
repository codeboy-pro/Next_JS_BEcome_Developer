# 🏗️ Component Architecture - Complete Revision Notes

## Table of Contents
1. [Why Component Architecture Matters](#why-component-architecture-matters)
2. [Folder Structure](#folder-structure)
3. [Container vs Presentational Components](#container-vs-presentational-components)
4. [Reusable Components](#reusable-components)
5. [Component Composition Patterns](#component-composition-patterns)
6. [Best Practices](#best-practices)

---

## Why Component Architecture Matters

**Definition:** Component architecture is how you organize, structure, and design your React components for maintainability, scalability, and reusability.

### Benefits

| Benefit | Description |
|---------|-------------|
| **Maintainability** | Easy to find and update code |
| **Scalability** | Easy to add new features |
| **Reusability** | Components can be used across the app |
| **Testability** | Easier to write unit tests |
| **Team Collaboration** | Clear structure helps team members |

---

## Folder Structure

### Basic Structure (Small Projects)

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   └── Navbar.jsx
├── pages/              # Page components (routes)
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```

### Intermediate Structure (Medium Projects)

```
src/
├── assets/             # Images, fonts, static files
│   ├── images/
│   └── fonts/
├── components/         # Reusable components
│   ├── common/         # Generic components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   └── Modal/
│   └── layout/         # Layout components
│       ├── Navbar/
│       ├── Footer/
│       └── Sidebar/
├── pages/              # Page components
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── index.js
│   ├── Dashboard/
│   └── Profile/
├── hooks/              # Custom hooks
│   ├── useAuth.js
│   ├── useFetch.js
│   └── useLocalStorage.js
├── context/            # Context providers
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── services/           # API calls
│   ├── api.js
│   ├── authService.js
│   └── userService.js
├── utils/              # Utility functions
│   ├── formatDate.js
│   ├── validators.js
│   └── constants.js
├── App.jsx
└── main.jsx
```

### Advanced Structure (Large Projects / MERN)

```
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── styles/
│       ├── globals.css
│       └── variables.css
│
├── components/
│   ├── common/              # Shared UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Spinner/
│   │   └── index.js         # Barrel export
│   │
│   ├── forms/               # Form-related components
│   │   ├── FormField/
│   │   ├── FormError/
│   │   └── FormGroup/
│   │
│   ├── layout/              # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── MainLayout/
│   │
│   └── features/            # Feature-specific components
│       ├── auth/
│       │   ├── LoginForm/
│       │   ├── RegisterForm/
│       │   └── ForgotPassword/
│       ├── products/
│       │   ├── ProductCard/
│       │   ├── ProductList/
│       │   └── ProductFilter/
│       └── cart/
│           ├── CartItem/
│           ├── CartSummary/
│           └── CartDrawer/
│
├── pages/
│   ├── Home/
│   ├── Products/
│   ├── ProductDetail/
│   ├── Cart/
│   ├── Checkout/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── Dashboard/
│       ├── DashboardHome.jsx
│       ├── Orders.jsx
│       └── Settings.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useFetch.js
│   ├── useCart.js
│   ├── useDebounce.js
│   └── useLocalStorage.js
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── ThemeContext.jsx
│   └── index.js
│
├── services/
│   ├── api/
│   │   ├── axios.js         # Axios instance config
│   │   ├── authApi.js
│   │   ├── productApi.js
│   │   └── orderApi.js
│   └── storage/
│       └── localStorage.js
│
├── utils/
│   ├── formatters.js
│   ├── validators.js
│   ├── constants.js
│   └── helpers.js
│
├── routes/
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── PublicRoute.jsx
│
├── App.jsx
└── main.jsx
```

### Barrel Exports (index.js)

```jsx
// components/common/index.js
export { default as Button } from './Button/Button';
export { default as Input } from './Input/Input';
export { default as Modal } from './Modal/Modal';
export { default as Card } from './Card/Card';
export { default as Spinner } from './Spinner/Spinner';

// Usage in other files
import { Button, Input, Modal } from '@/components/common';
```

---

## Container vs Presentational Components

### Concept Diagram

```
┌─────────────────────────────────────────────────────────────┐
│           Container vs Presentational Pattern                │
├─────────────────────────────┬───────────────────────────────┤
│     Container (Smart)        │     Presentational (Dumb)     │
├─────────────────────────────┼───────────────────────────────┤
│ • Manages state             │ • Receives data via props     │
│ • Fetches data              │ • Pure display component      │
│ • Contains business logic   │ • No state (or UI state only) │
│ • Calls API                 │ • Highly reusable             │
│ • Passes data to children   │ • Easy to test                │
└─────────────────────────────┴───────────────────────────────┘

Example Flow:
┌──────────────────────┐
│ UserListContainer    │ ◄── Fetches users from API
│ (Container)          │     Manages loading/error state
└──────────┬───────────┘
           │ passes users as props
           ▼
┌──────────────────────┐
│     UserList         │ ◄── Just renders the list
│  (Presentational)    │     No knowledge of where data comes from
└──────────┬───────────┘
           │ maps through users
           ▼
┌──────────────────────┐
│     UserCard         │ ◄── Displays single user
│  (Presentational)    │     Completely reusable
└──────────────────────┘
```

### Container Component Example

```jsx
// containers/UserListContainer.jsx
import { useState, useEffect } from 'react';
import { getUsers } from '../services/userApi';
import UserList from '../components/UserList';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';

function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <UserList 
      users={users} 
      onDelete={handleDeleteUser} 
    />
  );
}

export default UserListContainer;
```

### Presentational Component Example

```jsx
// components/UserList.jsx
import UserCard from './UserCard';

function UserList({ users, onDelete }) {
  if (users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard 
          key={user._id} 
          user={user} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default UserList;
```

```jsx
// components/UserCard.jsx
function UserCard({ user, onDelete }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onDelete(user._id)}>
        Delete
      </button>
    </div>
  );
}

export default UserCard;
```

### Modern Approach: Custom Hooks

```jsx
// hooks/useUsers.js
import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../services/userApi';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  return { users, loading, error, removeUser, refetch: fetchUsers };
}

export default useUsers;

// Usage in component
function UserPage() {
  const { users, loading, error, removeUser } = useUsers();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return <UserList users={users} onDelete={removeUser} />;
}
```

---

## Reusable Components

### Principles of Reusable Components

| Principle | Description |
|-----------|-------------|
| **Single Responsibility** | Component does one thing well |
| **Props for Configuration** | Behavior controlled via props |
| **Sensible Defaults** | Works without all props |
| **Consistent API** | Similar components have similar props |
| **No Hard-coded Data** | All data comes from props |

### Example: Reusable Button Component

```jsx
// components/common/Button/Button.jsx
import './Button.css';

function Button({
  children,
  variant = 'primary',  // 'primary' | 'secondary' | 'danger' | 'ghost'
  size = 'medium',      // 'small' | 'medium' | 'large'
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    loading && 'btn-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <>
          <span className="spinner" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;

// Usage examples
<Button>Default Button</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger" size="small">Delete</Button>
<Button loading>Submitting...</Button>
<Button fullWidth onClick={handleClick}>Full Width</Button>
```

### Example: Reusable Input Component

```jsx
// components/common/Input/Input.jsx
import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  icon,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className={`input-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`input ${error ? 'input-error' : ''} ${icon ? 'has-icon' : ''}`}
          {...rest}
        />
      </div>
      
      {(error || helperText) && (
        <span className={`input-helper ${error ? 'error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

// Usage examples
<Input label="Email" type="email" required />
<Input label="Password" type="password" error="Password is required" />
<Input placeholder="Search..." icon={<SearchIcon />} />
```

### Example: Reusable Card Component

```jsx
// components/common/Card/Card.jsx
import './Card.css';

function Card({ 
  children, 
  title,
  subtitle,
  image,
  actions,
  hoverable = false,
  className = '',
  onClick
}) {
  return (
    <div 
      className={`card ${hoverable ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
    >
      {image && (
        <div className="card-image">
          <img src={image} alt={title || 'Card image'} />
        </div>
      )}
      
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {children}
      </div>
      
      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}
    </div>
  );
}

export default Card;

// Usage
<Card 
  title="Product Name"
  subtitle="$99.99"
  image="/product.jpg"
  hoverable
  actions={
    <>
      <Button size="small">Add to Cart</Button>
      <Button size="small" variant="ghost">View</Button>
    </>
  }
>
  <p>Product description goes here...</p>
</Card>
```

### Example: Reusable Modal Component

```jsx
// components/common/Modal/Modal.jsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium', // 'small' | 'medium' | 'large'
  closeOnOverlay = true,
  closeOnEscape = true,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal modal-${size}`}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modal;

// Usage
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger">Delete</Button>
          </>
        }
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </>
  );
}
```

---

## Component Composition Patterns

### 1. Children Prop Pattern

```jsx
// Layout component using children
function PageLayout({ children }) {
  return (
    <div className="page-layout">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Usage
<PageLayout>
  <h1>Welcome</h1>
  <p>This is the content</p>
</PageLayout>
```

### 2. Compound Components Pattern

```jsx
// Compound component pattern (like HTML select/option)
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabList({ children }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Tab = function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={`tab ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className="tab-panel">{children}</div>;
};

// Usage
<Tabs defaultTab="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Panel value="tab1">Content for Tab 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content for Tab 2</Tabs.Panel>
  <Tabs.Panel value="tab3">Content for Tab 3</Tabs.Panel>
</Tabs>
```

### 3. Render Props Pattern

```jsx
// Render props for data fetching
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading, error });
}

// Usage
<DataFetcher 
  url="/api/users"
  render={({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <Error message={error.message} />;
    return <UserList users={data} />;
  }}
/>
```

### 4. Higher-Order Component (HOC) Pattern

```jsx
// HOC for adding authentication check
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;

    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);

// In routes
<Route path="/dashboard" element={<ProtectedDashboard />} />
```

---

## Best Practices

### Component Design Checklist

| ✅ Do | ❌ Don't |
|-------|---------|
| Single responsibility | Multiple unrelated tasks |
| Props for configuration | Hard-coded values |
| Meaningful component names | Generic names like `Component1` |
| Keep components small (< 200 lines) | Giant components |
| Extract reusable logic to hooks | Duplicate logic |
| Use TypeScript/PropTypes | Untyped props |

### Naming Conventions

```jsx
// Components - PascalCase
function UserProfile() {}
function ProductCard() {}

// Files - Match component name
// UserProfile.jsx, ProductCard.jsx

// Hooks - camelCase with 'use' prefix
function useAuth() {}
function useFetch() {}

// Event handlers - handle prefix
const handleClick = () => {};
const handleSubmit = () => {};
const handleInputChange = () => {};

// Boolean props - is/has/can prefix
<Modal isOpen={true} />
<User hasAccess={true} />
<Button isDisabled={false} />
```

### File Organization

```jsx
// Component file structure
components/
  Button/
    Button.jsx        # Main component
    Button.css        # Styles
    Button.test.jsx   # Tests
    index.js          # Export

// index.js
export { default } from './Button';

// This allows clean imports
import Button from './components/Button';
```

---

## 🎯 Mini Project: Product Component System

```
components/
  products/
    ProductCard/
      ProductCard.jsx
      ProductCard.css
      index.js
    ProductList/
      ProductList.jsx
      index.js
    ProductFilter/
      ProductFilter.jsx
      index.js
    ProductDetail/
      ProductDetail.jsx
      index.js
```

```jsx
// ProductCard.jsx
function ProductCard({ product, onAddToCart, onViewDetails }) {
  const { _id, name, price, image, rating, inStock } = product;

  return (
    <Card 
      className="product-card"
      image={image}
      hoverable
    >
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="product-rating">
          {'★'.repeat(Math.floor(rating))}
          {'☆'.repeat(5 - Math.floor(rating))}
          <span>({rating})</span>
        </div>
        <p className="product-price">${price.toFixed(2)}</p>
        {!inStock && <span className="out-of-stock">Out of Stock</span>}
      </div>
      
      <div className="product-actions">
        <Button 
          onClick={() => onViewDetails(_id)}
          variant="ghost"
          size="small"
        >
          View
        </Button>
        <Button 
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
          size="small"
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

// ProductList.jsx
function ProductList({ products, loading, error, onAddToCart }) {
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (products.length === 0) return <EmptyState message="No products found" />;

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={(id) => navigate(`/products/${id}`)}
        />
      ))}
    </div>
  );
}

// ProductFilter.jsx
function ProductFilter({ filters, onChange }) {
  return (
    <div className="product-filter">
      <Input
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      
      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      
      <select
        value={filters.sort}
        onChange={(e) => onChange({ ...filters, sort: e.target.value })}
      >
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
```

---

## 📝 Quick Summary

| Pattern | When to Use |
|---------|-------------|
| **Container/Presentational** | Separate logic from UI |
| **Custom Hooks** | Reuse stateful logic |
| **Compound Components** | Components that work together |
| **Render Props** | Share rendering logic |
| **HOC** | Add functionality to components |

### Folder Structure Tips

- Group by **feature** for large apps
- Group by **type** for small apps
- Use **barrel exports** (index.js)
- Keep components **co-located** with styles/tests

---

*Next: [05-State-Management.md](./05-State-Management.md)*
