class dateTimeHelper {
    isDate = (fecha) => {
        if (Date.parse(fecha)) {
            return true;
        } else {
            return false;
        }
    };
    getOnlyDate = (fecha = new Date()) => { };
    getEdadActual = (fechaNacimiento) => {
        let fecha1 = new Date(Date.now());
        let fecha2 = new Date(fechaNacimiento);

        let restaAños = fecha1.getFullYear() - fecha2.getFullYear();
        let restaMeses = fecha1.getMonth() - fecha2.getMonth();

        if (restaMeses > 0) {
            return (restaAños - 1);
        }
        else if (restaMeses < 0) {
            return restaAños;
        }
        let restaDias = fecha1.getDay() - fecha2.getDay();
        if (restaDias <= 0) {
            return restaAños;
        }
        return (restaAños - 1);
    };
    getDiasHastaMiCumple = (fechaNacimiento) => {
        fechaNacimiento = new Date(fechaNacimiento);
        let fechaActual = new Date();
        let añoActual = fechaActual.getFullYear();
        let proximoCumpleaños = new Date(añoActual, fechaNacimiento.getMonth(), fechaNacimiento.getDate());
        if (proximoCumpleaños < fechaActual) {
            proximoCumpleaños.setFullYear(añoActual + 1);
        }
        let diferencia = proximoCumpleaños.getTime() - fechaActual.getTime();
        let diasRestantes = Math.ceil(diferencia / (1000 * 3600 * 24));
        return diasRestantes;
    };


    getDiaTexto = (fecha, retornarAbreviacion = false) => {
        const dateObj = new Date(fecha);
        const diasTexto = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const diasAbreviados = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const diaSemana = dateObj.getDay();
        if (retornarAbreviacion) {
            return diasAbreviados[diaSemana];
        } else {
            return diasTexto[diaSemana];
        }
    };
    getMesTexto = (fecha, retornarAbreviacion = false) => {
        const dateObj = new Date(fecha);
        const MesTexto = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const MesesAbreviados = ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const NombreMes = dateObj.getMonth();
        if (retornarAbreviacion) {
            return MesesAbreviados[NombreMes];
        } else {
            return MesTexto[NombreMes];
        }

     };
}
export default new dateTimeHelper;  