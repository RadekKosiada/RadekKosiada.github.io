/*-----------------------------------------------------------------------------------

    Custom JS - All front-end jQuery
 
-----------------------------------------------------------------------------------*/

$(document).ready( function(){

    'use strict';

/*-----------------------------------------------------------------------------------*/
/*  PLUGINS INIT
/*-----------------------------------------------------------------------------------*/

    var templateFunctions = {

        /** Site Prloader */
        sitePreloader: function() {

            imagesLoaded( $('body'), function(i) {

                $('#preloader').fadeOut(function() {
                    $(this).remove();
                });

            });

            // delegate all clicks on "a" tag (links)
            $(document).on("click", "a:not(a[target='_blank']):not(.no-fade):not(.add-to-cart a):not(.slick-arrow):not(.widget_filter a):not(.trend-toggle-title a):not(.trend-tab-headings a)", function (e) {

                // get the href attribute
                var newUrl = $(this).attr("href");

                // verify if the new url exists or is a hash
                if (!newUrl || newUrl[0] === "#") {
                    // set that hash
                    location.hash = newUrl;
                    return;
                }

                // now, fadeout the html (whole page)
                $("#site-container").fadeOut(function () {
                    // when the animation is complete, set the new location
                    location = newUrl;
                });

                // prevent the default browser behavior.
                e.preventDefault();
            });

        },

        /** Mobile Navigation */
        mobileNav: function() {

            $('#site-navigation ul').slicknav({
                label: 'Navigation',
            });

        },

        /** Current Nav Class */
        currentNav: function() {

            var pathname = (window.location.pathname.match(/[^\/]+$/)[0]);

            $('#site-navigation a').each(function() {

                if ($(this).attr('href') == pathname) {
                    $(this).parents('li').addClass('active');
                }

            });     

        },


        /** Masonry portfolio */
        masonry: function() {

            var $containerMasonry = $('#portfolio-grid');

            $containerMasonry.imagesLoaded( function(){
                
                // initialize isotope
                $containerMasonry.isotope({

                    itemSelector : '.portfolio',
                    layoutMode: 'fitRows'

                });

            });

        },

        /** Slick Slider */
        slickSlider: function() {

            $('body').on('click', '.slick-arrow', function (e){
                e.preventDefault();
            });
            
            // Blog - Gallery Slider
            $('.format-gallery .entry-media').slick({
                prevArrow: '<a href="#" class="prev-arrow"><i class="fa fa-chevron-left"></i></a>',
                nextArrow: '<a href="#" class="next-arrow"><i class="fa fa-chevron-right"></i></a>',
                adaptiveHeight: true,
            });

            // Store Index - Entry Slider
            $('.product .entry-media').slick({
                adaptiveHeight: true,
                arrows: false,
                dots: true,
            });

            // Produc Page - Primary Slider
            $('.single-product .entry-media').slick({
                slidesToShow: 1,
                slidesToScroll: 1,                
                adaptiveHeight: true,
                arrows: false,
                dots: true,
                asNavFor: '.single-product .more-images'
            });

            // Produc Page - Secondary Slider
            $('.single-product .more-images').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.single-product .entry-media',
                focusOnSelect: true
            });

            // Detect Dragging Event
            $('body').on('mousedown', '.slick-slider', function (){
                $(this).addClass('dragging');        
            });
            $('body').on('mouseup', '.slick-slider', function (){
                $(this).removeClass('dragging');        
            });

        },

        /** Filters */
        filtering: function() {

            // cache container
            var $containerMasonry = $('#portfolio-grid, #store-grid');

            // initialize isotope
            $containerMasonry.isotope();

            // add active class on portfolio and store filter
            if ($('body').hasClass('portfolio') || $('body').hasClass('store')) {
                $('.widget_filter ul li:first-child a').addClass('active');
            }

            // filter portfolio items
            $('body.portfolio, body.store').on('click', '.widget_filter a', function (e){

                e.preventDefault();

                $('.widget_filter a').removeClass('active');
                $(this).addClass('active');

                var filter = $(this).attr('data-filter');
                $containerMasonry.isotope({ filter: filter });

            });                

        },

        /** fitVids */
        fitVids: function() {

            $('.format-video .entry-media, .portfolio-images .entry-media').fitVids();             

        },

        /** toggle */
        toggles: function() {

            $('body').on('click', '.trend-toggle-title > a', function (e) {

                
                // grab current toggle heading and body
                var toggleHeading = $(this).parents('.trend-toggle-heading');
                var toggleBody = toggleHeading.next('.trend-toggle-body');

                // slideToggle body on each click
                toggleBody.slideToggle(300);

                // toggleClass on heading and body elements
                toggleHeading.toggleClass('active');
                toggleBody.toggleClass('open');

                e.preventDefault(); // avoids default link behaviour


            });

        },

        /** tabs */
        tabs: function() {

            // set tabs state on load
            $('.trend-tabs').each( function (e) {

                // activate first heading and body onLoad for each tabs set
                $('> .trend-tab-headings > li:first-child', this).addClass('active');
                $('> .trend-tab-contents > div:first-of-type', this).addClass('open');

            });        

            $('body').off('click', '.trend-tab-headings > li a');
            $('body').on('click', '.trend-tab-headings > li a', function (e) {

                
                // grab clicked tab ID
                var tabID = $(this).attr('href').substr(1);

                // grab current set of tabs
                var tabsSet = $(this).parents('.trend-tabs');

                // grab target heading and body elements
                var targetHeading = $(this).parent();
                var targetBody = tabsSet.find('.trend-tab-contents > #'+ tabID);

                // remove classes from each heading and body element in the set
                $('> .trend-tab-headings > li', tabsSet).removeClass('active');
                $('> .trend-tab-contents > div', tabsSet).removeClass('open');

                // add classes on target heading and content elements
                targetHeading.addClass('active');
                targetBody.addClass('open');

                e.preventDefault(); // avoids default link behaviour

            });


        },

        /** goToTop */
        goToTop: function() {

            $("#site-container").prepend('<a id="go-to-top" href="#"><i class="fa fa-arrow-up"></i></a>'); // only for demo purpose


            // hide #back-top first
            $("#go-to-top").hide();
            
            // fade in #back-top
            $(function () {
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 200) {
                        $('#go-to-top').fadeIn();
                    } else {
                        $('#go-to-top').fadeOut(200);
                    }
                });

                // scroll body to 0px on click
                $('#go-to-top').click(function () {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            });


        },

        /** addToCart */
        addToCart: function() {

            $("#site-container").prepend('<a id="cart-count" href="store-cart.html"><img src="images/icons/marker20.svg" alt="Shopping Cart" /><span class="count">2</span></a>'); // only for demo purpose

            $('body').on('click', '#store-grid .entry .wrapper .add-to-cart a', function (e) {
                e.preventDefault();

                noty({
                    layout: 'bottomRight',
                    text: 'Item added to shoping cart!',
                    type: 'success',
                    timeout: 3000,
                });

            });
        },

        /** formValidation */
        formValidation: function() {

             $('#contact-form').validate();

        },        

    }


    /** LOAD */
    /** ================================================== */

    $(window).bind('load', function() {

        /** Load template functions */
        templateFunctions.sitePreloader();
        templateFunctions.mobileNav();
        templateFunctions.currentNav();
        templateFunctions.slickSlider();
        templateFunctions.filtering();
        templateFunctions.fitVids();
        templateFunctions.toggles();
        templateFunctions.tabs();
        templateFunctions.goToTop();
        templateFunctions.addToCart();
        templateFunctions.formValidation();

    });


    /** RESIZE */
    /** ================================================== */

    $(window).bind('resize', function() {

        /** Load template functions */

    });

});

// FIX: Firefox JS not executing on browser back
window.onunload = function(){};

// FIX: Safari JS not executing on browser back
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});