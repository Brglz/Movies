export default async function register() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        registerForm: await this.load('./templates/user/registerForm.hbs'),
        footer: await this.load('./templates/common/footer.hbs')
    };
    this.partial('./templates/user/register.hbs')
}