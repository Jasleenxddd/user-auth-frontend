import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const FormSubmission = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/forms', formData, {
        headers: { 'x-auth-token': auth.token }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={onChange} required />
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={onChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormSubmission;
