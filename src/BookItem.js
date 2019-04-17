import React, { Component } from "react";

class BookItem extends Component {
  findShelf = event => {
    const shelf = event.target.value;
    const book = this.props.book;
    this.props.handleShelf(book, shelf);
  };

  // set default props in case the search does not return some props (title, authors, or images)
  static defaultProps = {
    title: "N/A",
    authors: "N/A",
    photo: ""
  };

  render() {
    // decide which props (transferred or default props to render)
    let { title, authors, imageLinks } = this.props.book;
    if (imageLinks === undefined) {
      imageLinks = this.props.photo;
    } else {
      imageLinks = this.props.book.imageLinks.thumbnail;
    }
    if (title === undefined) {
      title = this.props.title;
    }
    if (authors === undefined) {
      authors = this.props.authors;
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                //render with photo url or blank string
                backgroundImage: `url("${imageLinks}")`
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={event => this.findShelf(event)}
                defaultValue={this.props.book.shelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          {/* render title/authors or "N/A" */}
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    );
  }
}

export default BookItem;
