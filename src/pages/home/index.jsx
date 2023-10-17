import { Container } from "./style";
import { Link } from "react-router-dom";
import { Autoplay } from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListaFilmes from "../../components/listaFilmes";
import { useEffect, useState } from "react";


function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w1280";

    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY]);

    return (
        <div>
            <Container>
                <h1>Filmes em alta </h1>
                <Swiper className="mainCarrosel"
                    slidesPerView={1}
                    loop={true}
                    speed={1000}
                    modules={[Autoplay]}
                    autoplay={{delay:6000,disableOnInteraction:false}}> 
                    {
                        movies.map((movie, index) => {
                            return (
                                <SwiperSlide className="d-flex justify-content-center" key={movie.id}>
                                    <div className="position-relative">
                                        <img
                                            src={`${imagePath}${movie.backdrop_path}`}
                                            alt={movie.title}
                                            className="img-fluid rounded"
                                        />
                                        <div className="position-absolute bottom-0 start-0 ms-3 p-3">
                                            <Link to={`/${movie.id}`} className='text-decoration-none d-flex align-items-center mb-2'>
                                                <h1 className="text-white me-4 mb-1 " style={{ WebkitTextStroke: '1px black' }} >{movie.title}</h1>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <h1>Em cartaz</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=pt-BR`}/>
                <h1>Maiores Notas</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=pt-BR`}/>
                <h1>Comédia</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=35`}/>
                <h1>Ação</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=28`}/>
                <h1>Terror</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=27`}/>
                <h1>Documentários</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=99`}/>
                <h1>Musical</h1>
                <ListaFilmes link={`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=pt-BR&with_genres=10402`}/>
            </Container>
        </div>
    );
}

export default Home;
