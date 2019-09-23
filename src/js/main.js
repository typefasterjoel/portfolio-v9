$(document).ready(function() {
    $('.scroll-btn').on('click', function(e) {
        e.preventDefault();

        var targetPanel = $(this).attr('href');
        var offset = $(targetPanel).offset().top;

        console.log(targetPanel);
        console.log(offset);

        $('html,body').stop().animate({
            scrollTop: offset
        }, 750);
    });

    $('.open-modal').on('click', function(e) {
        e.preventDefault();
        $('body').addClass('no-scroll');
        var modal = $(this).data('modal');

        $('#overlay').fadeIn(250, function() {
            $(modal).fadeIn(250);
        });
    });

    $('#overlay, .close-modal').on('click', function(e) {
        $('.popup').fadeOut(250, function() {
            $('body').removeClass('no-scroll');
            $('#overlay').fadeOut(250);
        });
    });
});