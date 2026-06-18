//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//
import { pool } from "../utils/database.js"

// Get all articles
export async function getArticles() {
    // TODO
    try {
        const [rows] = await pool.query(`select * from articles`);
        return rows;
    } catch (error) {
        console.log({ error: error.message });
        throw error
    }
}
// o GET /api/articles/:id article + journalist name.

export async function getArticleListByName(name) {
    if (!name) {
        console.log("No name is being given!")
        return null;
    }
    try {
        const [rows] = await pool.query(`select a.id, a.title, a.content, a.category ,j.name from 
    journalist j 
    join articles a on
    a.journalistId = j.id
    where j.name = ?
` , [name])
        if (rows.length === 0) {
            console.log("no article with this name " + name)
            return null;
        }
        return rows;
    } catch (error) {
        console.log({ error: error.message });
        return null;
    }
}
//o GET /api/journalists/:id/articles articles list by journalist.
export async function getArticlesByJournalistId(id) {
    // TODO
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        console.log("Cannot id ", parseId);
        return null;
    }
    try {
        const [rows] = await pool.query(`select a.id, a.title, a.content, a.category ,j.name from 
    journalist j 
    join articles a on
    a.journalistId = j.id
    where a.id = ?
` , [parseId])
        if (rows.length === 0) {
            console.log("Cannot find the article with this id:", parseId);
            return null;
        }
        return rows[0];
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
        const { title, content, journalist, category } = article;
        const [rows] = await pool.query(`Insert into articles(title, content, journalist, category) values (?, ?, ?,?)`, [title, content, journalist, category]);

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
    if (isNaN(parseid)) {
        console.log("cannot find id:", id);
        return null;
    }
    if (Object.keys(updatedData).length === 0) {
        console.log("at least one field must be provided!")
        return null;
    }
    try {
        // const {title, content, jounalist, category}  = updatedData;
        // const [updateRow] = await pool.query("update articles set title = ?, content = ?, jounalist = ?, category = ? where id = ?", [title], [content], [jounalist], [category], parseid);
        const fields = Object.keys(updatedData).map(key => `${key} = ?`)// transforming the the keys into title = ?, content = ?
        const values = [...Object.values(updatedData), parseid];//get all the values from the updateData and the id and putting into one array
        const [updateRow] = await pool.query(`update articles set ${fields.join(",")} where id = ?`, values) //joining the keys with ','
        if (updateRow.affectedRows === 0) {
            console.log("no article found with this id:", parseid);
        }
        return getArticleById(parseid);
    } catch (error) {
        console.log({ error: error.message })
        throw error
    }
}

// Delete an article by ID
export async function deleteArticle(id) {
    const delId = parseInt(id);
    if (isNaN(delId)) {
        console.log(`cannot find the id:${delId}`)
        return null;
    }
    try {
        const [delArticle] = await pool.query(`delete from articles where id = ?`, [delId]);
        if (delArticle.affectedRows === 0) {
            console.log(`No article found with id: ${delId}`);
            return null;
        }
        return getArticles();
    } catch (error) {
        console.log({ error: error.message });
        throw error;
    }
}
