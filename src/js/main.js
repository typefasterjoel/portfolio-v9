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
});