import './index.css';
import { useState } from 'react';

const FiltersGroup = props => {
  const { category, rating, onCategorySelect } = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryClick = categoryId => {
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId); // Notify parent component of category selection
  };

  const renderCategoryFilters = () => (
    <div className="category-filters">
      <h2>Category</h2>
      {category.map(item => (
        <div
          key={item.categoryId}
          className={`category-item ${selectedCategoryId === item.categoryId ? 'active' : ''}`}
          onClick={() => handleCategoryClick(item.categoryId)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );

  const renderRatingFilters = () => (
    <div className="rating-filters">
      <h2>Rating</h2>
      {rating.map(item => (
        <div key={item.ratingId}>
          <input
            type="radio"
            name="rating"
            id={`rating-${item.ratingId}`}
            value={item.ratingId}
          />
          <label htmlFor={`rating-${item.ratingId}`}>
            <img src={item.imageUrl} alt={`${item.ratingId} stars`} />
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="filters-group-container">
      <h1>Filters Group</h1>
      <input type="search" placeholder="Search Products..." />
      {renderCategoryFilters()}
      {renderRatingFilters()}
    </div>
  );
};

export default FiltersGroup;
