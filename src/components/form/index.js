import inputmask from 'inputmask'
import { Form } from './classes/core'
const $phoneMask = document.querySelector('.js-phone-mask')

if ($phoneMask) {
	inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false
	}).mask($phoneMask)
}

const feedbackForm = new Form('#feedbackForm', {
	debug: false,
	recaptcha: {
		enable: true,
		publicKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
	},
	validationsRules: [
		{
			field: '#fbName',
			rules: [
				{
					rule: 'required',
					errorMessage: 'Введите ваше имя',
				},
			]
		},
		{
			field: '#fbEmail',
			rules: [
				{
					rule: 'required',
					errorMessage: 'Введите ваш E-mail',
				},
				{
					rule: 'email',
					errorMessage: 'E-mail адрес невалидный!',
				},
			]
		},
		{
			field: '#fbMessage',
			rules: [
				{
					rule: 'required',
					errorMessage: 'Введите текст сообщения',
				}
			]
		}
	]
})
