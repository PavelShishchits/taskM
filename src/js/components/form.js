import validator from 'jquery-validation';

export default class Form {

    constructor($el, settings) {
        this._block = $el;
        this._settings = $.extend({}, {
            rules: {},
            messages: {}
        }, settings);
        this._data = {
            requiredFields: null
        };
        this.parseFields();
        this.initValidator();
    }

    parseFields() {
        const {_block, _data} = this;
        _data.requiredFields = _block.find('[required]');
        this.generateRules();
    }

    generateRules() {
        const {_data, _settings} = this;
        _data.requiredFields.each(function () {
            let field = $(this);
            let name = field.attr('name');
            if (field.data('valid_message')) {
                _settings.messages[name] = field.data('valid_message');
            }
            _settings.rules[name] = $.extend({}, _settings.rules[name], {
                required: true
            });
        });
    }

    initValidator() {
        const {_block, _data, _settings} = this;
        _data.validationEntity = _block.validate(_settings);
    }

    static initValidDefaultSettings() {

        $.validator.setDefaults({
            ignore: 'input[type=hidden]',
            errorPlacement: function (error, element) {
                error.appendTo(element.closest('.control-group').find('.form__validation'));
            },
            highlight: function (element) {
                $(element).closest('.control-group').removeClass('has-success').addClass('has-error');
            },
            success: function (element) {// For valid OFF
                element.closest('.control-group').removeClass('has-error');
                element.remove();
                // .addClass('has-success');
            }
        });

        // Исправляем валидацию формата dd-mm-yyyy (работает dd-mm-yyyy, dd/mm/yyyy, dd.mm.yyyy)
        $.validator.addMethod(
            'date',
            function(value/*, element*/) {
                // put your own logic here, this is just a (crappy) example
                return value.match(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
            }// http://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy
            //,"Please enter a date in the format dd/mm/yyyy."// Текст по умолчанию для ошибки
        );
    }
}