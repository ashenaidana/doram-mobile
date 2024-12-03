import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import allIcon from "../assets/images/all.svg";
import LoadingRow from "../components/LoadingRow";

function NewsCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await axios.get('https://abbed7754d7c71af.mokky.dev/category');
        console.log(response.data); // Логирование данных
        setCategories(response.data);
      } catch (e) {
        console.error("Error fetching categories:", e); // Используйте console.error для ошибок
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section className="mobile block">
      <div className="container">
        <h1 className="title">Жанры дорам</h1>
        {isLoading ? (
          <LoadingRow />
        ) : (
          <div className="category-list">
          <Link to="/" className="category-list__item">
            <img className="category-list__icon" src={allIcon} alt="All categories" />
            <strong className="category-list__name">Все</strong>
          </Link>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

export default NewsCategoriesPage;



