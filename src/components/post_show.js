import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostShow extends Component {
  constructor(props){
    super(props);

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => { 
      this.props.history.push('/');
    })
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (<div>Loading</div>)
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick}>Delete</button>
        <h3>{post.title}</h3>
        <h6>{post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}


//posts[ownProps.match.params.id]
// is equivalent to
// this.props.posts[this.props.match.params.id]

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
