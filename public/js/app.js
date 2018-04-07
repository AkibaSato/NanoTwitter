

/* =========AJAX========= */
$(document).ready(function() {
  $('.profile__follow-button').on('click', function(e) {
      const userID = $(e.currentTarget).data('userid');
      const url = '/users/' + userID + '/follow';
      if ($(this).hasClass('following')) {
        $(this).text('Follow');
        $(this).removeClass('following');
      } else {
        $(this).text('Unfollow');
        $(this).addClass('following');
      }
      $.ajax({
        type: 'POST',
        url: url,
        success: function(data) {
          console.log('Followed the user');
        },
        error: function(data) {
          console.log('not sent');
        }
      });
    });

  $('.like').on('click', function(e) {
    const tweetID = $(e.currentTarget).data('tweetid');
    const url = 'tweets/' + tweetID + '/favorites';
    $.ajax({
      type: 'POST',
      url: url,
      success: function(data) {
        console.log('Liked');
      },
      error: function(data) {
        console.log('not sent');
      }
    });
  });
});
