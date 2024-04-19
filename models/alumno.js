class alumno {
    constructor(username,DNI,edad){
        this.username = username;
        this.DNI = DNI;
        this.edad = edad;
    }

    toString(){
        return (`usuario: ${this.username}, DNI: ${this.DNI}, edad: ${this.edad}`);
    }
}
export default alumno;