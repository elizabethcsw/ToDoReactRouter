import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';

class PostNew extends Component {
  constructor(props){
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  renderField(field) {
    const  { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type='text'
          {...field.input}
        />
      <div className="text-help">
      {touched ? error : ''}
      </div>
      </div>
    )
  }

  onFormSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }


  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <Field
            label="Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="Categories"
            name="categories"
            component={this.renderField}
          />
          <Field
            label="Content"
            name="content"
            component={this.renderField}
          />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/posts">
          Cancel
        </Link>
        </form>
      </div>
    );
  }
}


function validate(values) {
  const errors = {};
  if(values.title && values.title.length < 3) {
    errors.title = "More than 3 characters"
  }
  if(!values.title) {
    errors.title = "Enter a title"
  }
  if(!values.content) {
    errors.content = "Enter some content"
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostNew)
);
