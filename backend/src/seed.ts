import log from './utils/logger'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'

const seedData = async () => {
  const url = 'mongodb://localhost:27017'
  const dbName = 'bookstore'

  const client = new MongoClient(url)

  try {
    await client.connect()

    const db = client.db(dbName)
    const creationDate = new Date().toISOString()
    const hashedPassword = await bcrypt.hash('password', 10)

    const userDocuments = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: creationDate,
        updatedAt: creationDate,
      },
      {
        email: 'standard@gmail.com',
        username: 'standard',
        password: hashedPassword,
        role: 'standard',
        createdAt: creationDate,
        updatedAt: creationDate,
      },
    ]

    const bookDocuments = [
      {
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K. Rowling',
        description: 'The first book in the Harry Potter series',
        price: 29.99,
        availability: true,
        rate: 5,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A classic novel about racial injustice',
        price: 14.99,
        availability: true,
        rate: 4,
      },
      {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel set in a totalitarian society',
        price: 19.99,
        availability: false,
        rate: 4,
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A novel about the American Dream and the Jazz Age',
        price: 12.99,
        availability: true,
        rate: 5,
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A classic romance novel',
        price: 9.99,
        availability: true,
        rate: 5,
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        description: 'A coming-of-age novel',
        price: 15.99,
        availability: true,
        rate: 4,
      },
      {
        title: 'To Kill a Kingdom',
        author: 'Alexandra Christo',
        description: 'A fantasy novel about a siren princess',
        price: 17.99,
        availability: true,
        rate: 3,
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        description: 'A fantasy adventure novel',
        price: 22.99,
        availability: false,
        rate: 5,
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        description: 'A philosophical novel about a young shepherd',
        price: 13.99,
        availability: true,
        rate: 5,
      },
      {
        title: 'The Hunger Games',
        author: 'Suzanne Collins',
        description: 'A dystopian novel set in a post-apocalyptic world',
        price: 16.99,
        availability: true,
        rate: 5,
      },
    ]

    await db.collection('users').insertMany(userDocuments)
    await db.collection('books').insertMany(bookDocuments)

    log.info('Data seeded successfully.')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await client.close()
  }
}

seedData()
