import Form from "../../../../js/components/form";

$(function () {
    Form.initValidDefaultSettings();

    $('.js-form').each(function () {
        new Form($(this), {
            messages: {
                form_CITIES: 'Enter your city',
            }
        });
    });
});