import ApolloService from 'ember-apollo-client/services/apollo';

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
    req.options.headers.authorization = 'Basic ZGQ0ZDRkYzE0NjU0MmJhNzc2MzMwNWQ3MWQxYjNkMzg=';
    next();
  }
});
