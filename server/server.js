const express = require('express')
const app = express();
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;

app.use(express.json());

MongoClient.connect('mongodb://127.0.0.1:27017', {useUnifiedTopology: true})
    .then((client) => {
        const db = client.db('hotel_bookings');
        const bookingsCollection = db.collection('bookings');

        app.get('/', (req, res) => {
            bookingsCollection
              .find()
              .toArray()
              .then((docs) => res.json(docs))
              .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
              });
          });
          
        app.post('/', (req, res) => {
            const newData = req.body;
            bookingsCollection
                .insertOne(newData)
                .then((result) => {
                    res.json(result.ops[0])
                })
                .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
                });
            });

        app.delete('/:id', (req, res) => {
            const id = req.params.id;
            bookingsCollection
                .deleteOne({ _id: ObjectId(id) })
                .then(() => bookingsCollection.find().toArray())
                .then((docs) => res.json(docs))
                .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
                });
        });

        app.put('/:id', (req, res) => {
            const id = req.params.id;
            const newData = req.body
            delete newData._id;
            bookingsCollection
                .updateOne({_id: ObjectId(id)},
                            {$set: newData})
                .then((result) => {
                res.json(result)
                })
                .catch((err) => {
                console.error(err);
                res.status(500);
                res.json({ status: 500, error: err });
                });
            });

    })
    .catch(console.err);

app.listen(5000, function () {
    console.log(`Listening on port ${ this.address().port}`);
})