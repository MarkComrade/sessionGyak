const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/mentes', async (request, response) => { 
    try {
        const { adat } = request.body;

        request.session.adat = adat;

        response.status(200).json({
            success: 'Sikeres mentés!',
            adat: adat
        });

    } catch (error) {
        response.status(500).json({
            success: 'Sikertelen mentés!'
        });
    }
});

router.get('/lekeres', async (request, response) => {
    try {
        const adat = request.session.adat;
        response.status(200).json({
            success: 'Sikeres lekérés!',
            adat: adat
        });
    } catch (error) {
        response.status(500).json({
            success: 'Sikertelen lekérés!'
        });
    }
});

router.post('/visit', async (request, response) => { 
    try {

        request.session.visits = request.session.visits ? request.session.visits + 1 : 1;
        const visits = request.session.visits

        response.status(200).json({
            success: 'Sikeres mentés!',
            visits: visits
        })

    } catch(error) {
        response.status(500).json({
            success: 'Sikertelen lekérés!'
        });
    }
});

router.get('/visits', async (request, response) => {
    try {

        const visits = request.session.visits

        response.status(200).json ({
            success: true,
            visits: visits
        })

    } catch(error)
    {
        response.status(500).json({
            success: 'Sikertelen lekérés!'
        });
    }
})

router.post('/color', async (request,response) => {
    try {
        const {color} = request.body

        request.session.color = color;

        response.status(200).json({
            success: 'Sikeres mentés!',
            color: color
        })
    } catch(error) {
        response.status(500).json({
            success: 'Sikertelen mentés!'
        })
    }
})

router.get('/color', async (request,response) => {
    try {
        const color = request.session.color
        response.status(200).json({
            success: true,
            color: color
        })

    } catch(error) {
        response.status(500).json({
            success: 'Sikertelen mentés!'
        })
    }
})

router.post('/kedvenc/mentes', async (request,response) => {
    try {

        const {fruit} = request.body;

        request.session.fruit = fruit;

        response.status(200).json({
            success: 'Sikeres mentés',
            adat: fruit
        })

    } catch(error) {
        response.status(500).json({
            success: 'Sikertelen mentés!'
        })
    }
})

router.get('/kedvenc/lekeres', async (request,response) => {
    try {
        const fruit = request.session.fruit

        response.status(200).json({
            success: true,
            fruit: fruit
        })
    } catch(error) {
        response.status(500).json({
            success: 'Sikertelen mentés!'
        })
    }
})

router.post('/kedvenc/torles', async (request, response) => {
    try {

        request.session.fruit = ""

        response.status(200).json({
            success: 'Sikeres mentés',
            adat: request.session.fruit
        })

    } catch(error) {
        response.status(500).json({
            success: 'Sikertelen törlés!'
        })
    }
})

module.exports = router;
