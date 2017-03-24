import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    shop: () => Relay.QL`
      query { shop }
    `,
  };
  static routeName = 'ShopRoute';
}
