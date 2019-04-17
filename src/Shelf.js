import React from "react";
import BookItem from "./BookItem";

const CurrentBookShelf = props => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map(book => {
          return (
            <BookItem
              key={book.id}
              book={book}
              titile={book.title}
              handleShelf={props.handleShelf}
            />
          );
        })}
      </ol>
    </div>
  </div>
);

export default CurrentBookShelf;
