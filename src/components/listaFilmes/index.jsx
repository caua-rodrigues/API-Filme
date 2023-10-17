import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
import {Swiper, SwiperSlide} from "swiper/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ListaFilmes(props) {
    const imagePath = "https://image.tmdb.org/t/p/w500";
    const [movies, setMovies] = useState([]);

        useEffect(() => {
        fetch(props.link)
            .then((response) => response.json())
            .then((data) => {
         setMovies(data.results);
        });
        }, [props.link]);
    return (
        <div>
           <Swiper
              freeMode={true}
              slidesPerView={6}
              spaceBetween={30}
              modules={[FreeMode]}
            >
              {movies.slice(0, 20).map((movie, index) => (
                <SwiperSlide key={index}>
                  <div className='d-flex align-items-center'>
                    <Link to={`/${movie.id}`}>
                         <img
                        src={`${imagePath}${movie.poster_path}`}
                        alt={movie.title}
                        className='w-100 rounded'
                      />

                    </Link>
                     

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
    )
}
export default ListaFilmes;