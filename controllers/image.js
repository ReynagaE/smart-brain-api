const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a24883cd1f3240ba94a62d5d8fb56c55'
  });

const handleApiCall = (req, res) => {
    app.models
    .predict('face-detection', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};