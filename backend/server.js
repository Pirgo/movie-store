const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    const exercisesRouter = require('./routes/exercises');
    const usersRouter = require('./routes/users');
    const movieRouter = require('./routes/movie');
    const peopleRouter = require('./routes/people');
    const authRouter = require('./routes/auth');
    const dataRouter = require('./routes/data')
    const libraryRouter = require('./routes/library');
    const userProfileRouter = require('./routes/user-profile');
    const libModifying = require('./routes/libmodifying');

    app.use('/exercises', exercisesRouter);
    app.use('/users', usersRouter);
    app.use('/movie', movieRouter);
    app.use('/people', peopleRouter);
    app.use('/auth', authRouter);
    app.use('/data', dataRouter);
    app.use('/library', libraryRouter);
    app.use('/user/profile', userProfileRouter);
    app.use('/libmodifying', libModifying);
});


//dfgdfgdfg
//fsdhdgh
