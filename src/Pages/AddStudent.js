import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BasicForm } from '@ltts-dtp-appstudio/react-forms';
import formjson from '../JSON/formjson.json';






const AddStudent = () => {
    const initialFormData = {}; // Initialize empty form data object dynamically
  const [formData, setFormData] = useState(initialFormData);
  
  const handleChange = (name, value) => {  // Use a single handleChange
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">



      <Link to="/" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Go To Home
      </Link>

      <BasicForm 
        json={formjson}  
        
        
        />

    

    </div>
  );
};

export default AddStudent;
