import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import LoadingCard from "../components/LoadingCard";
import { Link } from "react-router-dom";

function NewsCategoryPage() {
    const { id } = useParams();
    const [category, setCategory] = useState({});
    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const response = await axios.get(`https://abbed7754d7c71af.mokky.dev/category/${id}`);
                setCategory(response.data);
            } catch (e) {
                console.error("Error fetching category:", e);
            }
        }

        async function fetchPosts() {
            try {
                setIsLoading(true);
                const response = await axios.get("https://abbed7754d7c71af.mokky.dev/post");
                setPosts(response.data); // json
                console.log(response.data);
            } catch (e) {
                setIsError(true);
                console.error("Error fetching posts:", e);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategory();
        fetchPosts();
    }, [id]);

    if (isError) {
        return <Error message="Ошибка загрузки данных" />;
    }

    if (isLoading) {
        return <LoadingCard />;
    }

    return (
        <section className="mobile-block">
            <div className="container">
                <h1 className="title">{category.name}</h1>
                <div className="news-list">
                    {posts.filter((post) => post.category === category.name).map((post) => (
                            <article key={post.id} className="news-card">
                                <h3 className="news-card__title">{post.title}</h3>
                                <h4 className="news-card__category">{post.category}</h4>
                                <strong className="news-card_date">{post.date}</strong>
                                <Link to={`/post/${post.id}`} className="button primary">Прочитать описание</Link>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default NewsCategoryPage;
