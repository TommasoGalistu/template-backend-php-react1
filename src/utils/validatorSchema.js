import { Validator } from "./Validator";

const registerSchema = {
  name: {
    required: [true, "Il nome è obbligatorio"],
    length: [3, "Il nome deve essere maggiore di 3 caratteri"],
    trim: true
  },
  surname: {
    required: [true, "Il cognome è obbligatorio"],
    length: [3, "Il cognome deve essere maggiore di 3 caratteri"],
    trim: true
  },
  email: {
    required: [true, "L'email è obbligatoria"],
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email non valida"]
  },
  password: {
    required: [true, "La password è obbligatoria"],
    length: [8, "La password deve essere almeno di 8 caratteri"],
    validate:{
            validator: function(value){
                return (
                    value.length >= 8 &&
                    /[A-Z]/.test(value) &&        // almeno una maiuscola
                    /[a-z]/.test(value) &&        // almeno una minuscola
                    /[0-9]/.test(value) &&        // almeno un numero
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) && // almeno un simbolo
                    !/\s/.test(value)
                )
            },
            message: "La password deve essere di almeno 8, una minuscula, una maiuscola, almeno un numero e un simbolo."
        },
  },
  confirm_password: {
    required: [true, "La conferma password è obbligatoria"],
    equalTo: ["password", "Le password non coincidono"]
  }
};

const loginSchema = {
  email:{
    required: [true, "L'email è obbligatoria"],
    
  },
  password: {
    required: [true, "La password è obbligatoria"]
  }
}

export const validator = new Validator(registerSchema);
export const validatorLogin = new Validator(loginSchema);



