# 📋 React Cheat Sheet for MERN Development

> **Quick Reference:** All essential React concepts in one place!

---

## 🚀 1. React Basics

```jsx
// JSX - JavaScript XML
const element = <h1>Hello, {name}!</h1>;

// Component Types
function FunctionComponent(props) {
  return <div>{props.children}</div>;
}

// Props vs State
// Props: Read-only, passed from parent
// State: Mutable, managed by component
```

| Props | State |
|-------|-------|
| Passed from parent | Owned by component |
| Read-only | Can be updated |
| `props.name` | `useState(initial)` |

---

## 🪝 2. React Hooks

```jsx
// useState - State management
const [count, setCount] = useState(0);

// useEffect - Side effects
useEffect(() => {
  // Run on mount and when deps change
  return () => { /* cleanup */ };
}, [dependencies]);

// useRef - Mutable reference
const inputRef = useRef(null);
inputRef.current.focus();

// useReducer - Complex state
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });

// useContext - Global state access
const value = useContext(MyContext);
```

### useEffect Patterns

```jsx
useEffect(() => {}, [])      // Mount only
useEffect(() => {}, [dep])   // When dep changes
useEffect(() => {})          // Every render (avoid!)
```

---

## 🧭 3. React Router

```jsx
// Setup
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users/:id" element={<User />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

// Navigation
const navigate = useNavigate();
navigate('/home');
navigate(-1); // Go back

// URL Parameters
const { id } = useParams();

// Query Parameters
const [searchParams] = useSearchParams();
const query = searchParams.get('q');
```

### Protected Route

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
```

---

## 🏗️ 4. Component Architecture

### Folder Structure

```
src/
├── components/    # Reusable UI
├── pages/         # Route components
├── hooks/         # Custom hooks
├── context/       # Context providers
├── services/      # API calls
└── utils/         # Helper functions
```

### Component Patterns

```jsx
// Container (logic)
function UserContainer() {
  const [user, setUser] = useState(null);
  return <UserDisplay user={user} />;
}

// Presentational (UI)
function UserDisplay({ user }) {
  return <p>{user.name}</p>;
}
```

---

## 📦 5. State Management

### Context API

```jsx
// Create
const AuthContext = createContext();

// Provider
<AuthContext.Provider value={{ user, login, logout }}>
  {children}
</AuthContext.Provider>

// Consume
const { user } = useContext(AuthContext);
```

### useReducer Pattern

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': return [...state, action.payload];
    case 'REMOVE': return state.filter(i => i.id !== action.payload);
    default: return state;
  }
};

const [items, dispatch] = useReducer(reducer, []);
dispatch({ type: 'ADD', payload: newItem });
```

### Redux Toolkit

```jsx
// Slice
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => { state.push(action.payload); }
  }
});

// Use in component
const todos = useSelector(state => state.todos);
const dispatch = useDispatch();
dispatch(addTodo({ text: 'Learn Redux' }));
```

---

## 🌐 6. API Integration

### fetch vs axios

```jsx
// fetch
const res = await fetch('/api/users');
const data = await res.json();

// axios (recommended)
const { data } = await axios.get('/api/users');
```

### CRUD Operations

```jsx
// Create
await axios.post('/api/items', { name: 'New' });

// Read
const { data } = await axios.get('/api/items');

// Update
await axios.put('/api/items/1', { name: 'Updated' });

// Delete
await axios.delete('/api/items/1');
```

### API Service Pattern

```jsx
// services/api.js
const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const getUsers = () => api.get('/users');
export const createUser = (data) => api.post('/users', data);
```

---

## 🔐 7. Authentication

### JWT Flow

```
1. User logs in → Server returns JWT
2. Store token in localStorage
3. Send token in Authorization header
4. Protected routes check for valid token
```

### Auth Context

```jsx
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const login = async (email, password) => {
    const { data } = await axios.post('/api/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 📝 8. Forms & Validation

### Controlled Component

```jsx
function Form() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Validation Pattern

```jsx
const validate = (values) => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Invalid email';
  if (values.password.length < 6) errors.password = 'Min 6 characters';
  return errors;
};
```

---

## ⚡ 9. Performance Optimization

```jsx
// React.memo - Memoize component
const Child = memo(function Child({ name }) {
  return <p>{name}</p>;
});

// useCallback - Memoize function
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// useMemo - Memoize value
const sortedList = useMemo(() => {
  return list.sort((a, b) => a - b);
}, [list]);
```

### When to Use

| Tool | Use Case |
|------|----------|
| `React.memo` | Expensive child components |
| `useCallback` | Functions passed to memo'd children |
| `useMemo` | Expensive calculations |

---

## 🎨 10. Tailwind CSS

### Essential Classes

```jsx
// Layout
"flex items-center justify-between"
"grid grid-cols-3 gap-4"

// Spacing
"p-4 m-2 px-6 py-3 mt-4"

// Typography
"text-xl font-bold text-gray-800"

// Colors
"bg-blue-500 text-white"

// Responsive
"text-sm md:text-base lg:text-lg"
"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Dark Mode
"bg-white dark:bg-gray-800"

// Hover & Transitions
"hover:bg-blue-600 transition-colors"
```

### Button Example

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg 
                   hover:bg-blue-600 transition-colors">
  Click Me
</button>
```

---

## 🔧 Common Patterns

### Loading State

```jsx
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

useEffect(() => {
  fetchData()
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);

if (loading) return <Spinner />;
if (error) return <Error message={error} />;
return <Display data={data} />;
```

### Custom Hook

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}

// Usage
const { data, loading, error } = useFetch('/api/users');
```

### Conditional Rendering

```jsx
// Short-circuit
{isLoggedIn && <Dashboard />}

// Ternary
{isLoading ? <Spinner /> : <Content />}

// Early return
if (!user) return <Login />;
return <Profile user={user} />;
```

---

## 📌 Quick Tips

| Tip | Description |
|-----|-------------|
| Keys | Always use unique keys in lists |
| Cleanup | Return cleanup function from useEffect |
| Deps | Include all dependencies in useEffect |
| Immutable | Never mutate state directly |
| Lifting | Lift state up for shared data |
| Splitting | Split large components |

---

## 🎯 MERN Stack Quick Reference

```
MongoDB     →  Database (NoSQL)
Express.js  →  Backend framework
React       →  Frontend library
Node.js     →  Runtime environment

Frontend (React)     ←→     Backend (Express)     ←→     Database (MongoDB)
     ↓                            ↓                           ↓
  Components              REST API Routes               Mongoose Models
  State Management        Controllers                   CRUD Operations
  React Router            Middleware                    Aggregations
```

---

## 📚 Files in This Series

| # | Topic | File |
|---|-------|------|
| 1 | React Basics | [01-React-Basics.md](./01-React-Basics.md) |
| 2 | React Hooks | [02-React-Hooks.md](./02-React-Hooks.md) |
| 3 | React Router | [03-React-Router.md](./03-React-Router.md) |
| 4 | Component Architecture | [04-Component-Architecture.md](./04-Component-Architecture.md) |
| 5 | State Management | [05-State-Management.md](./05-State-Management.md) |
| 6 | API Integration | [06-API-Integration.md](./06-API-Integration.md) |
| 7 | Authentication Flow | [07-Authentication-Flow.md](./07-Authentication-Flow.md) |
| 8 | Forms & Validation | [08-Forms-Validation.md](./08-Forms-Validation.md) |
| 9 | Performance Optimization | [09-Performance-Optimization.md](./09-Performance-Optimization.md) |
| 10 | UI Styling | [10-UI-Styling.md](./10-UI-Styling.md) |

---

> 🎉 **Congratulations!** You've completed the React revision notes. Happy coding!
