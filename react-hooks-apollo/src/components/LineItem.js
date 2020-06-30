import React from 'react';

function LineItemm(props){

  const decrementQuantity = (lineItemId) => {
    const updatedQuantity = props.line_item.quantity - 1
    props.updateLineItemInCart(lineItemId, updatedQuantity);
  }

  const incrementQuantity = (lineItemId) => {
    const updatedQuantity = props.line_item.quantity + 1
    props.updateLineItemInCart(lineItemId, updatedQuantity);
  }

  return (
    <li className="Line-item">
      <div className="Line-item__img">
        {props.line_item.variant.image ? <img src={props.line_item.variant.image.src} alt={`${props.line_item.title} product shot`}/> : null}
      </div>
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <div className="Line-item__variant-title">
            {props.line_item.variant.title}
          </div>
          <span className="Line-item__title">
            {props.line_item.title}
          </span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
            <button className="Line-item__quantity-update" onClick={() => decrementQuantity(props.line_item.id)}>-</button>
            <span className="Line-item__quantity">{props.line_item.quantity}</span>
            <button className="Line-item__quantity-update" onClick={() => incrementQuantity(props.line_item.id)}>+</button>
          </div>
          <span className="Line-item__price">
            $ { (props.line_item.quantity * props.line_item.variant.price).toFixed(2) }
          </span>
          <button className="Line-item__remove" onClick={()=> props.removeLineItemInCart(props.line_item.id)}>×</button>
        </div>
      </div>
    </li>
  );
}

export default LineItemm;
