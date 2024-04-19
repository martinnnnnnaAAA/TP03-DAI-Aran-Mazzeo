const ArrayNums = ["dos","cuatro","ocho","diez"]

const PI = 3.14;
function sumar(x, y) {
return (x + y)
}
function restar (x, y){
return(x - y)
}
const multiplicar = (a, b) => {
return (a * b)
};
const dividir = (a,b) =>{
return (a / b)
}
// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.
export {ArrayNums, PI, sumar, restar, multiplicar, dividir};
