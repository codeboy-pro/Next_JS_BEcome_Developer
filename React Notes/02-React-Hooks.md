# 🎣 React Hooks - Complete Revision Notes

## Table of Contents
1. [What are Hooks?](#what-are-hooks)
2. [useState](#usestate)
3. [useEffect](#useeffect)
4. [useRef](#useref)
5. [useReducer](#usereducer)
6. [useContext](#usecontext)
7. [Custom Hooks](#custom-hooks)

---

## What are Hooks?

**Definition:** Hooks are special functions that let you "hook into" React features like state and lifecycle in functional components.

### Rules of Hooks

```
┌─────────────────────────────────────────────────────────────┐
│                     RULES OF HOOKS                          │
├─────────────────────────────────────────────────────────────┤
│ 1. Only call Hooks at the TOP LEVEL                        │
│    ❌ Don't call inside loops, conditions, or nested fn     │
│                                                              │
│ 2. Only call Hooks from React FUNCTIONS                     │
│    ✅ Functional components                                  │
│    ✅ Custom Hooks                                           │
│    ❌ Regular JavaScript functions                           │
└─────────────────────────────────────────────────────────────┘
```

### Hooks Overview

| Hook | Purpose |
|------|---------|
| `useState` | Manage local state |
| `useEffect` | Side effects (API calls, subscriptions) |
| `useRef` | Reference DOM elements / persist values |
| `useReducer` | Complex state logic |
| `useContext` | Access context values |
| `useMemo` | Memoize expensive calculations |
| `useCallback` | Memoize functions |

---

## useState

### Definition
`useState` is a Hook that lets you add state to functional components.

### Syntax

```jsx
const [state, setState] = useState(initialValue);
```

| Part | Description |
|------|-------------|
| `state` | Current state value |
| `setState` | Function to update the state |
| `initialValue` | Initial state (can be any type) |

### Basic Examples

```jsx
import { useState } from 'react';

function Counter() {
  // Number state
  const [count, setCount] = useState(0);
  
  // String state
  const [name, setName] = useState('');
  
  // Boolean state
  const [isVisible, setIsVisible] = useState(false);
  
  // Array state
  const [items, setItems] = useState([]);
  
  // Object state
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment (using prev)
      </button>
    </div>
  );
}
```

### Updating State Correctly

```jsx
// ❌ WRONG: Mutating state directly
const [user, setUser] = useState({ name: 'John', age: 25 });
user.name = 'Jane';  // Never do this!

// ✅ CORRECT: Create new object
setUser({ ...user, name: 'Jane' });

// ❌ WRONG: Mutating array
const [items, setItems] = useState([1, 2, 3]);
items.push(4);  // Never do this!

// ✅ CORRECT: Create new array
setItems([...items, 4]);
```

### State Update Patterns

```jsx
function StatePatterns() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Apple', 'Banana']);
  const [user, setUser] = useState({ name: '', email: '' });

  // 1. Simple update
  const increment = () => setCount(count + 1);

  // 2. Functional update (when new state depends on previous)
  const incrementSafe = () => setCount(prev => prev + 1);

  // 3. Add to array
  const addItem = (item) => setItems(prev => [...prev, item]);

  // 4. Remove from array
  const removeItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // 5. Update array item
  const updateItem = (index, newValue) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? newValue : item
    ));
  };

  // 6. Update object property
  const updateName = (name) => {
    setUser(prev => ({ ...prev, name }));
  };

  // 7. Reset state
  const reset = () => setCount(0);
}
```

### Lazy Initialization

```jsx
// ❌ Expensive computation runs on every render
const [data, setData] = useState(expensiveComputation());

// ✅ Only runs once on initial render
const [data, setData] = useState(() => expensiveComputation());

// Real example: Reading from localStorage
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'light';
});
```

---

## useEffect

### Definition
`useEffect` is a Hook that lets you perform side effects in functional components.

### Side Effects Include:
- API calls / Data fetching
- Subscriptions (WebSocket, events)
- Timers (setTimeout, setInterval)
- DOM manipulation
- Logging

### Syntax & Diagram

```
useEffect(() => {
  // Effect code (runs after render)
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);

┌─────────────────────────────────────────────────────────────┐
│                    useEffect Lifecycle                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Component Mounts                                            │
│        │                                                     │
│        ▼                                                     │
│  ┌─────────────┐                                            │
│  │ Run Effect  │◄──────────────────────┐                    │
│  └──────┬──────┘                       │                    │
│         │                              │                    │
│         ▼                              │                    │
│  Component Updates ─── Dependencies ───┘                    │
│         │              Changed?                              │
│         │                                                    │
│         ▼                                                    │
│  Component Unmounts                                          │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────┐                                            │
│  │Run Cleanup  │                                            │
│  └─────────────┘                                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Dependency Array Patterns

| Pattern | When Effect Runs |
|---------|-----------------|
| `useEffect(() => {})` | After every render (rarely used) |
| `useEffect(() => {}, [])` | Only on mount (once) |
| `useEffect(() => {}, [dep1, dep2])` | On mount + when deps change |

### Examples

#### 1. Run Once on Mount (API Fetch)

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []); // Empty array = run once on mount

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

#### 2. Run When Dependency Changes

```jsx
function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm.length < 3) return;

    const fetchResults = async () => {
      const response = await fetch(`/api/search?q=${searchTerm}`);
      const data = await response.json();
      setResults(data);
    };

    fetchResults();
  }, [searchTerm]); // Runs when searchTerm changes

  return (
    <ul>
      {results.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

#### 3. Cleanup Function (Subscriptions/Timers)

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup: Clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

#### 4. Event Listener with Cleanup

```jsx
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>{size.width} x {size.height}</div>;
}
```

#### 5. Debounced Search

```jsx
function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Don't search if query is empty
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(async () => {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setResults(data);
    }, 500);

    // Cleanup: cancel timeout if query changes
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## useRef

### Definition
`useRef` returns a mutable ref object that persists across renders without causing re-renders.

### Two Main Uses

```
┌─────────────────────────────────────────────────────────────┐
│                      useRef Use Cases                        │
├────────────────────────────┬────────────────────────────────┤
│    1. DOM References       │    2. Persist Values           │
├────────────────────────────┼────────────────────────────────┤
│ • Focus input elements     │ • Store previous values        │
│ • Scroll to elements       │ • Store timer/interval IDs     │
│ • Measure element size     │ • Store any mutable value      │
│ • Access video/audio       │ • Values that don't trigger    │
│                            │   re-render when changed       │
└────────────────────────────┴────────────────────────────────┘
```

### Syntax

```jsx
const ref = useRef(initialValue);
// Access value: ref.current
```

### 1. DOM Reference Examples

```jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleClick = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

```jsx
function VideoPlayer() {
  const videoRef = useRef(null);

  const play = () => videoRef.current.play();
  const pause = () => videoRef.current.pause();

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}
```

```jsx
function ScrollToSection() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={scrollToSection}>Go to Section</button>
      
      <div style={{ height: '100vh' }}>Scroll down...</div>
      
      <section ref={sectionRef}>
        <h2>Target Section</h2>
      </section>
    </div>
  );
}
```

### 2. Persisting Values

```jsx
function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <h1>{time}s</h1>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### 3. Track Previous Value

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### useState vs useRef

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers re-render | ✅ Yes | ❌ No |
| Persists across renders | ✅ Yes | ✅ Yes |
| Access value | `state` | `ref.current` |
| Use for | UI state | DOM refs, timers, previous values |

---

## useReducer

### Definition
`useReducer` is an alternative to useState for complex state logic, following the Redux pattern.

### When to Use

| useState | useReducer |
|----------|------------|
| Simple state | Complex state logic |
| Few state variables | Multiple related state values |
| Independent updates | State updates depend on each other |
| - | When next state depends on previous |

### Syntax & Flow

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

```
┌─────────────────────────────────────────────────────────────┐
│                    useReducer Flow                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Component                                                  │
│       │                                                      │
│       │ dispatch({ type: 'ACTION', payload: data })         │
│       ▼                                                      │
│   ┌──────────┐                                              │
│   │ Dispatch │                                              │
│   └────┬─────┘                                              │
│        │                                                     │
│        ▼                                                     │
│   ┌──────────────────────────────────────┐                  │
│   │            Reducer Function           │                  │
│   │  (state, action) => newState          │                  │
│   └────────────────┬─────────────────────┘                  │
│                    │                                         │
│                    ▼                                         │
│            ┌──────────┐                                     │
│            │New State │ ──► Component Re-renders            │
│            └──────────┘                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Basic Example: Counter

```jsx
import { useReducer } from 'react';

// Initial state
const initialState = { count: 0 };

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'SET', payload: 100 })}>
        Set to 100
      </button>
    </div>
  );
}
```

### Real Example: Todo App

```jsx
const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false }
        ]
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo"
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
          All
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>
          Active
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear Completed
      </button>
    </div>
  );
}
```

---

## useContext

### Definition
`useContext` is a Hook that lets you read and subscribe to context from your component.

### Context Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Context Pattern                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Create Context                                          │
│     const MyContext = createContext(defaultValue);          │
│                                                             │
│  2. Provide Context (wrap components)                       │
│     <MyContext.Provider value={data}>                       │
│       <ChildComponents />                                   │
│     </MyContext.Provider>                                   │
│                                                             │
│  3. Consume Context (in any nested component)               │
│     const value = useContext(MyContext);                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

        ┌─────────────────────┐
        │    Context.Provider │ ◄── value={theme}
        └──────────┬──────────┘
                   │
         ┌─────────┼─────────┐
         │         │         │
         ▼         ▼         ▼
     ┌──────┐ ┌──────┐ ┌──────┐
     │Comp A│ │Comp B│ │Comp C│ ◄── All can access theme
     └──────┘ └──────┘ └──────┘     without prop drilling
```

### Problem: Prop Drilling

```jsx
// ❌ Without Context - Prop Drilling
function App() {
  const [user, setUser] = useState({ name: 'John' });
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <UserInfo user={user} />;
}

function UserInfo({ user }) {
  return <p>{user.name}</p>;
}
```

### Solution: Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const UserContext = createContext(null);

// 2. Create Provider Component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John' });
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Create custom hook (optional but recommended)
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

// 4. Wrap App with Provider
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}

// 5. Use context anywhere in the tree
function Layout() {
  return <Sidebar />;
}

function Sidebar() {
  return <UserInfo />;
}

function UserInfo() {
  const { user, logout } = useUser(); // ✅ Direct access!
  
  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Real MERN Example: Theme Context

```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage in component
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current: {theme} | Click to switch
    </button>
  );
}
```

---

## Custom Hooks

### Definition
Custom Hooks are JavaScript functions that start with "use" and can call other Hooks. They let you extract and reuse stateful logic.

### Naming Convention
- Must start with `use` (e.g., `useLocalStorage`, `useFetch`)
- Can call other Hooks inside

### Example Custom Hooks

#### 1. useLocalStorage

```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

#### 2. useFetch

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function Users() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### 3. useDebounce

```jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Make API call
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

#### 4. useToggle

```jsx
import { useState, useCallback } from 'react';

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}

// Usage
function Modal() {
  const [isOpen, toggleModal, openModal, closeModal] = useToggle(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
}
```

---

## 📝 Quick Summary

| Hook | Purpose | Returns |
|------|---------|---------|
| `useState` | Local component state | `[state, setState]` |
| `useEffect` | Side effects | Nothing |
| `useRef` | DOM refs / persist values | `{ current: value }` |
| `useReducer` | Complex state logic | `[state, dispatch]` |
| `useContext` | Access context values | Context value |

### When to Use Which

```
Need simple state?           → useState
Need side effects/API calls? → useEffect
Need DOM reference?          → useRef
Need complex state logic?    → useReducer
Need to avoid prop drilling? → useContext
Need reusable stateful logic? → Custom Hook
```

---

*Next: [03-React-Router.md](./03-React-Router.md)*
