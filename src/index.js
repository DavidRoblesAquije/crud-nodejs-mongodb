//aqui arranca la aplicacion

require('dotenv').config();

// ./ indica que esta en el mismo proyecto
const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})