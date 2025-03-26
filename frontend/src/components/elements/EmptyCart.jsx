import React from 'react'
import icons from '../../utils/icons'

const EmptyCart = ({productsPage=false,onClickAdd}) => {
  return (
    <div className='h-full w-full flex justify-center items-center flex-col gap-2'>
        <div className=' rounded-full p-4  animate-pulse'><icons.EmptyCart fontSize='large'/></div>
        <div className='text-xl  capitalize text-danger'>No Items in cart ! Add Items to checkout</div>
        {productsPage && <div><button className='btn  px-4' onClick={onClickAdd}>Add Items</button></div>}
    </div>
  )
}

export default EmptyCart