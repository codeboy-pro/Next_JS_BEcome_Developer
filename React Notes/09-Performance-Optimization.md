# 🚀 9. Performance Optimization in React

> **Goal:** Learn how to optimize React apps for better performance using memoization techniques.

---

## 📚 Table of Contents

| Topic | Description |
|-------|-------------|
| [Why Performance Matters](#-why-performance-matters) | Understanding re-renders |
| [React.memo](#-reactmemo) | Memoize components |
| [useCallback](#-usecallback-hook) | Memoize functions |
| [useMemo](#-usememo-hook) | Memoize values |
| [Comparison Table](#-comparison-table) | Quick reference |
| [When to Optimize](#-when-to-optimize) | Best practices |
| [Mini Project](#-mini-project-optimized-counter-app) | Practical example |

---

## 🔄 Why Performance Matters

### The Re-render Problem

```
Parent Component Re-renders
        ↓
All Child Components Re-render
        ↓
Even if their props haven't changed!
        ↓
❌ Wasted computations
```

### When Does React Re-render?

| Trigger | Description |
|---------|-------------|
| State Change | Component's own state updates |
| Props Change | Parent passes new props |
| Parent Re-renders | Parent component updates |
| Context Change | Context value updates |

---

## 🧠 React.memo

### Definition
> **React.memo** is a Higher Order Component (HOC) that memoizes a component. It prevents re-renders if props haven't changed.

### Syntax

```jsx
const MemoizedComponent = React.memo(Component);

// OR inline
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>Hello, {name}</div>;
});
```

### Example: Without memo (Problem)

```jsx
// ❌ Child re-renders every time parent updates
function Child({ name }) {
  console.log("Child rendered!"); // Logs every time
  return <p>Hello, {name}</p>;
}

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Child name="John" /> {/* Re-renders even though name didn't change */}
    </div>
  );
}
```

### Example: With memo (Solution)

```jsx
// ✅ Child only re-renders when 'name' prop changes
import { memo } from 'react';

const Child = memo(function Child({ name }) {
  console.log("Child rendered!"); // Only logs when name changes
  return <p>Hello, {name}</p>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <Child name="John" /> {/* ✅ Doesn't re-render */}
    </div>
  );
}
```

### Custom Comparison Function

```jsx
const Child = memo(
  function Child({ user }) {
    return <p>{user.name}</p>;
  },
  // Custom comparison: only re-render if user.id changes
  (prevProps, nextProps) => {
    return prevProps.user.id === nextProps.user.id;
  }
);
```

---

## 🔗 useCallback Hook

### Definition
> **useCallback** memoizes a function so it doesn't get recreated on every render. Useful when passing callbacks to memoized child components.

### Syntax

```jsx
const memoizedCallback = useCallback(
  () => {
    // function logic
  },
  [dependencies] // Only recreate if dependencies change
);
```

### The Problem: Functions Break memo

```jsx
// ❌ This breaks React.memo!
const Child = memo(function Child({ onClick }) {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ New function created on every render
  const handleClick = () => {
    console.log("Clicked!");
  };
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} /> {/* Re-renders because handleClick is new */}
    </div>
  );
}
```

### The Solution: useCallback

```jsx
import { useState, useCallback, memo } from 'react';

const Child = memo(function Child({ onClick }) {
  console.log("Child rendered!");
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  // ✅ Same function reference across renders
  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []); // Empty array = never recreate
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child onClick={handleClick} /> {/* ✅ Doesn't re-render */}
    </div>
  );
}
```

### useCallback with Dependencies

```jsx
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // Recreates only when 'query' changes
  const handleSearch = useCallback(() => {
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]); // Dependency: query
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <SearchButton onSearch={handleSearch} />
    </div>
  );
}
```

---

## 💾 useMemo Hook

### Definition
> **useMemo** memoizes a computed value. It prevents expensive calculations from running on every render.

### Syntax

```jsx
const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b] // Recalculate only when a or b changes
);
```

### Example: Without useMemo (Problem)

```jsx
// ❌ Expensive calculation runs on EVERY render
function ProductList({ products, category }) {
  const [search, setSearch] = useState('');
  
  // This runs every time search changes too!
  const filteredProducts = products
    .filter(p => p.category === category)
    .sort((a, b) => a.price - b.price);
  
  return (
    <div>
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

### Example: With useMemo (Solution)

```jsx
import { useState, useMemo } from 'react';

function ProductList({ products, category }) {
  const [search, setSearch] = useState('');
  
  // ✅ Only recalculates when products or category changes
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products
      .filter(p => p.category === category)
      .sort((a, b) => a.price - b.price);
  }, [products, category]);
  
  return (
    <div>
      <input 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
```

### useMemo for Object References

```jsx
function UserProfile({ userId }) {
  const [refresh, setRefresh] = useState(0);
  
  // ✅ Same object reference unless userId changes
  const userConfig = useMemo(() => ({
    id: userId,
    settings: { theme: 'dark' }
  }), [userId]);
  
  return (
    <div>
      <button onClick={() => setRefresh(r => r + 1)}>Refresh</button>
      <UserSettings config={userConfig} /> {/* Won't re-render unnecessarily */}
    </div>
  );
}
```

---

## 📊 Comparison Table

| Feature | React.memo | useCallback | useMemo |
|---------|------------|-------------|---------|
| **Type** | HOC | Hook | Hook |
| **Memoizes** | Component | Function | Value |
| **Purpose** | Prevent component re-renders | Stable function reference | Cache expensive calculations |
| **Use Case** | Pure components | Callbacks to memo'd children | Heavy computations |
| **Returns** | Memoized component | Memoized function | Memoized value |

### Visual Flow

```
┌─────────────────────────────────────────────────────────┐
│                    OPTIMIZATION FLOW                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Component with expensive child?                        │
│         ↓                                                │
│   Use React.memo on child                                │
│         ↓                                                │
│   Passing callback to child?                             │
│         ↓                                                │
│   Use useCallback for the function                       │
│         ↓                                                │
│   Passing computed value to child?                       │
│         ↓                                                │
│   Use useMemo for the value                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## ⚠️ When to Optimize

### ✅ DO Use When:

| Scenario | Solution |
|----------|----------|
| Child component is expensive to render | `React.memo` |
| Passing callbacks to memoized children | `useCallback` |
| Expensive calculations (sorting, filtering large arrays) | `useMemo` |
| Creating objects/arrays passed to memoized children | `useMemo` |

### ❌ DON'T Use When:

| Scenario | Why |
|----------|-----|
| Every component by default | Memoization has overhead |
| Simple/cheap components | Cost of memo > cost of re-render |
| Props change frequently | Memo comparison is wasted |
| Premature optimization | Profile first, optimize second |

### Performance Profiling

```jsx
// Use React DevTools Profiler to identify slow components
// Look for:
// 1. Components that render often
// 2. Components with long render times
// 3. Components that re-render when parent updates
```

---

## 🛠️ Mini Project: Optimized Counter App

### File: `src/OptimizedApp.jsx`

```jsx
import { useState, useCallback, useMemo, memo } from 'react';

// ✅ Memoized expensive list component
const ExpensiveList = memo(function ExpensiveList({ items, onItemClick }) {
  console.log("ExpensiveList rendered");
  
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name} - ${item.price}
        </li>
      ))}
    </ul>
  );
});

// ✅ Memoized stats component
const Stats = memo(function Stats({ total, average }) {
  console.log("Stats rendered");
  
  return (
    <div className="stats">
      <p>Total: ${total}</p>
      <p>Average: ${average}</p>
    </div>
  );
});

// Main App Component
function App() {
  const [count, setCount] = useState(0);
  const [items] = useState([
    { id: 1, name: 'Apple', price: 1.5 },
    { id: 2, name: 'Banana', price: 0.75 },
    { id: 3, name: 'Orange', price: 2.0 },
    { id: 4, name: 'Mango', price: 3.5 },
  ]);
  
  // ✅ useCallback: Stable function reference
  const handleItemClick = useCallback((id) => {
    console.log(`Item ${id} clicked`);
  }, []);
  
  // ✅ useMemo: Cache expensive calculations
  const stats = useMemo(() => {
    console.log("Calculating stats...");
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const average = total / items.length;
    return { total: total.toFixed(2), average: average.toFixed(2) };
  }, [items]);
  
  // ✅ useMemo: Stable object reference for memo'd child
  const sortedItems = useMemo(() => {
    console.log("Sorting items...");
    return [...items].sort((a, b) => a.price - b.price);
  }, [items]);
  
  return (
    <div className="app">
      <h1>Optimized Counter App</h1>
      
      {/* This updates, but memo'd children don't re-render */}
      <div className="counter">
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
      
      {/* ✅ Won't re-render when count changes */}
      <Stats total={stats.total} average={stats.average} />
      
      {/* ✅ Won't re-render when count changes */}
      <ExpensiveList items={sortedItems} onItemClick={handleItemClick} />
      
      <p className="hint">
        Open console - child components only render once!
      </p>
    </div>
  );
}

export default App;
```

### File: `src/OptimizedApp.css`

```css
.app {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.counter button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}

.counter span {
  font-size: 1.5rem;
  min-width: 50px;
  text-align: center;
}

.stats {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
}

li:hover {
  background: #d0d0d0;
}

.hint {
  color: #666;
  font-size: 0.9rem;
  font-style: italic;
}
```

### Expected Console Output

```
// Initial render:
ExpensiveList rendered
Stats rendered
Calculating stats...
Sorting items...

// Click counter buttons:
// (No additional logs - memo'd children don't re-render!)
```

---

## 🎯 Quick Reference

```jsx
// 1️⃣ React.memo - Memoize component
const Child = memo(function Child({ name }) {
  return <p>{name}</p>;
});

// 2️⃣ useCallback - Memoize function
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// 3️⃣ useMemo - Memoize value
const expensiveValue = useMemo(() => {
  return computeExpensive(data);
}, [data]);
```

---

## 🧠 Memory Tips

| Hook/HOC | Remember As |
|----------|-------------|
| `React.memo` | "memo-ize the component" |
| `useCallback` | "callback stays the same" |
| `useMemo` | "memo-ize the value" |

### Decision Tree

```
Need to optimize?
      │
      ├── Is it a component? → React.memo
      │
      ├── Is it a function being passed down? → useCallback
      │
      └── Is it an expensive calculation? → useMemo
```

---

## ⏭️ Next: [10. UI Styling with Tailwind](./10-UI-Styling.md)
