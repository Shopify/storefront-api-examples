import ApolloService from 'ember-apollo-client/services/apollo';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ApolloService.extend({
  init() {
    this._super(...arguments);
    this.get('client').networkInterface.use([{
      applyMiddleware: (req, next) => this._runAuthorize(req, next)
    }]);
  },

  _runAuthorize(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the headers object if needed.
    }
    req.options.headers.authorization = 'Basic NjYzMzY1Y2ZhZTJjODRmMGY2OGNhMTAwNjMyOWE2OTQK';
    next();
  }
});
