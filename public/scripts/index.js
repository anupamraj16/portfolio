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
        scrollThreshold: 0.3,
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

    // FADE OTHER PUBLICATION
    $(".publication-wrap").hover(
        function () {
            $(this).siblings($(this)).fadeTo(100, 0.5);
            $(this).parent().siblings().fadeTo(100, 0.5);
        },
        function () {
            $(this).siblings($(this)).fadeTo(100, 1);
            $(this).parent().siblings().fadeTo(100, 1);
        }
    );

    // MESSAGE SUBMITTED TEXT

    $("form").submit(function (event) {
        event.preventDefault();

        url = $("form").attr("action");

        /* Send the data using post with element id name and name2*/
        var posting = $.post(url, {
            name: $("#name").val(),
            email: $("#email").val(),
            message: $("#message").val(),
        });
        /* Alerts the results */
        posting.done(function () {
            $("#contact .text")
                .parent()
                .fadeTo(0, 0)
                .delay(300)
                .children()
                .text("Anupam will be in touch!!")
                .css("color", "#e67e22");
            $("#contact .text").parent().delay(300).fadeTo(500, 1);
            $("form").delay(500).trigger("reset");
        });
        posting.fail(function () {
            $("#contact .text")
                .parent()
                .fadeTo(0, 0)
                .delay(300)
                .children()
                .text("Something Went Wrong! Please try again.")
                .css("color", "red");
            $("#contact .text").parent().delay(300).fadeTo(500, 1);
        });
    });

    // $("form button").click(function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url: "/email",
    //         type: "POST",
    //         data: $("form").serialize(),
    //         dataType: "json",
    //         beforeSend: function (x) {
    //             if (x && x.overrideMimeType) {
    //                 x.overrideMimeType("application/json;charset=UTF-8");
    //             }
    //         },
    //         success: function (data) {
    //             console.log(data);
    // $("form button").click(function () {
    //     $("#contact .text")
    //         .delay(1000)
    //         .text("Anupam will be in touch.")
    //         .css("color", "orange");
    // });
    //         },
    //     });
    // });

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
});
