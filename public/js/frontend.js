// After page loads:
$(document).ready(function() {
  // Format timestamp on tweets to display just date
  formatTimelineTimestamp();
  // Format timestamp on direct messages to display date and time
  formatMessageTimestamp();
  // Highlight any links in direct messages
  highlightMessageLinks();
});

const formatTimelineTimestamp = () => {
  $('.app--tweet--timestamp').each(function() {
    let dateTime = $(this).html();
    let formattedDateTime = formatDateTime(dateTime,false);
    $(this).html(formattedDateTime);
  });
}

const formatMessageTimestamp = () => {
  $('.app--message--timestamp').each(function() {
    let dateTime = $(this).html();
    let formattedDateTime = formatDateTime(dateTime,true);
    $(this).html(formattedDateTime);
  });
}

const highlightMessageLinks = () => {
  $('.app--message--text').each(function() {
    let message = $(this).html();
    let formattedMessage = createLinks(message);
    $(this).html(formattedMessage);
  });
}

// Break the timestamp into an array and paste the desired parts of it back together
const formatDateTime = (dateTime,time) => {
  let dateTimeArray = dateTime.split('');
  let dateArray = dateTimeArray.slice(4,10);
  let year = dateTimeArray.slice((dateTimeArray.length - 4),(dateTimeArray.length)).join('');
  dateArray.push(', ');
  dateArray.push(year);
  if (time === true) {
    let time = dateTimeArray.slice(10,19).join('');
    dateArray.push(time);
  }
  let datetime = dateArray.join('');
  return datetime;
};

// use a regex to detect a link in a text string and turn in into an actual html link
const createLinks = (text) => {
    var regex = /(https?:\/\/[^\s]+)/g;
    return text.replace(regex, function(url) {
        return '<a class="app--message--text--link" href="' + url + '">' + url + '</a>';
    });
};

'use strict';

const characters = 140;

// after every character is typed in the tweet text box:
// increase or decrese the character counter
// if there are more than 140 characters, disable the Tweet button and turn the character counter red
// when there are less than 140 characters, enable the Tweet button and turn the character counter back to gray
$('#tweet-textarea').keyup(function(){
  let remaining = characters - $(this).val().length;
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

// when the Tweet button is clicked
// show alert if the user didn't type anything in the tweet text box
// capture tweet text and send to tweet posting API
// when new tweet data comes back, call the function to render it in the timeline section
// after the ajax request is finished, run the formatTimelineTimestamp function
// clear the tweet text box and reset character counter
$('#submit-tweet').submit(function(event) {
  event.preventDefault();
  if ($('#tweet-char').html() === '140') {
    alert('You need to type something first');
  } else {
    let tweet = $('#tweet-textarea').val();
    $.post('/tweets',{tweetText: tweet}, function(data) {
      renderTweets(data);
    }).done(function() {
      formatTimelineTimestamp();
    });
    $('#tweet-textarea').val('');
    $('#tweet-char').html('140');
  }
});

// use returned tweet data to render the updated timeline section
// FYI the intentation on this function probably looks really strange
// I indented it the way you would indent regular html to try to keep it straight in my head
const renderTweets = (data) => {
  let codeBlock = '';
  for (let tweet = 0; tweet < data.length; tweet++) {
    codeBlock += '<li>';
      codeBlock += '<strong class="app--tweet--timestamp">' + data[tweet].created_at + '</strong>';
      codeBlock += '<a class="app--tweet--author">';
        let backgroudStyle = 'background-image:url(' + data[tweet].user.profile_image_url + ')';
        codeBlock += '<div class="app--avatar" style="' + backgroudStyle + '">';
          codeBlock += '<img src="' + data[tweet].user.profile_image_url + '">';
        codeBlock += '</div>';
        codeBlock += '<h4>' + data[tweet].user.name + '</h4>';
        codeBlock += '<span>@' + data[tweet].user.screen_name + '</span>';
      codeBlock += '</a>';
      codeBlock += '<p>' + data[tweet].text + '</p>';
      codeBlock += '<ul class="app--tweet--actions circle--list--inline">';
        codeBlock += '<li>';
          codeBlock += '<a class="app--reply">';
            codeBlock += '<span class="tooltip">Reply</span>';
            codeBlock += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 38 28" xml:space="preserve">';
              codeBlock += '<path d="M24.9,10.5h-8.2V2.8c0-1.1-0.7-2.2-1.7-2.6c-1-0.4-2.2-0.2-3,0.6L0.8,12c-1.1,1.1-1.1,2.9,0,4L12,27.2c0.5,0.5,1.2,0.8,2,0.8c0.4,0,0.7-0.1,1.1-0.2c1-0.4,1.7-1.5,1.7-2.6v-7.7h8.2c3.3,0,6,2.5,6,5.6v1.3c0,2,1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5v-1.3C38,16.2,32.1,10.5,24.9,10.5z"></path>';
            codeBlock += '</svg>';
          codeBlock += '</a>';
        codeBlock += '</li>';
        codeBlock += '<li>';
          codeBlock += '<a class="app--retweet">';
            codeBlock += '<span class="tooltip">retweet</span>';
            codeBlock += '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 28" xml:space="preserve">';
              codeBlock += '<path d="M25.2,22.4H13.1v-9.3h4.7c1.1,0,2.2-0.7,2.6-1.7c0.4-1,0.2-2.3-0.6-3.1l-7.5-7.5c-1.1-1.1-2.9-1.1-4,0L0.8,8.3c-0.8,0.8-1,2-0.6,3.1c0.4,1,1.5,1.7,2.6,1.7h4.7v12.1c0,1.5,1.3,2.8,2.8,2.8h14.9c1.5,0,2.8-1.3,2.8-2.8C28,23.7,26.7,22.4,25.2,22.4z"></path>';
              codeBlock += '<path d="M49.8,16.7c-0.4-1-1.5-1.7-2.6-1.7h-4.7V2.8c0-1.5-1.3-2.8-2.8-2.8H24.8C23.3,0,22,1.3,22,2.8s1.3,2.8,2.8,2.8h12.1v9.3h-4.7c-1.1,0-2.2,0.7-2.6,1.7c-0.4,1-0.2,2.3,0.6,3.1l7.5,7.5c0.5,0.5,1.3,0.8,2,0.8c0.7,0,1.4-0.3,2-0.8l7.5-7.5C50,18.9,50.2,17.7,49.8,16.7z"></path>';
            codeBlock += '</svg>';
            codeBlock += '<strong>' + data[tweet].retweet_count + '</strong>';
          codeBlock += '</a>'
        codeBlock += '</li>';
        codeBlock += '<li>';
          codeBlock += '<a class="app--like">';
            codeBlock += '<span class="tooltip">like</span>';
            codeBlock += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 35 28" xml:space="preserve">';
              codeBlock += '<path class="st0" d="M25.8,0c-3.6,0-6.8,2.1-8.3,5.1C16,2.1,12.9,0,9.2,0C4.1,0,0,4.1,0,9.2C0,21.4,17.3,28,17.3,28S35,21.3,35,9.2C35,4.1,30.9,0,25.8,0L25.8,0z"></path>';
            codeBlock += '</svg>';
            codeBlock += '<strong>' + data[tweet].favorite_count + '</strong>';
          codeBlock += '</a>';
        codeBlock += '</li>';
      codeBlock += '</ul>';
    codeBlock += '</li>';
  }
  $('.app--tweet--list li').detach();
  $('.app--tweet--list').html(codeBlock);
};