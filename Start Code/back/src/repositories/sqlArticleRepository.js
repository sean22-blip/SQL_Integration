//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js"

// Get all articles
export async function getAllArticles() {
    // TODO
try {
    const [rows] = await pool.query(`Select * from articles`);
    return rows;
} catch (error) {
    console.log({error: error.message});
}
}
// Get one article by ID
export async function getArticleById(id) {
    // TODO
}

// Create a new article
export async function createArticle(article) {
    // TODO
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
}
