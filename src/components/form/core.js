export class Form {
    constructor(selector, options = {}) {
        if (!selector) {
            throw new Error('Form selector not specified!')
        }
        this.$form = typeof selector === 'string' ? document.querySelector(selector) : selector
        this.url = options.urlFormHandler || '../form-submit/submit.php'
        this.$form.addEventListener('submit', this.submit.bind(this))
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
            const data = await response.text()
            $btn.classList.remove('form__btn--sending')
            $btn.textContent = 'Отправить'

            console.log('Data:', data.trim())
        } catch(e) {
            console.error('Error:', e.message)
        }
    }
}
