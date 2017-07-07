$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<h4 data-id='" + data[i]._id + "'>" + data[i].title+ "</h4>");
        $("#articles").append("<h5 data-id='" + data[i]._id + "'>" + "<kbd>" + data[i].link + "</kbd></h5><br>");
    }
});


$(document).on("click", "h4", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
        .done(function(data) {
            console.log(data);
            $("#notes").append("<h3>" + data.title + "</h3>");
            $("#notes").append("<input id='titleinput' name='title' class='form-control'>");
            $("#notes").append("<br><textarea id='bodyinput' name='body' class='form-control' rows='7'></textarea><br>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote' class='btn btn-default btn-block'>Add New Note</button>");

            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        });
});

$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
        .done(function(data) {
            console.log(data);
            $("#notes").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});