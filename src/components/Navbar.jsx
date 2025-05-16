import React, { useState } from 'react'
import CartWidget from './CartWidget'
import { Dropdown } from 'primereact/dropdown'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const categories = [
        { name: 'Todos', code: 'TODOS' },
        { name: 'Shonen', code: 'FIC' },
        { name: 'Mecha', code: 'NFIC' },
        { name: 'Shojo', code: 'INF' }
    ];

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.value);
        if (e.value.code === 'TODOS') {
            navigate('/');
        } else {
            // Navegar a la ruta de categoría usando el código o nombre según tu router
            navigate(`/category/${e.value.name}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="store-name">
                <Link to={"/"}>
                    <h1>STORE MANGAS</h1>
                </Link>
            </div>
            <div className="nav-controls">
                <div className="dropdown-container">
                    <Dropdown
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        options={categories}
                        optionLabel="name"
                        placeholder="Categorías de Mangas"
                        className="w-full md:w-14rem"
                    />
                </div>
                <Link to="/cart">
                    <CartWidget />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
