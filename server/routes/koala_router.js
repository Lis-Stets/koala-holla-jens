const express = require('express');
const koalaRouter = express.Router();
const pool = require( '../modules/pool' );

// DB CONNECTION


// GET
koalaRouter.get( '/', ( req,res )=>{
    console.log( 'in GET route' );
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
    console.log( 'in POST route', req.body );
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
koalaRouter.put( '/', ( req, res )=>{
    console.log( 'in PUT route:', req.query );
    let queryString = `UPDATE koalas SET ready_to_transfer = 'TRUE' WHERE id = $1`
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

// DELETE
koalaRouter.delete( '/', ( req, res )=>{
    console.log( 'in DELETE route', req.query  );
    let queryString = 'DELETE FROM koalas WHERE id = $1';
    let values = [ req.query.id ];
    pool.query( queryString, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})

module.exports = koalaRouter;