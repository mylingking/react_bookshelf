import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookItem from "./BookItem";

class Search extends Component {
  //stores the search key value
  state = {
    searchKey: ""
  };

  handleSearchKeyChange = event => {
    this.setState(
      {
        searchKey: event.target.value
      },
      //callback handleSearch after searchkey been changed
      this.props.handleSearch(event.target.value)
    );
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchKey}
              onChange={event => this.handleSearchKeyChange(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.isArray(this.props.searchResults) ? (
              this.props.searchResults.map(book => {
                return (
                  <BookItem
                    key={book.id}
                    book={book}
                    handleShelf={this.props.handleShelf}
                  />
                );
              })
            ) : (
              // if no results found, tell the user
              <li>No Results Found</li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
