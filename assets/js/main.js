(function($) {
    "use strict";
    var windowOn = $(window);

    // Get Device width
    var device_width = window.innerWidth;


    /*======================================
        Data Css js
    ========================================*/
    $("[data-background]").each(function() {
        $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
        );
    });

    $("[data-width]").each(function() {
        $(this).css("width", $(this).attr("data-width"));
    });


    /*======================================
        Odometer
    ========================================*/
    $(window).on("load", function(event) {
        setTimeout(function() {
            $(".odometer").waypoint(
                function() {
                    var odo = $(".odometer");
                    odo.each(function() {
                        var countNumber = $(this).attr("data-count");
                        $(this).html(countNumber);
                    });
                }, {
                    offset: "80%",
                    triggerOnce: true,
                }
            );
        }, 1000);
    });

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('body').addClass('firefox');
    }

    var header = $(".header"),
        stickyHeader = $(".primary-header");

    function menuSticky(w) {
        if (w.matches) {

            $(window).on("scroll", function() {
                var scroll = $(window).scrollTop();
                if (scroll >= 10) {
                    header.addClass("fixed");
                } else {
                    header.removeClass("fixed");
                }
            });
        }
    }

    var minWidth = window.matchMedia("(min-width: 992px)");
    if (header.hasClass("sticky-active")) {
        menuSticky(minWidth);
    }

    //Mobile Menu Js
    $(".mobile-menu-items").meanmenu({
        meanMenuContainer: ".side-menu-wrap",
        meanScreenWidth: "992",
        meanMenuCloseSize: "30px",
        meanRemoveAttrs: true,
        meanExpand: ['<i class="fa-solid fa-caret-down"></i>'],
    });

    // Mobile Sidemenu
    $(".mobile-side-menu-toggle").on("click", function() {
        $(".mobile-side-menu, .mobile-side-menu-overlay").toggleClass("is-open");
    });

    $(".mobile-side-menu-close, .mobile-side-menu-overlay").on("click", function() {
        $(".mobile-side-menu, .mobile-side-menu-overlay").removeClass("is-open");
    });

    /*======================================
        Sidebar Toggle
    ========================================*/
    $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
        $(".offcanvas__area").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");
    });
    // Scroll to bottom then close navbar
    $(window).scroll(function() {
        if ($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".offcanvas__area").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        }
    });
    $(".sidebar__toggle").on("click", function() {
        $(".offcanvas__area").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");
    });

    /*======================================
        Body overlay Js
    ========================================*/
    $(".body-overlay").on("click", function() {
        $(".offcanvas__area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });



    // Page Scroll Percentage
    function scrollTopPercentage() {
        const scrollPercentage = () => {
            const scrollTopPos = document.documentElement.scrollTop;
            const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
            const scrollElementWrap = $("#scroll-percentage");

            scrollElementWrap.css("background", `conic-gradient( var(--rr-theme-primary-2) ${scrollValue}%, var(--rr-common-white) ${scrollValue}%)`);

            // ScrollProgress
            if (scrollTopPos > 100) {
                scrollElementWrap.addClass("active");
            } else {
                scrollElementWrap.removeClass("active");
            }

            if (scrollValue < 96) {
                $("#scroll-percentage-value").text(`${scrollValue}%`);
            } else {
                $("#scroll-percentage-value").html('<i class="fa-sharp fa-regular fa-arrow-up-long"></i>');
            }
        }
        window.onscroll = scrollPercentage;
        window.onload = scrollPercentage;

        // Back to Top
        function scrollToTop() {
            document.documentElement.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }

        $("#scroll-percentage").on("click", scrollToTop);
    }

    scrollTopPercentage();

    /*======================================
	One Page Scroll Js
	========================================*/
    /*** Scroll Nav */
    var link = $('.onepagenav #mobile-menu ul li a, .onepagenav .mean-nav ul li a');

    link.on('click', function(e) {
        var target = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: target.offset().top - 76
        }, 600);
        $(this).parent().addClass('active');
        e.preventDefault();
    });

    $(window).on('scroll', function() {
        scrNav();
    });

    function scrNav() {
        var sTop = $(window).scrollTop();
        $('section').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top - 1,
                height = $(this).height();
            if (sTop >= offset && sTop < offset + height) {
                link.parent().removeClass('active');
                $('.main-menu').find('[href="#' + id + '"]').parent().addClass('active');
            }
        });
    }
    scrNav();



    // Gsap animation 
    // =====================================
    //return img gsap
    gsap.registerPlugin(ScrollTrigger);

    //GSAP smooth animation
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    if ($('#smooth-wrapper').length && $('#smooth-content').length) {

        gsap.config({
            nullTargetWarn: false,
        });

        var isMobile = window.innerWidth <= 991;

        if (!isMobile) {
            let smoother = ScrollSmoother.create({
                smooth: 0.8,
                effects: false,
                smoothTouch: false,
                normalizeScroll: false,
                ignoreMobileResize: true,
            });
        }
    }

    // Title-anim 
    if (document.querySelectorAll(".rr-title-anim").length > 0) {
        document.addEventListener("DOMContentLoaded", () => {
            let titles = document.querySelectorAll(".rr-title-anim");

            titles.forEach(title => {
                let split = new SplitText(title, {
                    type: "chars, words"
                });

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: title,
                        start: "top bottom",
                        toggleActions: "play none none reverse",
                        onEnter: () => tl.timeScale(2.3),
                        onLeaveBack: () => tl.timeScale(2.3).reverse()
                    }
                });

                tl.from(split.chars, {
                    opacity: 0,
                    y: 50,
                    rotation: 1,
                    duration: 2,
                    ease: "back",
                    stagger: 0.05
                });
            });
        });
    }

    //fade-top gsap animation
    if (document.querySelectorAll(".fade-wrapper").length > 0) {
        $(".fade-wrapper").each(function() {
            var section = $(this);
            var fadeItems = section.find(".fade-top");

            fadeItems.each(function(index, element) {
                var delay = index * 0.1;

                gsap.set(element, {
                    opacity: 0,
                    y: 70,
                });

                ScrollTrigger.create({
                    trigger: element,
                    start: "top 95%",
                    end: "bottom bottom",
                    scrub: false,
                    toggleActions: "play none none reverse",
                    onEnter: function() {
                        gsap.to(element, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: delay
                        });
                    },
                    onLeaveBack: function() {
                        gsap.to(element, {
                            opacity: 0,
                            y: 70,
                            duration: 0.5
                        });
                    }
                });
            });
        });
    }

    if ($('.unique-design').length > 0) {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 1200px)", () => {
            return gsap.to('.unique-design__header', {
                opacity: 1,
                scrollTrigger: {
                    trigger: '.unique-design',
                    scrub: 1,
                    start: 'top top',
                    end: "bottom 75%",
                    pin: '.unique-design__header',
                    markers: false,
                    toggleActions: 'play reverse play reverse',
                }
            });
        });
    }



    //button animation
    // ----------------------------------------------------------------------------
    // Button Effect
    var buttons = document.querySelectorAll('.default-btn, .hover-anim');
    const btnCheck = document.getElementsByClassName('hover-anim').length > 0;
    if (btnCheck) {
        buttons.forEach(function(button) {
            button.addEventListener('mouseenter', function(e) {
                var parentOffset = this.getBoundingClientRect(),
                    relX = e.clientX - parentOffset.left,
                    relY = e.clientY - parentOffset.top;
                if (this.querySelector('.hover-bg')) {
                    this.querySelector('.hover-bg').style.top = relY + 'px';
                    this.querySelector('.hover-bg').style.left = relX + 'px';
                }
            });

            button.addEventListener('mouseout', function(e) {
                var parentOffset = this.getBoundingClientRect(),
                    relX = e.clientX - parentOffset.left,
                    relY = e.clientY - parentOffset.top;
                if (this.querySelector('.hover-bg')) {
                    this.querySelector('.hover-bg').style.top = relY + 'px';
                    this.querySelector('.hover-bg').style.left = relX + 'px';
                }
            });
        });
    }


    ////////////////////////////////////////////////////
    // 21. Counter Js
    if (document.querySelector('.knob')) {
        new PureCounter();
    }

    /*======================================
    innner-page-active js
    ========================================*/

    // inner-slide js 
    if ('.innner-page-active') {
        var text_slider = new Swiper(".innner-page-active", {
            slidesPerView: 'auto',
            loop: true,
            autoplay: true,
            spaceBetween: 10,
            speed: 5000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                reverseDirection: false,
            },
        });
    }
    // inner-slide js 
    if ('.innner-page-active_rtl') {
        var text_slider = new Swiper(".innner-page-active_rtl", {
            slidesPerView: 'auto',
            loop: true,
            autoplay: true,
            spaceBetween: 10,
            speed: 5000,
            allowTouchMove: false,
            autoplay: {
                delay: 1,
                reverseDirection: false,
            },
        });
    }


    /*======================================
    client-feedback__activ js
    ========================================*/
    var swiperTesti = new Swiper(".testi-carousel-2", {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        autoplay: true,
        grabcursor: true,
        speed: 600,
        grabcursor: true,
        pagination: {
            el: ".testimonial-section-3-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 30,
            },
            767: {
                slidesPerView: 2,
                slidesPerGroup: 1,
                spaceBetween: 30,
            },
            992: {
                slidesPerView: 2,
                slidesPerGroup: 1,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 1,
            },
        },
    });



    document.querySelectorAll(".scroll-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            var sectionTarget = btn.getAttribute("data-target");
            var target = document.querySelector(sectionTarget);

            if (!target) {
                return;
            }

            var targetY = target.getBoundingClientRect().top + window.pageYOffset - 70;

            if (window.gsap && window.ScrollToPlugin) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetY
                    }
                });
            } else {
                window.scrollTo({
                    top: targetY,
                    behavior: "smooth"
                });
            }
        });
    });


    //Running Animated Text
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    /*Wow Js*/
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }





})(jQuery);
