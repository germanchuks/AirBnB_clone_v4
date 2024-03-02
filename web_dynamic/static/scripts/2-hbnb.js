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
});
