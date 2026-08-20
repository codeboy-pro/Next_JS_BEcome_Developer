# 📝 Forms & Validation - Complete Revision Notes

## Table of Contents
1. [Forms Overview](#forms-overview)
2. [Controlled vs Uncontrolled Components](#controlled-vs-uncontrolled-components)
3. [Handling Form Inputs](#handling-form-inputs)
4. [Form Validation](#form-validation)
5. [Custom Validation Hook](#custom-validation-hook)
6. [React Hook Form](#react-hook-form)
7. [Form Project Examples](#form-project-examples)

---

## Forms Overview

### Why Forms in React?

**Definition:** Forms in React handle user input, validate data, and submit to a backend.

### Form Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Form Flow                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   User Types          State Updates         UI Reflects     │
│   ┌─────────┐         ┌───────────┐        ┌──────────┐    │
│   │ "John"  │ ──────► │ name:     │ ─────► │ value=   │    │
│   └─────────┘  onChange│ "John"   │  render │ "John"   │    │
│                       └───────────┘        └──────────┘    │
│                                                              │
│   Form Submit                                                │
│   ┌─────────┐                                               │
│   │ Submit  │ ──► Validate ──► API Call ──► Success/Error  │
│   └─────────┘     (client)     (server)                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Controlled vs Uncontrolled Components

### Comparison

| Controlled | Uncontrolled |
|------------|--------------|
| React controls value | DOM controls value |
| `value={state}` | `ref` to access value |
| Update via `onChange` | Get value on submit |
| Instant validation | Validate on submit |
| More code | Less code |
| **Recommended** ✅ | Simple forms only |

### Controlled Component (Recommended)

```jsx
import { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}              // React controls value
        onChange={(e) => setName(e.target.value)}  // State updates
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Uncontrolled Component

```jsx
import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access values through refs
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} defaultValue="" />
      <input type="email" ref={emailRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Handling Form Inputs

### Single State Object Pattern

```jsx
import { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    newsletter: false,
    plan: 'free'
  });

  // Generic handler for all inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Text Input */}
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      {/* Email Input */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      {/* Password Input */}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />

      {/* Number Input */}
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />

      {/* Select Dropdown */}
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={formData.newsletter}
          onChange={handleChange}
        />
        Subscribe to newsletter
      </label>

      {/* Radio Buttons */}
      <div>
        <label>
          <input
            type="radio"
            name="plan"
            value="free"
            checked={formData.plan === 'free'}
            onChange={handleChange}
          />
          Free
        </label>
        <label>
          <input
            type="radio"
            name="plan"
            value="pro"
            checked={formData.plan === 'pro'}
            onChange={handleChange}
          />
          Pro
        </label>
      </div>

      {/* Textarea */}
      <textarea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Tell us about yourself"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

### File Input

```jsx
function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create preview for images
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Send to server
    await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview && <img src={preview} alt="Preview" width="200" />}
      <button type="submit" disabled={!file}>Upload</button>
    </form>
  );
}
```

---

## Form Validation

### Validation Strategies

| Strategy | When to Validate | UX |
|----------|-----------------|-----|
| On Submit | User clicks submit | Can be frustrating |
| On Blur | User leaves field | Good balance |
| On Change | Every keystroke | Immediate feedback |
| Debounced | After typing stops | Best for async |

### Basic Validation

```jsx
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ email: true, password: true });
    
    if (validate()) {
      console.log('Form submitted:', formData);
      // API call here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.email && errors.email ? 'error' : ''}
          placeholder="Email"
        />
        {touched.email && errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={touched.password && errors.password ? 'error' : ''}
          placeholder="Password"
        />
        {touched.password && errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <button type="submit">Login</button>
    </form>
  );
}
```

### Validation Rules Reference

```jsx
const validationRules = {
  // Required
  required: (value) => !value ? 'This field is required' : '',
  
  // Email
  email: (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(value) ? 'Invalid email format' : '';
  },
  
  // Min length
  minLength: (min) => (value) => {
    return value.length < min ? `Must be at least ${min} characters` : '';
  },
  
  // Max length
  maxLength: (max) => (value) => {
    return value.length > max ? `Must be less than ${max} characters` : '';
  },
  
  // Pattern (regex)
  pattern: (regex, message) => (value) => {
    return !regex.test(value) ? message : '';
  },
  
  // Match another field
  match: (otherValue, fieldName) => (value) => {
    return value !== otherValue ? `Must match ${fieldName}` : '';
  },
  
  // Number range
  range: (min, max) => (value) => {
    const num = Number(value);
    if (num < min) return `Must be at least ${min}`;
    if (num > max) return `Must be at most ${max}`;
    return '';
  },
  
  // Phone number
  phone: (value) => {
    const regex = /^\d{10}$/;
    return !regex.test(value) ? 'Invalid phone number' : '';
  },
  
  // URL
  url: (value) => {
    try {
      new URL(value);
      return '';
    } catch {
      return 'Invalid URL';
    }
  }
};
```

---

## Custom Validation Hook

### useForm Hook

```jsx
// hooks/useForm.js
import { useState, useCallback } from 'react';

function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate single field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return '';
  }, [validationRules, values]);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationRules]);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({ ...prev, [name]: newValue }));

    // Clear error if field is touched
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // Handle blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  // Handle submit
  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    
    // Touch all fields
    const allTouched = {};
    Object.keys(values).forEach(key => allTouched[key] = true);
    setTouched(allTouched);

    if (validateAll()) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateAll]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set field value programmatically
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    isValid: Object.keys(errors).length === 0
  };
}

export default useForm;
```

### Using useForm Hook

```jsx
import useForm from '../hooks/useForm';

// Validation rules
const validationRules = {
  name: [
    (value) => !value ? 'Name is required' : '',
    (value) => value.length < 2 ? 'Name must be at least 2 characters' : ''
  ],
  email: [
    (value) => !value ? 'Email is required' : '',
    (value) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email' : ''
  ],
  password: [
    (value) => !value ? 'Password is required' : '',
    (value) => value.length < 6 ? 'Password must be at least 6 characters' : ''
  ],
  confirmPassword: [
    (value) => !value ? 'Please confirm password' : '',
    (value, allValues) => value !== allValues.password ? 'Passwords do not match' : ''
  ]
};

function RegistrationForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validationRules
  );

  const onSubmit = async (formData) => {
    console.log('Submitting:', formData);
    // API call
    await api.post('/auth/register', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="name"
        type="text"
        value={values.name}
        error={touched.name && errors.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Full Name"
      />

      <FormField
        name="email"
        type="email"
        value={values.email}
        error={touched.email && errors.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
      />

      <FormField
        name="password"
        type="password"
        value={values.password}
        error={touched.password && errors.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
      />

      <FormField
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        error={touched.confirmPassword && errors.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirm Password"
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

// Reusable FormField component
function FormField({ name, type, value, error, onChange, onBlur, placeholder }) {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

---

## React Hook Form

### Why React Hook Form?

| Feature | Benefit |
|---------|---------|
| Uncontrolled | Better performance |
| Less re-renders | Faster forms |
| Built-in validation | Less code |
| Easy integration | Works with UI libraries |
| TypeScript support | Type safety |

### Installation

```bash
npm install react-hook-form
```

### Basic Usage

```jsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // { email: "...", password: "..." }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format'
            }
          })}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
          type="password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          placeholder="Password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Advanced React Hook Form

```jsx
import { useForm, Controller } from 'react-hook-form';

function CompleteForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      gender: '',
      agree: false
    }
  });

  // Watch specific field
  const watchAge = watch('age');

  const onSubmit = async (data) => {
    console.log(data);
    await api.post('/users', data);
    reset(); // Reset form after submit
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Text inputs */}
      <input
        {...register('firstName', { required: 'First name is required' })}
        placeholder="First Name"
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      {/* Number input */}
      <input
        type="number"
        {...register('age', {
          required: 'Age is required',
          min: { value: 18, message: 'Must be at least 18' },
          max: { value: 100, message: 'Must be under 100' }
        })}
        placeholder="Age"
      />

      {/* Select */}
      <select {...register('gender', { required: 'Gender is required' })}>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          {...register('agree', { 
            required: 'You must agree to terms' 
          })}
        />
        I agree to terms
      </label>
      {errors.agree && <span>{errors.agree.message}</span>}

      {/* Watched value */}
      {watchAge && <p>You entered age: {watchAge}</p>}

      <button type="submit" disabled={isSubmitting || !isDirty}>
        Submit
      </button>
      <button type="button" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
}
```

---

## Form Project Examples

### Example 1: Contact Form

```jsx
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setStatus({
        type: 'success',
        message: 'Message sent successfully!'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>

      {status.message && (
        <div className={`alert alert-${status.type}`}>
          {status.message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? 'error' : ''}
        />
        {errors.subject && <span className="error-text">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="error-text">{errors.message}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

### Example 2: Multi-Step Form

```jsx
import { useState } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    // Step 2: Address
    street: '',
    city: '',
    zipCode: '',
    // Step 3: Preferences
    newsletter: false,
    notifications: 'email'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Final Data:', formData);
    // Submit to API
  };

  return (
    <div className="multi-step-form">
      {/* Progress Bar */}
      <div className="progress">
        <div className="progress-bar" style={{ width: `${(step / 3) * 100}%` }} />
      </div>
      
      <div className="steps-indicator">
        <span className={step >= 1 ? 'active' : ''}>1. Personal</span>
        <span className={step >= 2 ? 'active' : ''}>2. Address</span>
        <span className={step >= 3 ? 'active' : ''}>3. Preferences</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="step">
            <h3>Personal Information</h3>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        )}

        {/* Step 2: Address */}
        {step === 2 && (
          <div className="step">
            <h3>Address</h3>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="ZIP Code"
            />
            <div className="buttons">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="button" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="step">
            <h3>Preferences</h3>
            <label>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              Subscribe to newsletter
            </label>
            
            <div>
              <p>Notification preference:</p>
              <label>
                <input
                  type="radio"
                  name="notifications"
                  value="email"
                  checked={formData.notifications === 'email'}
                  onChange={handleChange}
                />
                Email
              </label>
              <label>
                <input
                  type="radio"
                  name="notifications"
                  value="sms"
                  checked={formData.notifications === 'sms'}
                  onChange={handleChange}
                />
                SMS
              </label>
            </div>
            
            <div className="buttons">
              <button type="button" onClick={prevStep}>Back</button>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
```

---

## 📝 Quick Summary

| Concept | Key Points |
|---------|------------|
| **Controlled** | React controls input via state |
| **Uncontrolled** | DOM controls input via refs |
| **onChange** | Update state on every change |
| **onBlur** | Good for validation trigger |
| **Validation** | Check before submit |
| **Error Display** | Show only after touched |
| **React Hook Form** | Best for complex forms |

### Form Best Practices

1. **Use controlled components** for most forms
2. **Validate on blur** for better UX
3. **Show errors only after touched**
4. **Disable submit while loading**
5. **Clear errors when user types**
6. **Use custom hooks** for reusable logic

---

*Next: [09-Performance-Optimization.md](./09-Performance-Optimization.md)*
