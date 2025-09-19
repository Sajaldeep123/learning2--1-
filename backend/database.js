const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db;

async function setupDatabase() {
    if (db) {
        return db;
    }

    db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            authorId INTEGER,
            likes INTEGER DEFAULT 0,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (authorId) REFERENCES users(id)
        );
    `);
    
    console.log('Database setup complete.');
    return db;
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized!');
    }
    return db;
}

module.exports = { setupDatabase, getDb };
