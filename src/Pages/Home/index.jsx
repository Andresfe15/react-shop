import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'
import './index'

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
      if (context.filteredItems?.length > 0) {
        return(
          context.filteredItems?.map(item =>(
            <Card key={item.id} data={item} />
          ))
        )
      }else{
        return (
          <div className='flex justify-center w-full'>
            <p className='text-xl font-medium mx-auto'>No existen coincidencias asociadas al producto buscado.</p>
          </div>
        )
      }
  }

  return (
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>Productos exclusivos:</h1>
        </div>
        <input 
         type='text' 
         placeholder='Buscar un producto' 
         className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
         onChange={(event) => context.setSearchByTitle(event.target.value)}/>
        <div className='grid gap-4 grid-cols-3 w-full max-w-screen-lg'>
          {renderView()}
        </div>
        <ProductDetail />
      </Layout>
  );
}

export default Home;

