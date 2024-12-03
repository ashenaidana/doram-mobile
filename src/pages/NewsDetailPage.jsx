import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function NewsDetailPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null); // Используем `null` вместо пустого объекта
    const [error, setError] = useState(null); // Для обработки ошибок

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`https://abbed7754d7c71af.mokky.dev/post/${id}`);
                setPost(response.data);
            } catch (e) {
                console.error(e);
                setError("Не удалось загрузить данные. Попробуйте позже.");
            }
        }
        fetchPost();
    }, [id]);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!post) {
        return <p>Загрузка...</p>; // Отображение, пока данные загружаются
    }

    return (
        <section className="mobile block">
            <div className="container">
                <h1 className="title">{post.title}</h1>
                <h2 className="news-detail-date">{post.date}</h2>
                {post.imageUrl && (
                    <img src={post.imageUrl} className="news-detail-img" alt={post.title || "Новость"} />
                )}
                <p className="news-detail-description">{post.description}</p>
                <h4 className="news-card__category">{post.category}</h4>
            </div>
        </section>
    );
}

export default NewsDetailPage;
