'use strict';

var characters = 140;

$('#tweet-textarea').keyup(function(){
  var remaining = characters - $(this).val().length;
  $('#tweet-char').html(remaining);
  if (remaining < 0) {
    $('#submit-tweet button').prop('disabled',true);
    $('#submit-tweet button').addClass('disabled');
    $('#tweet-char').addClass('lessthanzero');
  } else {
    $('#submit-tweet button').prop('disabled',false);
    $('#submit-tweet button').removeClass('disabled');
    $('#tweet-char').removeClass('lessthanzero');
  }
});

$('#submit-tweet').submit(function(event) {
  event.preventDefault();
  var tweet = $('#tweet-textarea').val();
  $.getJSON('/post/' + tweet, function(data) {
    console.dir(data);
    
  });
});