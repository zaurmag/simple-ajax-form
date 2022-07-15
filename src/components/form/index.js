import inputmask from 'inputmask'
import { Form } from './core'
const $phoneMask = document.querySelector('.js-phone-mask')

if ($phoneMask) {
	inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false
	}).mask($phoneMask)
}

new Form('#feedbackForm', {
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
