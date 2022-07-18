import { cutSpaces } from '../utils'
import { success } from '../constants'

export class Message {
    constructor(form, options = {}) {
        this.$form = form
        this.textMessages = options.textMessages || {
            success
        }
        this.type = null
        this.$message = null
    }

    show(type) {
        this.type = type
        this.$form.classList.add('is-message')
        this.append()
        this.$message = this.$form.querySelector('.form__message')

        setTimeout(() => {
            this.$form.classList.add('is-message-visible')
        }, 300)
    }

    hide() {
        this.$form.classList.remove('is-message-visible')

        setTimeout(() => {
            this.$form.classList.remove('is-message')
            this.$message.remove()
            this.$message = null
        }, 300)
    }

    template() {
        const typeClassName = this.type === 'success'
            ? 'form__message--success'
            : 'form__message--error'

        return `
            <div class="form__message ${typeClassName}">
                <div class="form__message-content">
                    <div class="form__message-title">${this.textMessages[this.type].title}</div>
                    <div class="form__message-desc">${this.textMessages[this.type].desc}</div>
                </div>
            </div>
        `
    }

    append() {
        this.$form.insertAdjacentHTML('afterbegin', cutSpaces(this.template()))
    }

    destroy() {
        this.hide()
        this.type = null
    }
}
