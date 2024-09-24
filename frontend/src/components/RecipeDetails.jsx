
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './RecipeDetails.css'; 

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(id); 
        setRecipe(data);
      } catch (error) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const downloadPDF = async () => {
    const input = document.getElementById('recipeContent');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 190; 
    const pageHeight = pdf.internal.pageSize.height; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width; 
    let heightLeft = imgHeight;

    let position = 0;

    
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${recipe.title}.pdf`);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="recipe-details">
      <div className="recipe-content" id="recipeContent">
        <h1 className="recipe-title">{recipe.title}</h1>
        <p className="description">{recipe.description}</p>
        <p className="created-by">Created by: {recipe.user.username}</p>
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p className="instructions">{recipe.instructions}</p>
      </div>
      <button className="download-button" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default RecipeDetails;
