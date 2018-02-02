module.exports = {
    validateField: (field) => {
        if(field.required && !field.value) {
            return {
                ...field,
                error: "This field is required!"
            };
        }
        
        const error = field.validate ? field.validate(field.value) : false;                                
        return {
            ...field,
            error: error ? error : false
        };    
    },

    validateEmail: (value) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;            

        if(!re.test(value)) {
            return "E-mail address is invalid";
        }            
    },

    // dd/mm/yyyy
    validateDate: (value) => {        
        const time = new Date(value).getTime();
        if(isNaN(time)) {
            return "Date is invalid";
        }    
    }
}