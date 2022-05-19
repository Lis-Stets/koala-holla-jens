const express = require('express');
const koalaRouter = express.Router();
const pool = require( '../modules/pool' );

// DB CONNECTION


// GET
koalaRouter.get( '/', ( req,res )=>{
    console.log( 'in GET router' );
    let queryString = `SELECT * FROM koalas`;
    pool.query( queryString ).then( ( result )=>{
        res.send( result.rows );
    }).catch ( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    }) 
})

// POST
koalaRouter.post( '/', ( req, res )=>{
    console.log( 'in POST router', req.body );
    let queryString = `INSERT INTO koalas ( name, gender, age, ready_to_transfer, notes ) VALUES ( $1, $2, $3, $4, $5 );`;
    let values = [ req.body.name, req.body.gender, req.body.age, req.body.ready_to_transfer, req.body.notes ];
    pool.query( queryString, values ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

// PUT


// DELETE

module.exports = koalaRouter;