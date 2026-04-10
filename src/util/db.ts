import { Database } from './types' // this is the Database interface we defined earlier
import SQLite from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import { up as migrateUp } from './migrations/migration'

const dialect = new SqliteDialect({
  database: new SQLite('database.db'), // Use persistent database file
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
})

// Initialize database with migrations
export async function initializeDatabase() {
  try {
    console.log('Running database migrations...')
    await migrateUp(db)
    console.log('Database initialized successfully')
  } catch (error) {
    console.error('Database initialization failed:', error)
    throw error
  }
}

// Auto-initialize on first import
let initialized = false
export async function ensureInitialized() {
  if (!initialized) {
    await initializeDatabase()
    initialized = true
  }
}