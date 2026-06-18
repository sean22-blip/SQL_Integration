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
        console.log({ error: error.message });
        throw error
    }
}
// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const parseid = parseInt(id);
    if (isNaN(parseid)) {
        console.log("Cannot find matching id");
        return null;
    }
    try {
        const [rows] = await pool.query("Select* from articles where id = ? ", [parseid])
        if (rows.length === 0) {
            console.log("Cannot find the article with this id:", parseid);
            return null;
        }
        return rows[0];
    } catch (error) {
        console.log({ error: error.message });
        throw error
    }
}

// Create a new article
export async function createArticle(article) {
    // TODO
    try {
        const { title, content, jounalist, category } = article;
        const [rows] = await pool.query(`Insert into articles(title, content, jounalist, category) values (?, ?, ?,?)`, [title, content,jounalist,category]);

        return getArticleById(rows.insertId)


    } catch (error) {
        console.log({ error: error.message })
        throw error
    }
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const parseid = parseInt(id);
    if(isNaN(parseid)){
        console.log("cannot find id:", id);
        return null;
    }
    if(Object.keys(updatedData).length === 0){
        console.log("at least one field must be provided!")
        return null;
    }
    try{
        // const {title, content, jounalist, category}  = updatedData;
        // const [updateRow] = await pool.query("update articles set title = ?, content = ?, jounalist = ?, category = ? where id = ?", [title], [content], [jounalist], [category], parseid);
        const fields = Object.keys(updatedData).map(key => `${key} = ?`)// transforming the the keys into title = ?, content = ?
        const values = [...Object.values(updatedData), parseid];//get all the values from the updateData and the id and putting into one array
        const [updateRow] = await pool.query(`update articles set ${fields.join(",")} where id = ?`, values) //joining the keys with ','
        if(updateRow.affectedRows === 0){
            console.log("no article found with this id:", parseid);
        }
        return getArticleById(parseid);
    }catch(error){
        console.log({error: error.message})
        throw error
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const delId = parseInt(id);
    if(isNaN(delId)){
        console.log(`cannot find the id:${delId}`)
        return null;
    }
    try {
        const [delArticle] = await pool.query(`delete from articles where id = ?`, [delId]);
        if(delArticle.affectedRows === 0){
            console.log(`No article found with id: ${delId}`);
            return null;
        }
        return getAllArticles();
    } catch (error) {
        console.log({error: error.message});
        throw error;
    }
}
