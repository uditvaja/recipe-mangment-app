
import React, { useEffect, useState } from 'react';
import { fetchRecipes, deleteRecipe } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './RecipeList.css';

const RecipeList = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    const getRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    getRecipes();
  }, []);

  const handleDelete = async (id) => {
    await deleteRecipe(id);
    setRecipes(recipes.filter((recipe) => recipe._id !== id));
  };

  // Filter recipes based on the search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort recipes based on the selected order
  const sortedRecipes = filteredRecipes.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div className="recipe-list-container">
      <h1 className="text-center mb-4">Recipe List</h1>
      <div className="mb-3 d-flex justify-content-between">
        <button onClick={() => navigate('/create')} className="btn btn-primary">
          Add Recipe
        </button>
        <input
          type="text"
          placeholder="Search by title"
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select w-25"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort by Title: A-Z</option>
          <option value="desc">Sort by Title: Z-A</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-header">
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecipes.length > 0 ? (
              sortedRecipes.map((recipe) => (
                <tr key={recipe._id}>
                  <td>{recipe.title}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="btn btn-danger me-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/edit/${recipe._id}`)}
                      className="btn btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/recipes/${recipe._id}`)}
                      className="btn btn-info"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No recipes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecipeList;
