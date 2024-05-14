import { ChevronRightIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'

const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;
  
  return (
    <div className='flex justify-between items-center mb-3 border border-black rounded-lg p-4 w-80'>
        <div className='flex justify-between w-full'>
          <p className='flex flex-col'>
            <span className='font-light'>01.02.2024</span>
            <span className='font-light'>{totalProducts} Articulos </span>
          </p>
          <p className='flex items-center gap-2'>
            <span className='font-medium text-2xl'>${totalPrice}</span>
            <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
          </p>
        </div>
    </div>
  )
}

OrdersCard.propTypes = {
  totalPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number 
  ]).isRequired,
  totalProducts: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number 
  ]).isRequired,
}

export default OrdersCard

