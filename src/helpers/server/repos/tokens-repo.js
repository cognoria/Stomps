import { db } from '../db';

const Token = db.Token;

export const tokenRepo ={
    find,
    create,
    delete: _delete,
}

async function create(user, token){
    return await Token.create({ user, token })
}

async function _delete(id){
    return await Token.findByIdAndDelete(id); 
}

async function find(token){
    return await Token.findOne({ token })
}