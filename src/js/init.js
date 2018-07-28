jQuery(document).ready(function($) {

    // ======= Init form =======
    $('#feedbackForm').sendForm({
        successTitle: "Ваше сообщение успешно отправлено!",
        successText: "Мы ответим Вам в самое ближайшее время.",
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

    // ===== Init modal form ====
    $('#callbackForm').sendForm({
        successTitle: "Ваша заявка принята!",
        successText: "Наш сотрудник свяжется с Вами в самое ближайшее время.",
        autoClose: true,
        autoCloseDelay: 3000
    });

}); // end ready