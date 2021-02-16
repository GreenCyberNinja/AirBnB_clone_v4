let amenities = {};

$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    if (this.checked) {
        amenities[this.attr('data-id')] = this.attr('data-name');
    } else {
        delete amenities[this.attr('data-id')];
    }

    for (n of amenities) {
      $('DIV.amenities').append('<li>' + n + '</li>')
    }
  });
});
