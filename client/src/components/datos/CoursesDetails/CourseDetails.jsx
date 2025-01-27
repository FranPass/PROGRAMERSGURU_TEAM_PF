import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCourses, clearMessage } from "../../../Redux/actions";
import {
    postFavoriteRequest,
    deleteFavoriteRequest,
} from "../../../axiosRequests/axiosRequests";
import { getCoursesByIdRequest } from "../../../axiosRequests/axiosRequests";
import Rating from "@mui/material/Rating";
import theme from "../../../theme/theme";

import styles from "./CourseDetails.module.css";
import Comments from "../Comments/Comments";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//_________________________module_________________________
function CourseDetails() {
    //global states:
    const user = useSelector((state) => state.user);
    //states:

    const [loading, setLoading] = useState(true);
    const [fav, setFav] = useState(false);
    const [ids, setIds] = useState({
        userId: 0,
        courseId: 0,
    });
    const [course, setCourse] = useState({});
    //const:      
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} 
                style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(255, 100, 100, 0.85)',
                    padding: '2px 10px',
                    color: 'white',
                    borderRadius: 3,
                    ...props.style,
                }}>
          <a href="/pagosubscripcion" className={styles.link}>Funcionalidad solo para suscriptores</a>
        </Tooltip>
      );

    const expirationDate = new Date(user?.expirationDate);
    const actualDate = new Date();

    const emptyHeart = "https://www.svgrepo.com/show/340294/favorite.svg";
    const fullHeart = "https://www.svgrepo.com/show/340295/favorite-filled.svg";
    const dispatch = useDispatch();
    const { id } = useParams();

    //functions:

    const [value, setValue] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [comments, setComments] = useState([]);
    const getCourse = async (id) => {
        const data = await getCoursesByIdRequest(id);
        setCourse(data);
        setFav(data?.Users?.find((fav) => fav?.id === user?.id) || false);
        // setValue(course?.meanRating)
        setComments(data?.Comments.reverse());

        for (let i = 0 ; i < comments?.length ; i++) {
            if (comments[i]?.userId === user?.id) {
                setDisabled(true)
                return console.log("ya tiene un comentario")
            }
        }
    };

    const handleRemoveFavorite = async (event) => {
        event.preventDefault();
        setFav(!fav);
        console.log(ids);
        const data = await deleteFavoriteRequest(ids);
        console.log(data.message);
    };
    const handleAddFavorite = async (event) => {
        event.preventDefault();
        setFav(!fav);
        console.log(ids);
        const data = await postFavoriteRequest(ids);
        console.log(data.message);
    };

    //life-cycles:
    useEffect(() => {
        getCourse(id);
        setIds({ ...ids, courseId: id, userId: user?.id });
        return () => {};
    }, [disabled, value]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => {
            dispatch(clearCourses());
            clearTimeout()
            dispatch(clearMessage());
        };
    }, [disabled]);

    useEffect(() => {
        console.log(course)
    }, [course])

    //component:
    return (
        <>
            {!loading ? (
                <div className={styles.component}>
                    <div className={`${styles.title} ${styles[theme("title")]}`}>
                        <h1>{course?.title}</h1>
                        <Rating
                            value={value || course?.meanRating}
                            precision={0.1}
                            name="read-only"
                            readOnly
                        />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.containerImage}>
                            <img
                                className={styles.imageURL}
                                src={course?.imageURL}
                                alt=""
                            />
                            <div
                                className={`${styles.data} ${
                                    styles[theme("data")]
                                }`}
                            >
                                <span>
                                    {expirationDate > actualDate ? 
                                    <>
                                        {!fav ? (
                                            <img
                                                className={`${styles.favorite} ${
                                                    styles[theme("favorite")]
                                                }`}
                                                onClick={handleAddFavorite}
                                                src={emptyHeart}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className={`${styles.favorite} ${
                                                    styles[theme("addfavorite")]
                                                }`}
                                                onClick={handleRemoveFavorite}
                                                src={fullHeart}
                                                alt=""
                                            />
                                        )}
                                    </>
                                    : <>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 500 }}
                                            overlay={renderTooltip}
                                            >
                                            <img
                                                className={`${styles.favorite} ${styles[theme("favorite")]}`}
                                                src={emptyHeart}
                                                alt=""
                                            /> 
                                        </OverlayTrigger>
                                    </>
                                    }
                                </span>
                                <div className={styles.subData}>
                                    <h4>{course?.title}</h4>
                                    <p>Idioma: {course?.language}</p>
                                    <p>
                                        Fecha de lanzamiento: {course?.released}
                                    </p>
                                    {course?.isFree ? (
                                        <p>Este curso es gratuito</p>
                                    ) : (
                                        <p>Este curso es de pago</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerDescription}>
                            <div
                                className={`${styles.description} ${
                                    styles[theme("description")]
                                }`}
                            >
                                <h3>Descripción del curso</h3>
                                <div className={styles.scroll}>
                                    <h4>{course?.description}</h4>
                                </div>
                                <div className={styles.technologies}>
                                    {course?.Technologies?.map((tech) => {
                                        return (
                                            <span
                                            key={tech?.id}
                                            className={styles.technology}
                                            >
                                                {tech.name}
                                            </span>
                                        );
                                    })}
                                </div>
                                <a href={course?.courseUrl}>Visita la página</a>
                            </div>
                            <div className={styles.comments}>
                                <Comments disabled={disabled} setDisabled={setDisabled} comments={comments} setValue={setValue}/>
                                {/* <Comments/> */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className={styles.carga}>Cargando...</h1>
            )}
        </>
    );
}

export default CourseDetails;
