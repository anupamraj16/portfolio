$(document).ready(function () {
    // SHOW MODAL
    var modal = $("#modal");
    var modalWindow = $(".modal-window");
    var open = $(".mix > button");
    var close = $("#modal-close");
    open.click(function (e) {
        e.stopPropagation();
        modal.show();
        modalWindow.show().addClass("show");
    });
    close.click(function () {
        modal.hide();
        modalWindow.hide().removeClass("show");
    });

    modalWindow.click(function (e) {
        e.stopPropagation();
    });
    $(window).click(function (event) {
        if (event.target !== modalWindow) {
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
        omnifood: {
            title: "Omnifood",
            tag: "Order food from your home",
            detail: "Fresh food. Skip your dishes",
            link: "https://google.com",
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
        dragEnd = dragStart;
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
