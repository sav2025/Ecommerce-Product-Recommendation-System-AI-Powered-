
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    // Fetch product details
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.log(error));
    
    // Fetch product recommendations (AI-powered)
    axios.get(`http://localhost:5000/api/recommendations/${id}`)
      .then(response => setRecommendations(response.data))
      .catch(error => console.log(error));
  }, [id]);
  
  return (
    <div className="product-detail">
      {product && (
        <>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <h3>Recommendations</h3>
          <div className="recommendations">
            {recommendations.map(item => (
              <div key={item._id}>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetail;
