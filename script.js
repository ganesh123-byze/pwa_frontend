document.getElementById("submit-btn").addEventListener("click", async function (event) {
    event.preventDefault();
    let responseContainer = document.getElementById("response-container");

    let textInput = document.getElementById("text-input");
    let voiceInput = document.getElementById("voice-input");
    let youtubeInput = document.getElementById("youtube-url");

    let text = textInput.value.trim();
    let voiceFile = voiceInput.files[0];
    let youtubeURL = youtubeInput.value.trim();

    if (!text && !voiceFile && !youtubeURL) {
        responseContainer.innerHTML = "<p style='color: red;'>❌ Enter text, upload a voice file, or enter a YouTube URL.</p>";
        return;
    }

    let formData = new FormData();
    if (text) formData.append("text", text);
    if (voiceFile) formData.append("voice_file", voiceFile);
    if (youtubeURL) formData.append("youtube_url", youtubeURL);

    // ✅ Show loading text
    responseContainer.innerHTML = "<p style='color: blue;'>⏳ Processing request...</p>";

    try {
        let response = await fetch("https://pwa-backend-1bin.onrender.com/analyze", {  // ✅ Using Render Backend
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        let data = await response.json();
        console.log("🔹 Backend Response:", data);
        responseContainer.innerHTML = `<p style="color: green;">✅ Response: ${data.message}</p>`;

        // ✅ Clear input fields after successful submission
        textInput.value = "";
        voiceInput.value = "";
        youtubeInput.value = "";

    } catch (error) {
        console.error("❌ Fetch Error:", error);
        responseContainer.innerHTML = `<p style='color: red;'>❌ Failed to connect: ${error.message}</p>`;
    }
});
