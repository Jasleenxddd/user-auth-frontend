import React, { useState } from 'react';
import styles from "./styles.module.css";
import axios from 'axios';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/forms"; // Update with your API endpoint
            await axios.post(url, formData);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
            setFormData({ title: '', description: '' }); // Reset form
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>fakebook</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
            <div className={styles.formContainer}>
            <h1 className={styles.heading}>Submit Your Form</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    {/* <label htmlFor="title" className={styles.label}>Title</label> */}
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={styles.input}
							placeholder="Title"
							
                    />
                </div>
                <div className={styles.inputGroup}>
                    {/* <label htmlFor="description" className={styles.label}>Description</label> */}
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className={styles.textarea}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
		</div>
	);
};

export default Main;