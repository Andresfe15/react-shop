import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
    // Incremento/contador del carrito de compras
    const [count, setCount] = useState(0)

    // Abrir/cerrar detalle del producto
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    // Abrir/cerrar menú lateral de checkout
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Mostrar producto en el detalle del producto
    const [productToShow, setProductToShow] = useState({})

    // Agregar productos al carrito de compras
    const [cartProducts, setCartProducts] = useState([])

    // Ordenes (pedidos) del carrito de compras
    const [order, setOrder] = useState([])

    // Obtener productos
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null)

    // Obtener productos por título
    const [searchByTitle, setSearchByTitle] = useState(null)

    // Obtener productos por categoría
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => response.json())
            .then(data => {
                setItems(data);
            })
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    useEffect(() => {
        const filteredItemsByTitle = (items, searchByTitle) => {
            return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
        };

        const filteredItemsByCategory = (items, searchByCategory) => {
            return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
        };

        const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
            if (searchType === 'BY_TITLE') {
                return filteredItemsByTitle(items, searchByTitle)
            }
            if (searchType === 'BY_CATEGORY') {
                return filteredItemsByCategory(items, searchByCategory)
            }
            if (searchType === 'BY_TITLE_AND_CATEGORY') {
                return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
            }
            if (!searchType) {
                return items
            }
        }

        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory])

    return (
        <ShoppingCartContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ShoppingCartContext;



