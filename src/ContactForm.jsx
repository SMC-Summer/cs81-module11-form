import React, { useState } from 'react';
// Import the CSS module
import styles from './ContactForm.module.css';

function ContactForm() {
  // Add 'phone' to the initial state
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Regular expression for basic phone number validation (e.g., 123-456-7890, (123) 456-7890, 1234567890)
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'A valid email is required';
    // Add phone number validation
    if (formData.phone && !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      // Clear the form, including the new 'phone' field
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
      setSubmittedData(formData); // Display submitted data
    } else {
      setErrors(validationErrors);
      setSubmittedData(null); // Clear previous submission on new error
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Contact Us 📞</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Form Group for Name */}
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        {/* Form Group for Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        
        {/* Form Group for Phone Number (Optional) */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number (Optional):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 123-456-7890"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>

        {/* Form Group for Message */}
        <div className={styles.formGroup}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {submittedData && (
        <div className={styles.submittedData}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ContactForm;