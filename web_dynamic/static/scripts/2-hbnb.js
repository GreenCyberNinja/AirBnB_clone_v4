let amenities = {};

$(document).ready(function () {
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    console.log(data.status);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
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
