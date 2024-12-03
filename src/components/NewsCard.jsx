import { Link } from "react-router-dom";

function NewsCard({ post }) {
    if (!post) {
        return <div>Загрузка...</div>;
    }

   
    const rating = 4; 
    const reviewsCount = 25; 

    
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? "star filled" : "star"}>★</span>
            );
        }
        return stars;
    };

    return (
        <article className="news-card">
                    {post.image && <img src={post.image} alt={post.title} className="news-card__image" />}
                    <h3 className="news-card__title">{post.title}</h3>
                    <h4 className="news-card__category">{post.category || 'Без категории'}</h4>
                    <strong className="news-card__date">{post.date || 'Дата не указана'}</strong>

                    <div className="news-card__rating">
                        <span className="rating-title">Рейтинг:</span>
                        <div className="stars">
                            {renderStars(rating)}
                        </div>
                        <span className="reviews-count">{reviewsCount} отзыва(ов)</span>
                    </div>
                    <Link to={`/post/${post.id}`} className="button primary">Прочитать описание</Link>
        </article>
    );
}

export default NewsCard;

