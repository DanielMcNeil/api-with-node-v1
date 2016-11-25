$(document).ready(function() {
  $('.app--tweet--timestamp').each(function() {
    let dateTime = $(this).html();
    let formattedDateTime = formatDateTime(dateTime,false);
    $(this).html(formattedDateTime);
  });
  $('.app--message--timestamp').each(function() {
    let dateTime = $(this).html();
    let formattedDateTime = formatDateTime(dateTime,true);
    $(this).html(formattedDateTime);
  });
  $('.app--message--text').each(function() {
    let message = $(this).html();
    let formattedMessage = createLinks(message);
    $(this).html(formattedMessage);
  });
});

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
}

const createLinks = (text) => {
    var regex = /(https?:\/\/[^\s]+)/g;
    return text.replace(regex, function(url) {
        return '<a class="app--message--text--link" href="' + url + '">' + url + '</a>';
    })
}