import JustValidate from 'just-validate'
import { Message } from './message'
import { cutSpaces } from "../utils"
import { Emitter } from "./emitter"
import { Recaptcha } from './recaptcha'

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
        this.recaptcha = new Recaptcha(this.$form, options.recaptcha)
        this.debug = options.debug
        this.emitter = new Emitter()
        this.unsub = []
        this.init()
    }

    async submit(e) {
        e.preventDefault()
        const $btn = this.$form.querySelector('.js-form-submit')

        try {
            $btn.classList.add('form__btn--sending')
            $btn.textContent = 'Отправка...'
            this.emitter.emit('submit:pre', e)

            const response = await fetch(this.url, {
                method: 'POST',
                body: new FormData(this.$form)
            })
            const result = await response.text()
            $btn.classList.remove('form__btn--sending')
            $btn.textContent = 'Отправить'

            if (this.debug) {
                console.log(result)
            }

            if (cutSpaces(result) === 'success') {
                this.$form.reset()
                this.validations.destroy()
                this.recaptcha.reset()

                this.message.show(cutSpaces(result))
                this.emitter.emit('submit:success', e)

                setTimeout(() => {
                    this.message.hide()
                }, 3000)
            }
        } catch(e) {
            this.emitter.emit('submit:error', e)
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
        this.validate = this.validate.bind(this)
        this.$form.addEventListener('submit', this.validate, { once: true })
        this.validate()
    }

    on(listener, callback) {
        const unsub = this.emitter.subscribe(listener, callback)
        this.unsub.push(unsub)
    }

    destroy() {
        this.unsub.forEach(listener => listener.unsub())
        this.$form.removeEventListener('submit', this.validate)
        this.message.destroy()
        this.$form.reset()
        this.validations.destroy()
    }
}