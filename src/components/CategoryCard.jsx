import { Link } from "react-router-dom";

function CategoryCard({ category }) {




    return (
        <Link to={`/category/post/${category.id}`} className="category-list__item">
            <img className="category-list__icon" src={category.imageUrl} alt="Name" />
            <strong className="category-list__name">{category.name}</strong>
        </Link>
    );
}
export default CategoryCard;
