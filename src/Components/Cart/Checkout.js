import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const Checkout = (props) => {
    const [formInputValidity, setFormInputvalidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

   const nameInputRef =  useRef();
   const streetInputRef =  useRef();
   const postalInputRef =  useRef();
   const cityInputRef =  useRef();

   const isEmpty = value => 
       value.trim() === '';

   const isNotFiveChar = value =>
       value.trim().length !== 5;

    const  confirmHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = !isNotFiveChar(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);

        setFormInputvalidity({
            name: enteredCityIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid,
        })

        const fromIsValid = 
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalIsValid &&
            enteredCityIsValid;

        

        if (!fromIsValid) {
            
            return;
        };

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
        });
    };

    const nameControlClasses = `
        ${classes.control}
        ${formInputValidity.name ? "" : classes.invalid}
        `;
    const streetControlClasses = `
        ${classes.control}
        ${formInputValidity.street ? "" : classes.invalid}
        `;
    const postalControlClasses = `
        ${classes.control}
        ${formInputValidity.postalCode ? "" : classes.invalid}
        `;
    const cityControlClasses = `
        ${classes.control}
        ${formInputValidity.city ? "" : classes.invalid}
        `;

    return (
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputValidity.name && <p>Please enter a valid Name...</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formInputValidity.street && <p>Please enter a valid Street...</p>}
        </div>
        <div className={postalControlClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!formInputValidity.postalCode && (
            <p>Please enter a valid Postal Code...</p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputValidity.city && <p>Please enter a valid City...</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
};


export default Checkout;