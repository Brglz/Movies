export default async function login() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        loginForm: await this.load('./templates/user/loginForm.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    this.partial('./templates/user/login.hbs')
}