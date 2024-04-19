class ValidacionesHelper {

    getIntegerOrDefault = (value, defaultValue) => {

        if (typeof value !== 'number') {
            return defaultValue;
        } else if (Number.isInteger(valor)) {
            return value;
        }
        return defaultValue;
    }
    getStringOrDefault = (value, defaultValue) => {
        if (typeof value !== 'string'){
            return defaultValue;
        }
        return value;
    };
};



// Exporto todo lo que yo quiero exponer del módulo:
export default new ValidacionesHelper();