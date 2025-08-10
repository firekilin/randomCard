$("#submit").on("click", function(event) {
    let isValid = true;
    if($("#fullname").val() === "") {
        $("#fullname").addClass("is-invalid");
        isValid = false;
    }
    if($("#email").val() === "") {
        $("#email").addClass("is-invalid");
        isValid = false;
    }
    if($("#contactReason").val() === "") {
        $("#contactReason").addClass("is-invalid");
        isValid = false;
    }
    if($("#topic").val() === "") {
        $("#topic").addClass("is-invalid");
        isValid = false;
    }
    if($("#details").val() === "") {
        $("#details").addClass("is-invalid");
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    $.ajax({
        url: "your-server-endpoint",
        method: "POST",
        data: {
            fullname: $("#fullname").val(),
            email: $("#email").val(),
            contactReason: $("#contactReason").val(),
            topic: $("#topic").val(),
            details: $("#details").val()
        },
        success: function(response) {
            // Handle success
        },
        error: function(xhr, status, error) {
            // Handle error
        }
    });
    return false;
});