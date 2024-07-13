import { Link } from "react-router-dom"

export function SiteTemplate({children}: {children: JSX.Element[]}) {
    return (
        <>
            <nav>
                <div className="nav__brand">
                    <Link to="/">
                        Icon
                    </Link>
                </div>
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
            <section className="main">
                {children}
            </section>
            <footer>
                <div className="footer__content">
                    <div className="footer__brand">
                        <Link to="/">
                            Icon
                        </Link>
                    </div>
                    <ul className="footer__menus">
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
                </div>
                <div className="footer__copyright"> @solsteace - 2024 </div>
            </footer>
        </>
    )
}