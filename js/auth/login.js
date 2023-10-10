import { EMAIL_REGEX } from '../utils/constants.js';

const LOGIN_DOM  = {
    loginForm: document.getElementById('id-form-login'),
    formInputs: {
      inputEmail: document.getElementById('id-input-email'),
      inputPassword: document.getElementById('id-input-password'),
    },

    clearFormInputs: function() {
        const registerInputs = this.formInputs;
    
        Object.keys(registerInputs).forEach((inputKey) => {
          registerInputs[inputKey].value = '';
        });
      }
    };

     if(validateFields()){
        const loginInputs = LOGIN_DOM.formInputs;
    
        const userData = {
          email: registerInputs.inputEmail.value,
          password: registerInputs.inputPassword.value
        }
    
        console.log('WELCOME');
        registerUser(userData);
    
      } else {
        console.log('WRONG EMAIL/PASSWORD');
      }
    



