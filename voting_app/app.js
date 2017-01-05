const ProductList = React.createClass({
  getInitialState: function () {
    return {
      products: [],
      sort: true,
    };
  },

  componentDidMount: function () {
    this.updateState();
  },

  updateState: function () {
    const products = Data.sort((a, b) => {
      if (this.state.sort) {
        return b.votes - a.votes;
      }
      return a.votes - b.votes;
    });
    this.setState({products: products});
  },

  handleProductUpVote: function (productId) {
    Data.forEach(el => {
      if (el.id === productId) {
        el.votes++;
        return;
      }
    });
    this.updateState();
  },

  handleProductDownVote: function (productId) {
    Data.forEach(el => {
      if (el.id === productId) {
        el.votes--;
        return;
      }
    });
    this.updateState();
  },

  sortDirection: function () {
    this.state.sort ? this.setState({sort: false}) : this.setState({sort: true});
    this.updateState();
  },

  render: function () {
    const products = this.state.products.map(product => {
      return (
        <Product
          key={`product-${product.id}`}
          id={product.id}
          title={product.title}
          description={product.description}
          url={product.url}
          votes={product.votes}
          submitter_avatar_url={product.submitter_avatar_url}
          product_image_url={product.product_image_url}
          onVote={this.handleProductUpVote}
          downVote={this.handleProductDownVote}
        />
      );
    });
    return (
      <div className='ui items'>
        <button onClick={this.sortDirection}>Sort Direction</button>
        {products}
      </div>
    );
  },
});

const Product = React.createClass({
  handleUpVote: function () {
    this.props.onVote(this.props.id);
  },

  handleDownVote: function () {
    this.props.downVote(this.props.id);
  },

  render: function () {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.product_image_url} />
        </div>
        <div className='middle aligned content'>
          <div className='ui grid'>
            <div className='three wide column'>
              <div className='ui basic center aligned segment'>
                <a onClick={this.handleUpVote}>
                  <i className='large caret up icon'></i>
                </a>
                <a onClick={this.handleDownVote}>
                  <i className='large caret down icon'></i>
                </a>
                <p><b>{this.props.votes}</b></p>
              </div>
            </div>
            <div className='twelve wide column'>
              <div className='header'>
                <a href={this.props.url}>
                  {this.props.title}
                </a>
              </div>
              <div className='meta'>
                <span></span>
              </div>
              <div className='description'>
                <p>{this.props.description}</p>
              </div>
              <div className='extra'>
                <span>Submitted by:</span>
                <img
                  className='ui avatar image'
                  src={this.props.submitter_avatar_url}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});


ReactDOM.render(<ProductList />, document.getElementById('content')
);