$(function() {
    $('.sidebar-top .sidebar-toggle, .header .sidebar-toggle-hidden').click(function() {

        $('.header .sidebar-top').parent().toggleClass('col-md-3 hide');
        $('.header .search').parent().toggleClass('col-md-4 col-md-7');

        $('.content .sidebar').parent().toggleClass('col-md-3 hide');
        $('.content .notes-list').parent().toggleClass('col-md-3 col-md-4');
        $('.content .single-note-content').parent().toggleClass('col-md-8 col-md-10');

        // Fix borders and margins
        if($(this).hasClass('sidebar-toggle')) {
            $('.content .sort-by-row, .content .notes-list').addClass('no-sidebar-block');
            $('.header .sidebar-toggle-hidden').show();
        }
        else {
            $('.content .sort-by-row, .content .notes-list').removeClass('no-sidebar-block');
            $('.header .sidebar-toggle-hidden').hide();
        }
    });

    $('.content .set-height').matchHeight();
    $('.notebook-controls [data-toggle="tooltip"]').tooltip();

    if(matchMedia('(max-width: 991px)').matches) {
        $('.content .sidebar').parent().addClass('mobile-left-slider');
        $('.mobile-left-slider').css({
            'left': '-' + $('body').width() + 'px'
        });

        var snapper = new Snap({
            element: $('.mobile-left-slider')[0],
            maxPosition: $('body').width(),
            minPosition: '-' + $('body').width()
        });


        $('.mobile-show-navigation .sidebar-toggle').click(function() {
            snapper.open('left');
            $('.mobile-show-navigation .sidebar-toggle-hidden').show();
        });

        $('.mobile-show-navigation .sidebar-toggle-hidden').click(function() {
            snapper.close();
            $(this).hide()
        });

        $('.content .sort-by-row').parent().add($('.content .single-note-content').parent()).wrapAll(
            $('<div/>').addClass('owl-carousel')
        );

        $('.owl-carousel').owlCarousel({
            items: 1,
            dots: false
        });

        $(window).resize(function() {
            var width = $('body').width();
            $('.mobile-show-navigation .sidebar-toggle-hidden').trigger('click');
            $('.mobile-left-slider').css({
                'left': '-' + width + 'px'
            });
            snapper.settings({
                maxPosition: width
            });

            // Force desktop view... remove mobile features
            if(matchMedia('(min-width: 992px)').matches) {
                $('.owl-carousel').data('owlCarousel').destroy();
                $('.owl-carousel').children().unwrap();
                $('.owl-stage-outer').children().unwrap();
                $('.content .sidebar').parent().removeClass('mobile-left-slider').css('left', '');
            }
        });
    }
});