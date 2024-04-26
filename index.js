import alumno from "./src/models/alumno.js"
import { sumar, restar, multiplicar, dividir } from "./src/modules/matematica.js"
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from
    "./src/modules/omdb-wrapper.js"
import express from "express"; // hacer npm i express
import cors from "cors"; // hacer npm i cors
import res from "express/lib/response.js";
import ValidacionesHelper from './src/modules/ValidacionesHelper.js'
import dateTimeHelper from "./src/modules/dateTimeHelper.js";


const app = express();
const port = 3000;
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON
//
// Aca pongo todos los EndPoints
//
app.get('/', (req, res) => { // EndPoint "/"
    res.send('Ya estoy respondiendo!');
    res.status(200).send("OK");

})
const nombre = "martin"
app.get('/saludar/:nombre', (req, res) => { // EndPoint "/saludar"
    res.send('hola ' + req.params.nombre);
    res.status(200).send("OK");
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => { //EndPoint "/validarfecha"
    const { ano, mes, dia } = req.params;

    const fecha = new Date(`${ano}-${mes}-${dia}`);

    if (!isNaN(Date.parse(fecha))) {
        res.status(200).send('Fecha válida');
    } else {
        res.status(400).send('Fecha inválida');
    }

})

app.get('/matematica/sumar', (req, res) => { //EndPoint "/matematica/sumar?"
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    res.send(`La suma da ${sumar(n1, n2)}`);
    res.status(200).send("OK");
})

app.get('/matematica/restar', (req, res) => { //EndPoint "/matematica/sumar?"
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    res.send(`La resta da ${restar(n1, n2)}`);
    res.status(200).send("OK");
})

app.get('/matematica/multiplicar', (req, res) => { //EndPoint "/matematica/sumar?"
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    res.send(`La multiplicacion da ${multiplicar(n1, n2)}`);
    res.status(200).send("OK");
})

app.get('/matematica/dividir', (req, res) => { //EndPoint "/matematica/sumar?"
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    res.send(`La division da ${dividir(n1, n2)}`);
    res.status(200).send("OK");
})


app.get('/omdb/searchbypage', async (req, res) => { //EndPoint "/matematica/sumar?"

    const s = (req.query.s);
    const p = (req.query.p);
    let resultado = await OMDBSearchByPage(s, p);
    res.send(resultado);
    res.status(200).send("OK");
})

app.get('/omdb/searchcomplete', async (req, res) => { //EndPoint "/matematica/sumar?"

    const s = (req.query.s);
    let resultado = await OMDBSearchComplete(s);
    res.send(resultado);
    res.status(200).send("OK");
})

app.get('/omdb/getbyomdbid', async (req, res) => { //EndPoint "/matematica/sumar?"

    const I = (req.query.I);
    let resultado = await OMDBGetByImdbID(I);
    res.send(resultado);
    res.status(200).send("OK");
})


const alumnosArray = [];
alumnosArray.push(new alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new alumno("Elba Calao", "32623391", 18));

app.get('/alumnos', (req, res) => {


    res.send(alumnosArray);

})

app.get('/alumnos/:DNI', (req, res) => {

    let alumnosDNI = alumnosArray.find(p => p.DNI = req.params)

    res.send(alumnosDNI);

})


app.post('/alumnos', (req, res) => {

    alumnosArray.push(new alumno(req.query.username, req.query.DNI, req.query.edad));
    let nuevoAlumno = alumnosArray.find(p => p.DNI == req.query.DNI)
    res.send(nuevoAlumno);
    res.status(201).send("Created");

})


app.delete('/alumnos', (req, res) => {
    let alumnoAborrarIndex = alumnosArray.findIndex(p => p.DNI == req.query.DNI);
    if (alumnoAborrarIndex === -1) {
        res.status(404).send("Not Found");
    } else {
        let alumnoAborrar = alumnosArray[alumnoAborrarIndex];
        alumnosArray.splice(alumnoAborrarIndex, 1);
        res.send(`El alumno ${alumnoAborrar.username} con DNI ${alumnoAborrar.DNI} se eliminó con éxito.`);
        res.status(200).send("OK");
    }
});


app.get('/omdb/searchbypage', async (req, res) => {
    let search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
    let p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);
})

app.get('/fechas/isDate', (req, res) => {
    let fechaParam = req.query.fecha
    if(dateTimeHelper.isDate(fechaParam)){
        res.status(200).send("OK")
    } else {
        res.status(400).send("BadRequest");
    }
})

app.get('/fechas/getEdadActual', (req, res) => {

    let fechaNacimiento = req.query.fecha;
let edadActual = dateTimeHelper.getEdadActual(fechaNacimiento);
    res.status(200).send(JSON.stringify({"Edad":edadActual}));
})

app.get('/fechas/getDiasHastaMiCumple', (req, res) => {

    let fechaNacimiento = req.query.fecha;
   let diasRestantes = dateTimeHelper.getDiasHastaMiCumple(fechaNacimiento);
    res.status(200).send(`faltan ${diasRestantes} dias para tu cumpleaños`);
})

app.get('/fechas/getDiaTexto', (req, res) => {
    let fecha = req.query.fecha;
    let abreviacion = req.query.abr
    let diaSemana = dateTimeHelper.getDiaTexto(fecha,abreviacion);
    
    res.status(200).send(JSON.stringify({"diaSemana":diaSemana}));
})

app.get('/fechas/getMesTexto', (req, res) => {
    let fecha = req.query.fecha;
    let abreviacion = req.query.abr
    let MesTexto = dateTimeHelper.getMesTexto(fecha,abreviacion);
    
    res.status(200).send(JSON.stringify({"MesTexto":MesTexto}));
})

//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
