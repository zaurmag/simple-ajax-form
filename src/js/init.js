/**
* Initializations scripts file
* @author: Zaur Magomedov
*/

jQuery(document).ready(function($) {

    // ======= Init form =======
    $('#feedbackForm').simpleSendForm({
        successTitle: "Ваше сообщение успешно отправлено!",
        successText: "Мы ответим Вам в самое ближайшее время.",
        captcha: true,
        mailUrl: "/wp-content/demos/simple-ajax-form/form-submit/submit.php"
    });

    // ===== Init modal form ====
    $('#callbackForm').simpleSendForm({
        successTitle: "Ваша заявка принята!",
        successText: "Наш сотрудник свяжется с Вами в самое ближайшее время.",
        autoClose: true,
        autoCloseDelay: 3000,
        mailUrl: "/wp-content/demos/simple-ajax-form/form-submit/submit.php",
        captcha: true
    });

    // ======= Init magnific popup =======
    $('.modal-popup').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'mfp-top-up'
    });

}); // end ready