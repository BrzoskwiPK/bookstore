db.createCollection('users')
db.createCollection('books')

db.users.insertMany([
  {
    email: 'admin@gmail.com',
    username: 'admin',
    password: 'password',
    role: 'admin',
  },
  {
    email: 'standard@gmail.com',
    username: 'standard',
    password: 'password',
    role: 'standard',
  },
])

db.books.insertMany([
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    description: 'The first book in the Harry Potter series',
    price: 29.99,
    availability: true,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A classic novel about racial injustice',
    price: 14.99,
    availability: true,
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in a totalitarian society',
    price: 19.99,
    availability: false,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American Dream and the Jazz Age',
    price: 12.99,
    availability: true,
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A classic romance novel',
    price: 9.99,
    availability: true,
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'A coming-of-age novel',
    price: 15.99,
    availability: true,
  },
  {
    title: 'To Kill a Kingdom',
    author: 'Alexandra Christo',
    description: 'A fantasy novel about a siren princess',
    price: 17.99,
    availability: true,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy adventure novel',
    price: 22.99,
    availability: false,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A philosophical novel about a young shepherd',
    price: 13.99,
    availability: true,
  },
  {
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    description: 'A dystopian novel set in a post-apocalyptic world',
    price: 16.99,
    availability: true,
  },
])
