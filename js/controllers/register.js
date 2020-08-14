import { register as registerUser } from '../data.js'
import { showInfo, showError } from './notifications.js';

export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    this.partial('./templates/user/register.hbs', this.app.userData)
}

export async function registerPost() {
    if (this.params.password !== this.params.repeatPassword) {
        alert(`Passwords do NOT match`);
        return
    }

    if (this.params.username.length < 3) {
        alert('Username too short');
        return
    }

    if (this.params.password.length < 6) {
        alert('Password too short');
        return
    }

    try {
        const result = registerUser(this.params.username, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error
        }

        showInfo('Successful register')

        this.redirect('#/login')

    } catch (err) {
        console.log(err);
        showError(err.message);
    }
}