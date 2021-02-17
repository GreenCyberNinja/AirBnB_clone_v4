let amenities = {};

$(document).ready(function () {
  $.get('http://localhost:5001/api/v1/status/', function (data) {
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
  $.ajax(
    {
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      dataType: 'json',
      data: '{"body": "{}"}',
      contentType: 'application/json',
      success: function (data) {
        data.forEach(function (place) {
          console.log(place);
          let htmlString =
            `<article>
          <div class="title_box">
            <h2>` +
            place.name +
            `</h2>
            <div class="price_by_night">` +
            place.price_by_night +
            `</div>
          </div>
          <div class="information">
	    <div class="max_guest">` +
            place.max_guest;
          if (place.max_guest != 1) {
            htmlString += ` Guests</div>`;
          } else {
            htmlString += ` Guest</div>`;
          }
          htmlString += `<div class="number_rooms">` + place.number_rooms;
          if (place.number_rooms != 1) {
            htmlString += ` Bedrooms</div>`;
          } else {
            htmlString += ` Bedroom</div>`;
          }
          htmlString +=
            `<div class="number_bathrooms">` + place.number_bathrooms;
          if (place.number_bathrooms != 1) {
            htmlString += ` Bathrooms</div>`;
          } else {
            htmlString += ` Bathroom</div>`;
          }
          htmlString +=
            `</div>
          <div class="user">
              </div>
              <div class="description">` +
            place.description +
            `</div>
        </article>`;
          $('section.places').append(htmlString);
        });
      },
    },
    function (data) {
      data.forEach((place) => {
        $('section').append('<article>' + place + '</article>');
      });
    }
  );
});
