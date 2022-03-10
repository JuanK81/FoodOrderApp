import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal'
import classes from './Cart.module.css';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import { Fragment } from 'react/cjs/react.production.min';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemovehandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, amount: 1})
    };

    const orderHnadler = () => {
        setIsCheckout(true)
    };

//send data
    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
       // const response =   IMPLEMENT ERROR HANDLING
        await fetch(
          'https://meals-2-be318-default-rtdb.firebaseio.com/meals.json',
          {
            method: 'POST',
            body: JSON.stringify({
              user: userData,
              orderedItems: cartCtx.items,
            }),
          }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

// </>

const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price} 
            onRemove={cartItemRemovehandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            />
            ))}
    </ul>;

const modalActions = 
    <div className={classes.actions}>
        <button
            className={classes['button--alt']}
            onClick={props.onClose}
            >
            Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHnadler}>Order</button>}
    </div>;

const cartModalContent =
<Fragment>
    { cartItems }
    <div className={classes.total}>
        <span>TotalAmount</span>
        <span>{totalAmount}</span>
    </div>
    {isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
    {!isCheckout && modalActions}
</Fragment>

const isSubmittingModalContent = <p>Sending order data...</p>
const didSubmittModalContent = (
  <Fragment>
    <p>Successfully sent order!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  </Fragment>
);

return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmittModalContent}
      </Modal>
    );
};

export default Cart;