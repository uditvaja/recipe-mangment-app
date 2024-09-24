import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';
const AUTH_URL = 'http://localhost:5000/api/auth'; 

export const fetchRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchRecipe = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRecipe = async (recipeData) => {
    try {
      const token = localStorage.getItem('token');  
      const response = await axios.post('http://localhost:5000/api/recipes', recipeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  
        },
        withCredentials: true
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  };


  export const updateRecipe = async (id, recipe) => {
    const token = localStorage.getItem('token'); // Ensure token is retrieved
    const response = await axios.put(`${API_URL}/${id}`, recipe, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    });
    return response.data;
  };

  export const deleteRecipe = async (id) => {
    const token = localStorage.getItem('token'); n
    console.log('Token:', token); 
    
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    });
    return response.data;
  };
  export const getRecipeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  };

export const registerUser = async (userData) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    return response.json();
  };

export const loginUser = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/login`, userData, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true  
    
  });
  localStorage.setItem('token', response.data.token);  
  return response.data;
};
