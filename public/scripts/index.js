$(document).ready(function () {
    // SCROLL TO THE TOP
    // $(window).on("beforeunload", function () {
    //     $(window).scrollTop(0);
    // });

    // STICKY NAVIGATION
    $("#about").waypoint(
        function (direction) {
            if (direction == "down") {
                $("nav").addClass("sticky");
            } else {
                $("nav").removeClass("sticky");
            }
        },
        {
            offset: "50px",
        }
    );

    // NAV HIGHLIGHTING ON SCROLL
    $("#nav").onePageNav({
        currentClass: "active",
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: "",
        easing: "swing",
    });

    // ACTIVE HIGHLIGHTER
    $("#nav").on("click", "ul li a", function () {
        $("ul li > a").removeClass("active");
        $(this).addClass("active");
    });
    $("#project-filter").on("click", "button", function () {
        $("button").removeClass("active");
        $(this).addClass("active");
    });
    $("#scroll-to-about").click(function () {
        $("ul li > a").removeClass("active");
        $("#nav-about").addClass("active");
    });
    $("#scroll-to-home").click(function () {
        $("ul li > a").removeClass("active");
        $("#nav-home").addClass("active");
    });
    $("#scroll-to-contact").click(function () {
        $("ul li > a").removeClass("active");
        $("#nav-contact").addClass("active");
    });

    // BAR-GRAPH ANIMATION
    $(".bars-wrap").waypoint(
        function (direction) {
            if (direction === "down") {
                $(".bar.fill").each(function () {
                    $this = $(this);
                    var delay = $this.data("delay");
                    var width = parseInt($this.data("width"));
                    $this.delay(delay).animate(
                        {
                            width: width + "%",
                        },
                        1000
                    );
                });
            }
        },
        {
            offset: "500px",
        }
    );

    // MESSAGE SUBMITTED TEXT
    $("#show-text").click(function (e) {
        e.preventDefault();
        $(this).removeClass("hidden");
    });

    // SCROLLING- REPETITIVE CODE
    // $(".js--scroll--to--home").click(function () {
    //     $("html, body").animate({ scrollTop: $("#home").offset().top });
    // });

    // SMOOTH SCROLLING
    let hashTagActive = "";
    $(".scroll").on("click touchstart", function (event) {
        if (hashTagActive != this.hash) {
            //this will prevent if the user click several times the same link to freeze the scroll.
            event.preventDefault();
            //calculate destination place
            var dest = 0;
            if (
                $(this.hash).offset().top >
                $(document).height() - $(window).height()
            ) {
                dest = $(document).height() - $(window).height();
            } else {
                dest = $(this.hash).offset().top;
            }
            //go to destination
            $("html,body").animate(
                {
                    scrollTop: dest,
                },
                500,
                "swing"
            );
            hashTagActive = this.hash;
        }
    });

    // MixItUp
    mixitup("#gallery", {
        animation: {
            duration: 700,
        },
    });

    // MODAL
    var modal = $("#modal");
    var carouselWrap = $(".carousel-wrap");
    var info = $(".info-box");
    var open = $(".mix > button");
    var close = $("#modal-close");
    open.click(function (e) {
        e.stopPropagation();
        modal.show();
        carouselWrap.show().addClass("show");
        info.show().addClass("show");
    });
    close.click(function () {
        modal.hide();
        carouselWrap.hide().removeClass("show");
        info.hide().removeClass("show");
    });

    carouselWrap.click(function (e) {
        e.stopPropagation();
    });
    info.click(function (e) {
        e.stopPropagation();
    });
    $(window).click(function (event) {
        if (event.target !== carouselWrap && event.target !== info) {
            modal.hide();
        }
    });

    //GALLERY MODAL
    var modalText = {
        natours: {
            title: "Natours: Exciting Tours For Adventurous People",
            tag: "LIVE ADVENTURES LIKE YOU NEVER HAVE BEFORE.",
            detail:
                "Natours is a platform that lets adventurous people discover new experiences.",
            link: "https://raj-tours.herokuapp.com",
        },
    };
    function fillModal(id) {
        $("#modal .title").text(modalText[id].title);
        $("#modal .detail").text(modalText[id].detail);
        $("#modal .tag").text(modalText[id].tag);
        if (modalText[id].link) $("#modal a").attr("href", modalText[id].link);

        $.each($("#modal .slide"), function (index, value) {
            $(this).css({
                background:
                    "url('img/slides/" +
                    id +
                    index +
                    ".jpg') center center/cover",
                backgroundSize: "cover",
            });
        });
    }

    $("#gallery button").on("click", function () {
        fillModal(this.id);
    });
    var carousel = $("#carousel"),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;
    $("#carousel-next").click(function () {
        shiftSlide(-1);
    });
    $("#carousel-previous").click(function () {
        shiftSlide(1);
    });

    function shiftSlide(direction) {
        if (carousel.hasClass("transition")) return;
        // dragEnd = dragStart;
        $(document).off("mouseup");
        $("#carousel")
            .off("mousemove")
            .addClass("transition")
            .css("transform", "translateX('+ direction * slideWidth +'px)");
        setTimeout(function () {
            if (direction === 1) {
                $(".slide:first").before($(".slide:last"));
            } else if (direction === -1) {
                $(".slide:last").after($(".slide:first"));
            }
            carousel.removeClass("transition");
            carousel.css("transform", "translateX(0px)");
        }, 700);
    }
});
