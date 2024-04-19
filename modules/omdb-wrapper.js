import axios from "axios";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const APIKEY = "5f83fda8"; 
const OMDBSearchByPage = async (searchText, page = 1) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : {}
};

const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page${page}`;
const apiResponse = await axios.get(requestString);
returnObject.datos = apiResponse.data.Search;
returnObject.cantidadTotal = apiResponse.data.totalresults;
returnObject.respuesta = apiResponse.data.response

return returnObject;
};
const OMDBSearchComplete = async (searchText) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : {}
};

const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`;
const apiResponse = await axios.get(requestString);
returnObject.datos = apiResponse.data.Search;
returnObject.cantidadTotal = apiResponse.data.totalresults;
returnObject.respuesta = apiResponse.data.response
return returnObject;

};
const OMDBGetByImdbID = async (imdbID) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : {}
};

const requestString = `https://www.omdbapi.com/?apikey=${APIKEY}&I${imdbID}`;
const apiResponse = await axios.get(requestString);
returnObject.datos = apiResponse.data.Search;
returnObject.cantidadTotal = apiResponse.data.totalresults;
returnObject.respuesta = apiResponse.data.response

return returnObject;
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};