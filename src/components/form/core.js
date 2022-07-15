import JustValidate from 'just-validate'
import { Message } from './message'
import { cutSpaces } from "./utils"

export class Form {
    constructor(selector, options = {}) {
        if (!selector) {
            throw new Error('Form selector not specified!')
        }
        this.$form = typeof selector === 'string' ? document.querySelector(selector) : selector
        this.url = options.urlFormHandler || '../form-submit/submit.php'
        this.validationsRules = options.validationsRules || []
        this.message = new Message(this.$form)
        this.validations = null
        this.recaptcha = options.recaptcha
        this.init()
        if (this.recaptcha.enable) {
            let addScriptCaptcha = document.createElement('script')
            addScriptCaptcha.src = 'https://www.google.com/recaptcha/api.js'
            document.body.append(addScriptCaptcha)

            const $fieldSet = this.$form.querySelector('.js-form-fields')
            $fieldSet.insertAdjacentHTML('beforeend', this.recaptchaTemplate())
        }
    }

    async submit(e) {
        e.preventDefault()
        const $btn = this.$form.querySelector('.js-form-submit')

        try {
            $btn.classList.add('form__btn--sending')
            $btn.textContent = 'Отправка...'
            const response = await fetch(this.url, {
                method: 'POST',
                body: new FormData(this.$form)
            })
            const result = await response.text()
            $btn.classList.remove('form__btn--sending')
            $btn.textContent = 'Отправить'

            if (cutSpaces(result) === 'success') {
                this.$form.reset()
                this.validations.destroy()
                this.message.show(cutSpaces(result))

                setTimeout(() => {
                    this.message.hide()
                }, 3000)
            }
        } catch(e) {
            console.error('Error:', e.message)
        }
    }

    validate() {
        this.validations = new JustValidate(this.$form, {
            errorFieldCssClass: 'form__control--error',
            errorLabelCssClass: 'form__error-txt',
            successFieldCssClass: 'form__control--success',
            successLabelCssClass: '',
            lockForm: true,
        })

        this.validations.onSuccess(this.submit.bind(this))

        // validations.onFail(event => {
        //     console.log('Error:', event)
        // })

        this.validationsRules.forEach(options => {
            this.validations.addField(options.field, options.rules)
        })
    }

    init() {
        this.$form.addEventListener('submit', this.validate.bind(this), { once: true })
        this.validate()
    }

    recaptchaTemplate() {
        return `
            <div class="form__row">
                <div class="g-recaptcha" data-sitekey="${this.recaptcha.captchaPublicKey}"></div>
            </div>
        `
    }
}
