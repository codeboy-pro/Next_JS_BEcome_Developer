# 📘 React Basics - Complete Revision Notes

## Table of Contents
1. [What is React?](#what-is-react)
2. [JSX](#jsx)
3. [Components](#components)
4. [Props vs State](#props-vs-state)
5. [Conditional Rendering](#conditional-rendering)
6. [Lists & Keys](#lists--keys)

---

## What is React?

**Definition:** React is a JavaScript library for building user interfaces, developed by Facebook (Meta).

### Key Characteristics
| Feature | Description |
|---------|-------------|
| Component-Based | UI is built using reusable components |
| Declarative | You describe what UI should look like, React handles the DOM |
| Virtual DOM | React uses a virtual representation of DOM for efficient updates |
| One-Way Data Flow | Data flows from parent to child via props |

```
┌─────────────────────────────────────┐
│              React App              │
│  ┌─────────────────────────────┐    │
│  │       Virtual DOM           │    │
│  │  (JavaScript Representation)│    │
│  └──────────────┬──────────────┘    │
│                 │ Diff              │
│                 ▼                   │
│  ┌─────────────────────────────┐    │
│  │        Real DOM             │    │
│  │    (Browser Renders)        │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

---

## JSX

### What is JSX?

**Definition:** JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code in JavaScript.

### Key Rules

| Rule | Example |
|------|---------|
| Must return single parent element | Wrap in `<div>` or `<>` (Fragment) |
| Use `className` instead of `class` | `<div className="container">` |
| Use `{}` for JavaScript expressions | `<p>{name}</p>` |
| Self-closing tags must end with `/` | `<img />`, `<input />` |
| CamelCase for attributes | `onClick`, `onChange` |

### Basic JSX Example

```jsx
// ✅ Valid JSX
function Greeting() {
  const name = "John";
  const isLoggedIn = true;

  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Status: {isLoggedIn ? "Logged In" : "Guest"}</p>
      <img src="/avatar.png" alt="Avatar" />
    </div>
  );
}
```

### JSX vs HTML Comparison

| HTML | JSX |
|------|-----|
| `class="btn"` | `className="btn"` |
| `for="email"` | `htmlFor="email"` |
| `onclick="fn()"` | `onClick={fn}` |
| `style="color: red"` | `style={{ color: 'red' }}` |
| `tabindex="1"` | `tabIndex={1}` |

### Embedding Expressions

```jsx
function App() {
  const user = { firstName: "John", lastName: "Doe" };
  const items = ["Apple", "Banana", "Orange"];

  return (
    <div>
      {/* String interpolation */}
      <h1>{user.firstName} {user.lastName}</h1>
      
      {/* Math operations */}
      <p>Total: {10 + 20}</p>
      
      {/* Function calls */}
      <p>Items: {items.length}</p>
      
      {/* Ternary operator */}
      <p>{items.length > 0 ? "Has items" : "Empty"}</p>
    </div>
  );
}
```

---

## Components

### What are Components?

**Definition:** Components are independent, reusable pieces of UI. They are like JavaScript functions that return JSX.

### Types of Components

```
┌───────────────────────────────────────────────────────────┐
│                    React Components                        │
├─────────────────────────┬─────────────────────────────────┤
│   Functional (Modern)   │      Class (Legacy)              │
├─────────────────────────┼─────────────────────────────────┤
│ • Uses functions        │ • Uses ES6 classes              │
│ • Uses Hooks for state  │ • Uses this.state               │
│ • Simpler syntax        │ • More verbose                  │
│ • Recommended ✅        │ • Still supported               │
└─────────────────────────┴─────────────────────────────────┘
```

### Functional Component (Recommended)

```jsx
// Simple functional component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function syntax
const Welcome = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// Usage
<Welcome name="John" />
```

### Class Component (Legacy - Know for interviews)

```jsx
import { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Usage
<Welcome name="John" />
```

### Component Composition

```jsx
// Header Component
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
    </header>
  );
}

// Logo Component
function Logo() {
  return <img src="/logo.png" alt="Logo" />;
}

// Navigation Component
function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}

// App Component (Parent)
function App() {
  return (
    <div>
      <Header />
      <main>Content goes here</main>
      <Footer />
    </div>
  );
}
```

### Component Hierarchy Diagram

```
                    App
                     │
        ┌────────────┼────────────┐
        │            │            │
     Header        Main        Footer
        │            │
   ┌────┴────┐    Content
   │         │
  Logo   Navigation
```

---

## Props vs State

### Quick Comparison

| Feature | Props | State |
|---------|-------|-------|
| **Definition** | Data passed from parent to child | Data managed within component |
| **Mutability** | Immutable (read-only) | Mutable (can be changed) |
| **Who controls** | Parent component | Component itself |
| **Purpose** | Configure component | Track changing data |
| **Update trigger** | Parent re-renders | setState call |

### Visual Representation

```
┌─────────────────────────────────────────────────────────┐
│                    Parent Component                     │
│                                                          │
│   state = { count: 5 }                                  │
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │              Props Flow (One-Way) ↓               │  │
│   └──────────────────────────────────────────────────┘  │
│                          │                               │
│              <Child count={count} />                    │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Child Component                       │
│                                                          │
│   function Child({ count }) {                           │
│     // count is a PROP - cannot modify directly         │
│     return <p>Count: {count}</p>                        │
│   }                                                      │
└─────────────────────────────────────────────────────────┘
```

### Props Example

```jsx
// Parent Component
function UserProfile() {
  return (
    <div>
      <UserCard 
        name="John Doe" 
        email="john@example.com"
        isAdmin={true}
      />
    </div>
  );
}

// Child Component receiving props
function UserCard({ name, email, isAdmin }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{email}</p>
      {isAdmin && <span className="badge">Admin</span>}
    </div>
  );
}
```

### State Example

```jsx
import { useState } from 'react';

function Counter() {
  // Declaring state: [currentValue, setterFunction] = useState(initialValue)
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Passing Functions as Props (Child to Parent Communication)

```jsx
// Parent Component
function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Function to add todo - passed to child
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

// Child Component - calls parent's function
function AddTodoForm({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);  // Calling parent's function
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button type="submit">Add</button>
    </form>
  );
}
```

---

## Conditional Rendering

### Methods Overview

| Method | Best For | Example |
|--------|----------|---------|
| If/Else | Complex logic | Multiple conditions with different returns |
| Ternary `? :` | Simple either/or | `{isLoggedIn ? <Home /> : <Login />}` |
| Logical AND `&&` | Show or nothing | `{isAdmin && <AdminPanel />}` |
| Switch | Multiple options | Different components based on status |

### 1. If/Else Statement

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}
```

### 2. Ternary Operator

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome back!</h1>
          <button>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please sign in</h1>
          <button>Login</button>
        </div>
      )}
    </div>
  );
}
```

### 3. Logical AND (&&)

```jsx
function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Only renders if user.isAdmin is true */}
      {user.isAdmin && <AdminPanel />}
      
      {/* Only renders if notifications exist */}
      {user.notifications.length > 0 && (
        <NotificationBadge count={user.notifications.length} />
      )}
    </div>
  );
}
```

### 4. Switch Case Pattern

```jsx
function StatusMessage({ status }) {
  const renderStatus = () => {
    switch (status) {
      case 'loading':
        return <Spinner />;
      case 'success':
        return <SuccessMessage />;
      case 'error':
        return <ErrorMessage />;
      default:
        return <p>Unknown status</p>;
    }
  };

  return <div>{renderStatus()}</div>;
}
```

### 5. Object Lookup Pattern (Clean Alternative)

```jsx
function StatusMessage({ status }) {
  const statusComponents = {
    loading: <Spinner />,
    success: <SuccessMessage />,
    error: <ErrorMessage />,
  };

  return (
    <div>
      {statusComponents[status] || <p>Unknown status</p>}
    </div>
  );
}
```

### Real MERN Example: User Dashboard

```jsx
function UserDashboard({ user, loading, error }) {
  // Loading state
  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  // No user state
  if (!user) {
    return <div>Please login to view dashboard</div>;
  }

  // Authenticated user view
  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      
      {/* Role-based rendering */}
      {user.role === 'admin' && <AdminControls />}
      {user.role === 'moderator' && <ModeratorTools />}
      
      {/* Conditional notifications */}
      {user.notifications?.length > 0 && (
        <NotificationPanel notifications={user.notifications} />
      )}
      
      {/* Premium features */}
      {user.isPremium ? <PremiumFeatures /> : <UpgradePrompt />}
    </div>
  );
}
```

---

## Lists & Keys

### Why Keys Matter

```
Without Keys (Bad):                 With Keys (Good):
┌─────────────────────┐            ┌─────────────────────┐
│ Item 1              │            │ Item 1    key="1"   │
│ Item 2              │  ──────►   │ Item 2    key="2"   │
│ Item 3              │            │ Item 3    key="3"   │
└─────────────────────┘            └─────────────────────┘
                                   
React can't track which           React tracks each item
item changed, so it               by key and updates
re-renders everything             only what changed
```

### Key Rules

| ✅ Good Keys | ❌ Bad Keys |
|-------------|------------|
| Database IDs | Array index (when list changes) |
| Unique identifiers | Random numbers on each render |
| Stable values | Non-unique values |

### Basic List Rendering

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Usage
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build Project' },
  { id: 3, text: 'Deploy App' },
];

<TodoList todos={todos} />
```

### Rendering with Component

```jsx
// TodoItem Component
function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// TodoList Component
function TodoList({ todos, onDelete, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id}  // Key goes on the outermost element in map
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
```

### When Index as Key is OK

```jsx
// ✅ OK: Static list that never changes
const menuItems = ['Home', 'About', 'Contact'];

function Navigation() {
  return (
    <nav>
      {menuItems.map((item, index) => (
        <a key={index} href={`/${item.toLowerCase()}`}>
          {item}
        </a>
      ))}
    </nav>
  );
}
```

### When Index as Key is BAD

```jsx
// ❌ BAD: Dynamic list with additions/deletions
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        // Don't use index as key when list can change!
        <li key={index}>{todo.text}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Use unique ID
function TodoList({ todos, onDelete }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

### Nested Lists

```jsx
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    < /div>
  );
}
```

### Real MERN Example: Product List

```jsx
function ProductGrid({ products, loading }) {
  if (loading) return <div>Loading products...</div>;
  
  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard 
          key={product._id}  // MongoDB ObjectId
          product={product}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Rating: {product.rating}/5</p>
      <button>Add to Cart</button>
    </div>
  );
}
```

---

## 🎯 Mini Project: Simple Task Manager

```jsx
import { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Add new task
  const addTask = () => {
    if (inputValue.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      
      {/* Add Task Form */}
      <div className="add-task">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter new task"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task Stats */}
      <div className="stats">
        <p>Total: {tasks.length}</p>
        <p>Completed: {tasks.filter(t => t.completed).length}</p>
        <p>Pending: {tasks.filter(t => !t.completed).length}</p>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={task.completed ? 'completed' : ''}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;
```

---

## 📝 Quick Summary

| Concept | Key Points |
|---------|------------|
| **JSX** | HTML-like syntax in JS, use `{}` for expressions, `className` not `class` |
| **Components** | Reusable UI pieces, functional preferred, receive props |
| **Props** | Read-only data from parent, configure components |
| **State** | Mutable data within component, triggers re-render |
| **Conditional Rendering** | Use ternary, &&, or if/else for conditional UI |
| **Lists & Keys** | Use `.map()` to render lists, always use unique `key` prop |

---

*Next: [02-React-Hooks.md](./02-React-Hooks.md)*
 f