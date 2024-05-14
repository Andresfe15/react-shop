/**
 * Esta funcion calcula el precio total de una nueva orden
 * @param {Array} products cartProducts: Array de objetos
 * @returns {number} Total price
 */
export const totalPrice = (products) =>{
    let sum = 0
    products.forEach(product => sum += product.price)
    return sum
}