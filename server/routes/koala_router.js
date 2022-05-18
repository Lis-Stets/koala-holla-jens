const express = require('express');
const koalaRouter = express.Router();
const pool = require( '../modules/pool' );

// DB CONNECTION


// GET
koalaRouter.get( '/', ( req,res )=>{
    console.log( '/ GET router' );
    let queryString = `SELECT * FROM koalas`;
    pool.query( queryString ).then( ( result )=>{
        res.send( result.rows );
    }).catch ( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    }) 
})

// POST


// PUT


// DELETE

module.exports = koalaRouter;