import app from './app.js'
import {PORT} from './config.js'
app.listen(PORT); //3000
console.log("El servidor se está ejecutando en el puerto", PORT)