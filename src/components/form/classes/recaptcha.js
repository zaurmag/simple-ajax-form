export class Recaptcha {
    constructor(form, options) {
        this.enable = options.enable
        if (!this.enable) {
            return
        }
        this.$form = form
        this.publicKey = options.publicKey
        this.prepare()
    }

    prepare() {
        const addScriptCaptcha = document.createElement('script')
        addScriptCaptcha.src = 'https://www.google.com/recaptcha/api.js'
        document.body.append(addScriptCaptcha)

        const $button = this.$form.querySelector('.js-form-button')
        $button.insertAdjacentHTML('beforebegin', this.template())
    }

    reset() {
        if (this.enable) {
            grecaptcha.reset()
        }
    }

    template() {
        return `
            <div class="form__row">
                <div class="g-recaptcha" data-sitekey="${this.publicKey}"></div>
            </div>
        `
    }
}
