import React, {Component} from 'react';
import '../css/LineItem.css';

class LineItem extends Component {
  render() {
    return (
      <li className="Line-item">
        <div className="Line-item---temp"/>
        <div className="Line-item__details">
          <h3 className="Line-item__title">Line Item Title</h3>
          <button className="Line-item__remove">x</button>
        </div>
      </li>
    );
  }
}

export default LineItem;
