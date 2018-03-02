var animeArray = ["Jojos Bizarre Adventure", "Dragonball Z", "My Hero Academia", "One Punch Man", "SKELETOR"];

$(document).ready(function() {
    for (var i = 0; i < animeArray.length; i++) {
        $("#anime-buttons").append("<button type='button' onclick='searchGif(\"" + animeArray[i] + "\")' class='btn btn-primary' value=' " + animeArray[i] + "'> " + animeArray[i] + " </button>");
    }
});

function animeButton() {
    var userInput = $('#anime-input').val();
    searchGif(userInput);
}

function submitButton() {
    var userInput = $('#anime-input').val();
    event.preventDefault(); //default is not working, when you press enter, it resets the page. If you press the button to submit, it will work properly
    if (userInput) {
        $('#anime-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}


function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC&limit=10',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}
function displayGif(response) {
    $('#anime').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#anime').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
    });
}