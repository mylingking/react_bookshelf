import React from "react";
// import * as BooksAPI from './BooksAPI'
import { search, update, getAll } from "./BooksAPI";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";

// import page components
import Search from "./Search";
import ListBooks from "./ListBooks";
import Error from "./Error";

class BooksApp extends React.Component {
  state = {
    searchResults: [],
    readingState: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  };

  //method to get all books and sort them in shelfs
  componentDidMount() {
    getAll().then(results => {
      //construct an array to feed currentlyReading state
      const currentlyReading = results.filter(
        result => result.shelf === "currentlyReading"
      );
      //construct an array to feed wantToRead state
      const wantToRead = results.filter(
        result => result.shelf === "wantToRead"
      );
      //construct an array to feed wantToRead state
      const read = results.filter(result => result.shelf === "read");

      this.setState({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read
      });
    });
  }

  // Function passed to search, callback the shelf the book belongs ["wantToRead", "currentlyReading", "read"]
  handleShelf = (book, newShelf) => {
    // update the book's shelf property in the server
    update(book, newShelf)
      .then(
        // change the state of the shelf
        this.setState(state => {
          // store the book's initial shelf property
          const oldShelf = book.shelf;
          // store the book's initial id propery
          const id = book.id;
          // find the index of the book in initla shelf state
          const index = Array.isArray(() =>
            this.state[oldShelf].findIndex(book => book.id === id)
          );

          //change the book's shelf property to new shelf selected
          book.shelf = newShelf;
          //add the book to the new shelf
          state[newShelf].push(book);
          //delete the book from the old shelf
          if (index) {
            state[oldShelf].splice(index, 1);
          }

          //reset the state with the modifed contents
          return { [oldShelf]: state[oldShelf], [newShelf]: state[newShelf] };
        })
      )
      .catch(err => console.log("error fetching parsing data", err));
  };

  // method transfered to '/search', the search results will then be callback here then stored in states
  handleSearch = query => {
    search(query)
      .then(books => {
        // check if returned results form an array
        if (Array.isArray(books)) {
          // initialize all books in search results with shelf = "none"
          books.map(book => (book.shelf = "none"));
          //loop through searched books
          for (let i = 0; i < books.length; i++) {
            // check if a book belongs to currentlyReading
            for (let j = 0; j < this.state.currentlyReading.length; j++) {
              if (books[i].id === this.state.currentlyReading[j].id) {
                books[i].shelf = "currnetlyReading";
              }
            }
            // check if a book belongs to wantToRead
            for (let j = 0; j < this.state.wantToRead.length; j++) {
              if (books[i].id === this.state.wantToRead[j].id) {
                books[i].shelf = "wantToRead";
              }
            }
            // check if a book belongs to read
            for (let j = 0; j < this.state.read.length; j++) {
              if (books[i].id === this.state.read[j].id) {
                books[i].shelf = "read";
              }
            }
          }
        }
        //store the search results in the state
        this.setState({
          searchResults: books
        });
      })
      // catch and log error during fetching data
      .catch(err => console.log("error fetching and parsing data", err));
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ListBooks
                handleShelf={this.handleShelf}
                wantToRead={this.state.wantToRead}
                currentlyReading={this.state.currentlyReading}
                read={this.state.read}
              />
            )}
          />
          <Route
            exact
            path="/search"
            // redirect to /search/index when at /search
            render={() => <Redirect to="/search/index" />}
          />
          <Route
            path="/search/:id"
            render={() => (
              <Search
                handleSearch={this.handleSearch}
                searchResults={this.state.searchResults}
                handleShelf={this.handleShelf}
              />
            )}
          />
          {/* handle 404 url */}
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
