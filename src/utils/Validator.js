export class Validator {
  constructor(schema) {
    this.schema = schema;
  }
  
  validate(data) {
    const errors = {};
    
    for (const field in this.schema) {

      const rules = this.schema[field];
      const value = data[field];
        
      if (rules.required?.[0] && !value?.trim()) {
        errors[field] = rules.required[1];
        continue;
      }

      if (rules.trim && typeof value === "string") {
        data[field] = value.trim();
      }
      
      if(rules.lowercase && typeof value === 'string'){
        data[field] = value.toLowerCase()
        
      }

      if (rules.length && value?.length < rules.length[0]) {
        errors[field] = rules.length[1];
        continue;
      }
      

      if (rules.match && !rules.match[0].test(value)) {
        errors[field] = rules.match[1];
        continue;
      }
      
      if (rules.equalTo) {
        const otherValue = data[rules.equalTo[0]]
        if (value !== otherValue) {
          errors[field] = rules.equalTo[1];
        }
        continue;
      }
      
      if (rules.validate?.validator && typeof rules.validate.validator === "function") {
        const isValid = rules.validate.validator(value, data);
        if (!isValid) {
          errors[field] = rules.validate.message;
        }
      }
    }
    
    return Object.keys(errors).length > 0 ? errors : null;
  }
  login(data){
    const errors = {}

    for(let field in this.schema){
        let rules = this.schema[field]
        let value = data[field]

        if(rules.required[0] && !value?.length){
            errors[field] = rules.required[1]
        }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }
}
