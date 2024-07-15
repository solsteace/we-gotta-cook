import { Link } from "react-router-dom"
import "/src/_global.scss";
import "./site.scss";

export function SiteTemplate({children}: {children: JSX.Element[]}) {
    return (
        <>
            <header>
                <Link to="/" className="site__logo">
                    <div className="icon icon--medium">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/6349/6349584.png" 
                            alt="WGC | We Gotta Cook" 
                            className=""
                        />
                    </div>
                </Link>
                <nav className="headerNav">
                    <ul className="nav__menus">
                        <li className="nav__menu">
                            <Link to="meals"> Meals </Link>
                        </li>
                        <li className="nav__menu">
                            <Link to="cocktails"> Cocktails </Link>
                        </li>
                        <li className="nav__menu">
                            <Link to="blogs"> Blogs </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <section className="site__main">
                {children}
            </section>
            <footer>
                <div className="footer__content">
                    <Link to="/" className="site__logo">
                        <div className="icon icon--medium">
                            <img 
                                src="https://cdn-icons-png.flaticon.com/512/6349/6349584.png" 
                                alt="WGC | We Gotta Cook" 
                                className=""
                            />
                        </div>
                    </Link>
                    <nav className="footerNav">
                        <ul className="footerNav__menus">
                            <li className="nav__menu">
                                <Link to="meals"> Meals </Link>
                            </li>
                            <li className="nav__menu">
                                <Link to="cocktails"> Cocktails </Link>
                            </li>
                            <li className="nav__menu">
                                <Link to="blogs"> Blogs </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="site__copyright"> @solsteace - 2024 </div>
            </footer>
        </>
    )
}