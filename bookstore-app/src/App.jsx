import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const bookData = {
    "fiction": [
      {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "price": 10.00},
      {"title": "1984", "author": "George Orwell", "price": 8.50},
      {"title": "The Catcher in the Rye", "author": "J.D. Salinger", "price": 9.80}
    ],
    "non-fiction": [
      {"title": "Sapiens: A Brief History of Humankind", "author": "Yuval Noah Harari", "price": 15.00},
      {"title": "In Cold Blood", "author": "Truman Capote", "price": 12.00},
      {"title": "The Diary of a Young Girl", "author": "Anne Frank", "price": 7.00}
    ],
    "children": [
      {"title": "Charlotte's Web", "author": "E.B. White", "price": 5.00},
      {"title": "The Gruffalo", "author": "Julia Donaldson", "price": 6.00},
      {"title": "Where the Wild Things Are", "author": "Maurice Sendak", "price": 8.00}
    ]
  };

  const [isFiction, setIsFiction] = useState(true);
  const [isNonFiction, setIsNonFiction] = useState(true);
  const [isChildren, setIsChildren] = useState(true);

  const [basket, setBasket] = useState(new Set());

  function addToBucket(book) {
    setBasket(new Set([...basket, book]));
  }
  return (
    <>
      <div className="container">
        <div className="catalog">
          <div>
            <button onClick={() => setIsFiction(!isFiction)}>Fiction</button>
            <button onClick={() => setIsNonFiction(!isNonFiction)}>Non-Fiction</button>
            <button onClick={() => setIsChildren(!isChildren)}>Children</button>
          </div>

          {isFiction && (
            <>
              <h1>Fiction</h1>
                <RenderBook bookData={bookData} genre="fiction" addToBucket={addToBucket}/>
            </>   
          )}

          {isNonFiction && (
            <>
              <h1>Non-Fiction</h1>
                <RenderBook bookData={bookData} genre="non-fiction" addToBucket={addToBucket}/>
            </>   
          )}

          {isChildren && (
            <>
              <h1>Children</h1>
                <RenderBook bookData={bookData} genre="children" addToBucket={addToBucket}/>
            </>   
          )}
        </div>

        <div>
          <h1>Basket</h1>
          {Array.from(basket).map((book,index) => {
            return (
              <li key={book.title}>
                {`${book.title}, ${book.author}, \$${book.price} `}
              </li>
            )
          })}
        </div>
      </div>
    </>
  );
}

function RenderBook({ bookData, genre, addToBucket}) {
  return (
    bookData[genre].map(book => (
      <li key={book.title}>
        {`${book.title}, ${book.author}, \$${book.price} `}
        <button onClick={() => addToBucket(book)}>add</button>
      </li>
    ))
  );
}

export default App;

