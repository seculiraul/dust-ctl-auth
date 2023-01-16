const app = require('./app');


const start = async () => {
    app.listen(3000, () => {
        console.log('app is listening on port 3000');
    })
}

start();

