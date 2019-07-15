import select2 from 'select2/dist/js/select2.full';

const initDefaultSelectbox = ($el) => {
    if (!$el.length) {
        return false;
    }
    $el.select2({
        dropdownParent: $el.parent(),
        minimumResultsForSearch: -1, // remove search
    });
};

$(function () {
    $('.select2').each(function () {
        initDefaultSelectbox($(this));
    });
});