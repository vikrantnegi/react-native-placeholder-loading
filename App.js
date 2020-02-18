import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';

import BookCardComponent from './components/BookCardComponent';
import BookCardPlaceholder from './components/BookCardPlaceholderComponent';

export default function App() {
  const [books, setBooks] = useState([...new Array(10).fill({})]);
  const [isDataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch(
      'https://www.googleapis.com/books/v1/volumes/?maxResults=30&q=danbrown'
    )
      .then(response => response.json())
      .then(responseJson => {
        const { items } = responseJson;

        const booksList = items.map(book => {
          const {
            volumeInfo: { title, authors, imageLinks },
            id: bookId,
          } = book;

          return {
            bookId,
            thumbnail: imageLinks
              ? imageLinks.thumbnail
              : 'https://i.ibb.co/YLC0nQQ/not-found.png',
            title,
            authors: authors ? authors.toString().replace(/,/g, ', ') : '-',
          };
        });

        setBooks(booksList);
        setDataFetched(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, [books]);

  const renderBookComponent = ({ item }) => {
    const { thumbnail, title, authors, bookId } = item;

    return (
      <BookCardComponent
        key={bookId}
        title={title}
        authors={authors}
        thumbnail={thumbnail}
      />
    );
  };

  const renderX = () => (
    <FlatList
      data={books}
      renderItem={renderBookComponent}
      keyExtractor={item => item.bookId}
    />
  );

  const renderPlaceholders = () =>
    books.map((e, i) => <BookCardPlaceholder key={i} />);

  return (
    <SafeAreaView style={styles.container}>
      {isDataFetched ? renderX() : renderPlaceholders()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 35,
  },
});
