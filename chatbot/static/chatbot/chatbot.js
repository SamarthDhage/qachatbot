
function getCSRFToken() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "csrftoken") return value;
    }
    return null;
}

function appendMessage(role, text) {
    const formattedText = role === "gemini" ? `<pre>${text.trim()}</pre>` : text;
    const messageCard = `<div class="message-card ${role}">${formattedText}</div>`;
    $("#chat-container").append(messageCard);
    $("#chat-container").scrollTop($("#chat-container")[0].scrollHeight); 
}


function sendMessage() {
    const message = $("#user-input").val().trim();
    if (message) {
        appendMessage("user", message); 
        $("#user-input").val(""); 
        $.ajax({
            url: "", 
            type: "POST",
            data: { message: message },
            headers: { "X-CSRFToken": getCSRFToken() },
            success: function(data) {
                appendMessage("gemini", data.response); 
            },
            error: function(err) {
                appendMessage("gemini", "Error: " + err.responseJSON.error); 
            },
        });
    }
}


$("#send-btn").click(function() {
    sendMessage();
});


$("#user-input").keypress(function(e) {
    if (e.which === 13) {
        $("#send-btn").click();
    }
});
