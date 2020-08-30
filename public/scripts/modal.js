$(document).ready(function () {
    var carousel = $("#carousel"),
        slideWidth = 700,
        threshold = slideWidth / 4,
        dragStart,
        dragEnd;

    // FILL MODAL WITH DATA
    var modalText = {
        excursion: {
            title: "Excursion: Plan Your Long Weekend",
            tag: "EXCITING TOURS AROUND THE WORLD",
            detail:
                "Excursion is a platform that lets adventurous people discover new experiences, explore new places and much more.",
            link: "https://long-weekend.herokuapp.com",
        },
        shoppers: {
            title: "Shopper's",
            tag: "ALL THAT YOU CAN BUY",
            detail:
                "Shopping at your fingertips. Blazing fast delivery and amazing customer support.",
            link: "https://oneclickshopping.herokuapp.com/",
        },
        api: {
            title: "Excursion REST API",
            tag: "APIs READY TO BE CONSUMED",
            detail:
                "Excursion API lets other apps consume the data sent by Excursion backend. Third parties apps can use authentication, get tour data, book tours and much more through this API.",
            link: "https://documenter.getpostman.com/view/11969191/TVCZbBMH",
        },
        chat: {
            title: "The Chat App",
            tag: "REAL TIME CHAT APP USING SOCKET.IO",
            detail: "Built with Node.js and Socket.IO.",
            link: "https://socket-io-realtime-chat.herokuapp.com/",
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
    }

    function drag() {
        return dragEnd - dragStart;
    }
    slideWidth =
        ($(".modal").innerWidth() * parseInt($(".modal-window").css("width"))) /
        100;

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
});
