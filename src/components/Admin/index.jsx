import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

const AdminView = () => {
  const { auth } = useContext(AuthContext);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get('/api/admin/forms', {
          headers: { 'x-auth-token': auth.token }
        });
        setForms(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchForms();
  }, [auth.token]);

  return (
    <div>
      <h1>All Submitted Forms</h1>
      <ul>
        {forms.map(form => (
          <li key={form._id}>
            <h3>{form.title}</h3>
            <p>{form.description}</p>
            <p>Submitted by: {form.user.username} ({form.user.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminView;
