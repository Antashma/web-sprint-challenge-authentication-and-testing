const db = require('../data/dbConfig.js')

module.exports = {
    register,
    findById,
    findByUsername,
}


async function findById(id) {
    try {
        return await db('users').where({id}).first();
    } catch (error) {
        throw error
    }
    
}


async function findByUsername(username) {
    try {
        return await db('users').where({username});
    } catch (error) {
        throw error
    }}


async function register(data) {
    try {
    const ids = await db('users').insert(data);
    return findById(ids[0]);  

    } catch (err){
        console.log(err)
        throw err;
    } 
}