const express = require("express");
const app = express();
const joi = require('joi');
app.use(express.json());
const port = 3000;

app.get('/get/person', (req, res) => {
    res.json({
        prenom: "ismail",
        nom: "Houssni",
        cin: "HH185546",
        cne: "K131269726"
    })
})

app.post('/post/person', (req, res) => {
    const { prenom, nom, cin, cne } = req.body;
    const personSchema = joi.object({
        prenom: joi.string().required(),
        nom: joi.string().required(),
        cin: joi.string().length(8).required(),
        cne: joi.string().length(10).required(),
    });
    const dataPerson = {
        prenom,
        nom,
        cin,
        cne,
    };
    const validateData = personSchema.validate(dataPerson, { abortEarly: false });
    
    if (validateData.error) {
        res.json(validateData.error.details);
    } else {
        res.json(validateData.value);
    }
});

app.listen(port, () => {
    console.log(`app is running in port ${port}`)
})
