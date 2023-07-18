import s from "../Profile_v2.module.css";

export function NavBarProfile({tab, changeTab}) {
    return (
        <nav className={s.navBarProfile}>
            <button
                className={tab === "favorites" ? s.save : s.discard}
                name="favorites"
                onClick={changeTab}
                disabled={tab === "favorites"}
            >
                Favoritos
            </button>
            <button
                className={tab === "reseñas" ? s.save : s.discard}
                name="reseñas"
                onClick={changeTab}
                disabled={tab === "reseñas"}
            >
                Reseñas
            </button>
            <button
                className={tab === "compras" ? s.save : s.discard}
                name="compras"
                onClick={changeTab}
                disabled={tab === "compras"}
            >
                Compras
            </button>
            <button
                className={tab === "carrito" ? s.save : s.discard}
                name="carrito"
                onClick={changeTab}
                disabled={tab === "carrito"}
            >
                Carrito
            </button>
        </nav>
    );
}
