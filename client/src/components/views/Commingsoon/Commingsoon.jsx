import styles from "./Commingsoon.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Commingsoon =()=>{
    const darkMode = useSelector((state) => state.darkMode);
    const [elementClasses, setElementClasses] = useState({
        h1: "h1light",})
        
    return(
        <div className={styles.contain} >
        <div className={`${styles.h1} ${styles[elementClasses.h1]}`}>
            <h1>Ya casiiii</h1>
          <img className={styles.imgcat} src="https://media.tenor.com/v9sdELSzVw4AAAAC/nyan-cat-kawaii.gif" alt="banner" />

        </div></div>
    )
}

export default Commingsoon