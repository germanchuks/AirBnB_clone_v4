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
});
