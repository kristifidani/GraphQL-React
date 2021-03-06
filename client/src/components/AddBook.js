import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    let name = this.state.name;
    let genre = this.state.genre;
    let authorId = this.state.authorId;

    if (!name || !genre || !authorId) {
      return(alert("All fields are required"));
    } else {      
    // use the addBookMutation
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    this.setState({ name: "", genre: "", authorId: ""});
  }
}
  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
       
          <h3 className='font-weight-bold'>Add Book </h3>
        <div>
          <label>Book name:</label>
          <input
            className ='form-control'
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>
        <div >
          <label>Genre:</label>
          <input
            className ='form-control'
            type="text"
            value={this.state.genre}
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>
        <div >
          <label>Author:</label>
          <select className="browser-default custom-select custom-select-lg mb-3"
          value={this.state.authorId}
          onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button className='btn btn-outline-primary bg-dark text-white'>POST</button>
  
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(getBooksQuery, { name: "getBooksQuery" })
)(AddBook);
