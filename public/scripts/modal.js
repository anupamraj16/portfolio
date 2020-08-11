$(document).ready(function () {
    var carousel = $("#carousel"),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;

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
    $(window).mousedown(function (event) {
        if (event.target.id == "modal") {
            modal.hide();
        }
    });

    // FILL MODAL WITH DATA
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
            tag: "ORDER FOOD FROM YOUR HOME",
            detail: "Fresh food. Skip your dishes",
            link: "https://google.com",
        },
    };
    function fillModal(id) {
        $("#modal .title").text(modalText[id].title);
        $("#modal .detail").text(modalText[id].detail);
        $("#modal .tag").text(modalText[id].tag);
        if (modalText[id].link) $("#modal a").attr("href", modalText[id].link);

        $.each($(".slide"), function (index, value) {
            $(this).css({
                background:
                    "url('img/slides/" +
                    id +
                    "-" +
                    index +
                    ".jpg') center center/cover",
            });
        });
        // $(".slide").css("display", "none");
    }

    $("#gallery button").on("click", function () {
        fillModal(this.id);
    });

    $("#carousel-next").click(function () {
        shiftSlide(-1);
    });
    $("#carousel-previous").click(function () {
        shiftSlide(1);
    });

    // DRAGGING IMAGE FUNCTION
    carousel.on("mousedown", function () {
        dragStart = event.pageX;
        $(this).on("mousemove", function () {
            dragEnd = event.pageX;
            $(this).css("transform", "translateX(" + drag() + "px)");
        });
        $(document).on("mouseup", function () {
            if (drag() > threshold) {
                return shiftSlide(1);
            }
            if (drag() < -threshold) {
                return shiftSlide(-1);
            }
            shiftSlide(0);
        });
    });

    function drag() {
        return dragEnd - dragStart;
    }

    // SLIDE IMAGE
    function shiftSlide(direction) {
        dragEnd = dragStart;
        $(document).off("mouseup");
        carousel
            .off("mousemove")
            .addClass("transition")
            .css("transform", "translateX(" + direction * slideWidth + "px)");
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
