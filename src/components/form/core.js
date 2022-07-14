import JustValidate from 'just-validate'

export class Form {
    constructor(selector, options = {}) {
        if (!selector) {
            throw new Error('Form selector not specified!')
        }
        this.$form = typeof selector === 'string' ? document.querySelector(selector) : selector
        this.url = options.urlFormHandler || '../form-submit/submit.php'
        this.validations = options.validations || []
        this.init()
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
            await response.text()
            $btn.classList.remove('form__btn--sending')
            $btn.textContent = 'Отправить'
        } catch(e) {
            console.error('Error:', e.message)
        }
    }

    validate() {
        const validations = new JustValidate(this.$form, {
            errorFieldCssClass: 'form__control--error',
            errorLabelCssClass: 'form__error-txt',
            successFieldCssClass: 'form__control--success',
            successLabelCssClass: ''
        })

        this.validations.forEach(options => {
            validations.addField(options.field, options.rules)
        })
    }

    init() {
        this.$form.addEventListener('submit', this.submit.bind(this))
        this.validate()
    }
}
