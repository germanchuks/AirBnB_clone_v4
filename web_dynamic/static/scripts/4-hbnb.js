$(document).ready(function() {
  const amenities = {};
  
  $('input[type="checkbox"]').click(function() {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    
    if ($(this).prop('checked') === true) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }
    
    const amenityList = Object.values(amenities).join(', ');
    if (amenityList.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(amenityList);
    }
  });
  
  
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function(response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
    error: function() {
      $('#api_status').removeClass('available');
    }
  });
  
  
  $.ajax(
    {
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (place) {
        placeList = []
        $.get( "http://0.0.0.0:5001/api/v1/users/", function(users) {
        for (let i = 0; i < place.length; i++) {
          for (let j = 0; j < users.length; j++) {
            if (users[j].id === place[i].user_id) {
              placeList.push(
                `<article>
                <div class="title">
                <h2>${ place[i].name }</h2>
                <div class="price_by_night">${ place[i].price_by_night }</div>
                </div>
                <div class="information">
                <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                <br />
                ${ place[i].max_guest } Guests
                </div>
                <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                <br />
                ${ place[i].number_rooms } Bedrooms
                </div>
                <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                <br />
                ${ place[i].number_bathrooms } Bathroom
                </div>
                </div>
                
                <div class="user">
                <strong>Owner: ${ users[j].first_name } ${ users[j].last_name }</strong>
                </div>
                <div class="description">${ place[i].description }</div>
                </article>`
                );
              }
            }
          }
          $("section.places").append(placeList.join(''))
        })
      }
    });
    
    
    $('.container .filters button').click(function () {
      $('article').remove()
      filteredPlaces.length = 0
      let placesToAdd = []
      
      $.ajax(
        {
          url: 'http://0.0.0.0:5001/api/v1/places_search/',
          type: 'POST',
          dataType: 'json',
          contentType: "application/json",
          data: JSON.stringify({}),
          success: function (place) {
            for (let i = 0; i < place.length; i++) {
              $.get( "http://0.0.0.0:5001/api/v1/places/" + place[i].id + "/amenities", function(placeAmenities) {
              amenitiesCount = 0
              for (let j = 0; j < Object.keys(amenities).length; j++) {
                for (let k = 0; k < placeAmenities.length; k++) {
                  if (placeAmenities[k].id === Object.keys(amenities)[j]) {
                    amenitiesCount += 1
                  }
                }
              }
              if (amenitiesCount === Object.keys(amenities).length) {
                placesToAdd.push(place[i]);
              }
            })
          }
          $.get( "http://0.0.0.0:5001/api/v1/users/", function(users) {
          for (let i = 0; i < placesToAdd.length; i++) {
            for (let j = 0; j < users.length; j++) {
              if (users[j].id === placesToAdd[i].user_id) {
                filteredPlaces.push(
                  `<article>
                    <div class="title">
                      <h2>${ placesToAdd[i].name }</h2>
                      <div class="price_by_night">${ placesToAdd[i].price_by_night }</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">
                        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                        <br />
                        ${ placesToAdd[i].max_guest } Guests
                      </div>
                      <div class="number_rooms">
                        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                        <br />
                        ${ placesToAdd[i].number_rooms } Bedrooms
                      </div>
                      <div class="number_bathrooms">
                        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                        <br />
                        ${ placesToAdd[i].number_bathrooms } Bathroom
                      </div>
                    </div>
                    <div class="user">
                      <strong>Owner: ${ users[j].first_name } ${ users[j].last_name }</strong>
                    </div>
                    <div class="description">${ placesToAdd[i].description }</div>
                  </article>`
                  );
                }
              }
            }
            $("section.places").append(filteredPlaces.join(''))
          })
        }
      }
      );
    })
  });
