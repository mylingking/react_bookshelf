import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Shelf from "./Shelf";

class ListBooks extends Component {
  goToSearchPage = () => {
    let path = "/search";
    this.props.history.push(path);
  };

  render() {
    const shelves = [
      {
        title: "Currently Reading",
        id: "currentlyReading",
        books: this.props.currentlyReading
      },
      { title: "Want To Read", id: "wantToRead", books: this.props.wantToRead },
      {
        title: "Read",
        id: "Read",
        books: this.props.read
      }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => {
              return (
                <Shelf
                  title={shelf.title}
                  key={shelf.id}
                  books={shelf.books}
                  handleShelf={this.props.handleShelf}
                />
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <button onClick={this.goToSearchPage}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default withRouter(ListBooks);
