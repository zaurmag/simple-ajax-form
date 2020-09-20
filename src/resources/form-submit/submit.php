<?php
$formData = $_POST;
$formGo = $formData["go"]; ?>

<?php if(isset($formData)) {

    // ===== Reference ============================
    $recaptchaOn = false;

    if ($recaptchaOn) {
        $recaptcha = $_POST['g-recaptcha-response'];
    }

    /**
     * Vars
     */
    $to = "demo@zaurmag.ru"; // E-mail на который присылать письмо
    $fromEmail = "no-reply@zaurmag.ru"; // E-mail от имени которого приходит письмо. Почта на домене сайта.

    switch ($formGo) {
        case 'callback':
            $subject = "Заказ обратного звонка";
            break;

        case 'orderCalc':
            $subject = "Заявка на расчет стоимости";
            break;

        case 'services':
            $subject = "Заявка на вызов замерщика";
            break;

        case 'price':
            $subject = "Заявка на прайс-лист";
            break;

        default:
            $subject = "Сообщение с сайта";
            break;
    }

    function adopt($text) {
        return '=?UTF-8?B?'.base64_encode($text).'?=';
    }

    /**
     * Message body
     */
    $message  = '<html><body>';
    $message .= "<table>";
    $title = array(
        "name" => "Имя:",
        "phone" => "Телефон:",
        "email" => "E-mail:",
        "message" => "Текст сообщения:",
        "what" => "Что нужно отремонтировать?",
        "view" => "Вид ремонта",
        "type" => "Тип помещения",
        "formCalcArea" => "Площадь помещения",
        "title" => "Форма:",
        "subtitle" => "Подзаголовок формы:"
    );

    foreach($formData as $key => $value) {
        if ($key != 'go') {
            $message .= "<tr>";
            $message .= "<td>";
            $message .= "<strong>" . $title[$key] . "</strong>";
            $message .= "</td>";
            $message .= "<td style='padding-left:12px;'>";
            $message .= "$value";
            $message .= "</td>";
            $message .= "</tr>";
        }
    }

    $message .= "</table><br><br>";
    $message .= '</body></html>';
    $headers = "MIME-Version: 1.0" . PHP_EOL .
               "Content-Type: text/html; charset=utf-8" . PHP_EOL .
               'From: '.adopt($name).' <'.$fromEmail.'>' . PHP_EOL .
               'Reply-To: '.adopt($name).' <'.$email.'> ' . PHP_EOL;

    if ($recaptchaOn) {
        if (!empty($recaptcha)) {
            $secret = '6LfMJSgTAAAAABw4lECZsLP5krXztMRZC0_Fgt3O';
            $url = "//www.google.com/recaptcha/api/siteverify?secret=".$secret ."&response=".$recaptcha."&remoteip=".$_SERVER['REMOTE_ADDR'];
            $response = file_get_contents("//www.google.com/recaptcha/api/siteverify?secret=".$secret ."&response=".$recaptcha."&remoteip=".$_SERVER['REMOTE_ADDR']);

            if ( $response.success === false ) {
                $answer = '2';
            } else {
                if (mail($to, adopt($subject), $message, $headers)) {
                    $answer = '1';
                } else {
                    $answer = '0';
                }
            }

        } else {
            $answer = '3';
        }
    } else {
        if (mail($to, adopt($subject), $message, $headers)) {
                $answer = '1';
            } else {
                $answer = '0';
        }
    }

    die($answer);

} ?>
