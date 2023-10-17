import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const Movie = () => {
    const { id } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [movie, setMovie] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=pt-BR&append_to_response=credits`
        )
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
                console.log(data.credits.cast);
            }); // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="container borde mt-4 pt-4">
                <div className="row">
                    <div className="col-md-3">
                        <img
                            className="img_movie float-left" // Adicionando a classe "float-left"
                            src={`${imagePath}${movie.poster_path}`}
                            alt="{movie.title}"
                        />
                    </div>
                    <div className="col-md-9">
                        <h1>{movie.title}</h1>
                        <h3>Data de lançamento: {movie.release_date}</h3>
                        <div className="descricao">
                            <h4>Descrição: </h4>
                            <p className="movie-desc">{movie.overview}</p>
                        </div>
                        <h4>Nota: {movie.vote_average}</h4> <br />
                        <Link to="/">
                            <button className="link_button">Voltar</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center"><div className="col-6">
                <h1 className="">Elenco</h1>
                    {movie.credits && 
                    movie.credits.cast.map((item, index) => (
                    <div key={index} className="cast-item">
                        <div className="actor-name">{item.name}</div>
                        <div className="character-name">{item.character}</div>
                    </div>
                    ))
                    }
                </div>
            </div>
            </div>
            
    );
}

export default Movie;
