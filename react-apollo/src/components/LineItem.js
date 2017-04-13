import React, {Component} from 'react';
import '../css/LineItem.css';

class LineItem extends Component {
  render() {
    return (
      <li className="Line-item">
        <div className="Line-item---temp">
          {this.props.line_item.variant.image ? <img src={this.props.line_item.variant.image.src} alt={`${this.props.line_item.title} product shot`}/> : null}
        </div>
        <div className="Line-item__details">
          <h3 className="Line-item__title">
            {this.props.line_item.quantity} -
            {this.props.line_item.title}
            { this.props.line_item.variant.title && <span> : {this.props.line_item.variant.title}</span>}
          </h3>
          <button className="Line-item__remove" onClick={() => this.props.removeVariantFromCart(this.props.line_item.id)}>x</button>
        </div>
      </li>
    );
  }
}

export default LineItem;
