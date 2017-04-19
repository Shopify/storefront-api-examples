import React from 'react';
import Relay from 'react-relay';
import Product from './Product';


const Shop = (props) => {
  return (
    <div>
      Store: { props.shop.name }
      {
        props.shop.products.edges.map(function (product) {
          return (
           <Product title={ product.node.title } key={ product.node.id }/>
          );
        })
      }
    </div>
  )
}

export default Relay.createContainer(Shop, {
  fragments: {
    shop: () => Relay.QL`
      fragment on Shop {
        name,
        products(first: 10) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `,
  },
});
