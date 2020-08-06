'use strict';

require('dotenv').config();

// call needed packages
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Cloudant = require('@cloudant/cloudant');

const dbUser = process.env.CLOUDANT_USER;
const dbPass = process.env.CLOUDANT_PASSWORD;
const db = process.env.CLOUDANT_DB;
const cloudant = Cloudant({ account: dbUser, password: dbPass });


//enable cors
app.use(cors());

// create recipe
app.post('/api/v1/recipes', (req, res) => {

    const recipe = {
        name: req.body.name,
        chef: req.body.chef,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    };

    cloudant.use(db).insert(recipe).then((data) => {
        console.log('Recipe', req.body.name, 'inserted into db.')
    });

    return res.status(201).send({
        success: 'true',
        message: 'recipe successfully added',
        recipe
    })
});

// get all recipes
app.get('/api/v1/recipes', (req, res) => {
    cloudant.use(db).list({ include_docs: true }, (err, data) => {
        const recipes = data.rows.map(row => row.doc)

        return res.status(201).send({
            success: 'true',
            message: 'recipes retrieved successfully',
            recipes: recipes
        });
    });
});

// get recipe by name
app.get('/api/v1/recipes/:id', (req, res) => {
    cloudant.use(db)
});

// delete recipe




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));