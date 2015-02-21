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

    $('.main .content > .row > div').matchHeight();
    $('.notebook-controls [data-toggle="tooltip"]').tooltip();
});