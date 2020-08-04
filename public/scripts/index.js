$(document).ready(function () {
    // SCROLL TO THE TOP
    $(window).on("beforeunload", function () {
        $(window).scrollTop(0);
    });

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

    // NAVBAR HIGHLIGHTER
    $(document).on("click", "ul li a", function () {
        $("ul li > a").removeClass("active");
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

    // NAV HIGHLIGHTING ON SCROLL
    $("#nav").onePageNav({
        currentClass: "active",
        changeHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: "",
        easing: "swing",
    });

    // MixItUp
    mixitup("#gallery", {
        animation: {
            duration: 700,
        },
    });
});
