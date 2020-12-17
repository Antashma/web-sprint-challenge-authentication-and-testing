const db = require('../data/dbConfig.js')

module.exports = {
    register,
    login,
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
        return await db('users').where({username}).first();
    } catch (error) {
        throw error
    }}


async function register(registration) {
    try {
    const ids = await db('users').insert(registration);
    return findById(ids[0]);  

    } catch (error){
        console.log(error)
        throw error;
    } 
}


async function login(credentials) {
    try {
    const foundUser = await findByUsername(credentials.username);
    return foundUser;  

    } catch (error){
        console.log(error)
        throw error;
    } 
}

