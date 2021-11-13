import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal'
import classes from './Cart.module.css';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);

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

    const modalActions = <div className={classes.actions}>
        <button
            className={classes['button--alt']}
            onClick={props.onClose}
        >
            Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHnadler}>Order</button>}
    </div>;

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>TotalAmount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
            
        </Modal>)
};

export default Cart;