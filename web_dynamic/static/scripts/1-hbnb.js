let amenities = {};

$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    if (this.checked) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('div.amenities h4').html('&nbsp;');
    Object.keys(amenities).forEach(function (key, idx) {
      if (idx > 0) {
        $('div.amenities h4').append(',&nbsp;');
      }
      $('div.amenities h4').append(amenities[key].replace(' ', '&nbsp;'));
    });
  });
});
