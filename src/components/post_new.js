import React, { Component } from 'react';
import { } from '../actions';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

class PostNew extends Component {


  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type='text'
          {...field.input}
        />
      </div>
    )
  }


  render() {
    return (
      <div>
        <form>
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
        </form>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function validate(values) {
  const errors = {}
}

export default reduxForm({
  form: 'PostNewForm',
  validate: validate,
})(PostNew)
