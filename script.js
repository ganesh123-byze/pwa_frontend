document.getElementById("submit-btn").addEventListener("click", async function (event) {
    event.preventDefault();
    let responseContainer = document.getElementById("response-container");

    let text = document.getElementById("text-input").value.trim();
    let voiceFile = document.getElementById("voice-input").files[0];
    let youtubeURL = document.getElementById("youtube-url").value.trim();

    if (!text && !voiceFile && !youtubeURL) {
        responseContainer.innerHTML = "<p style='color: red;'>❌ Enter text, upload a voice file, or enter a YouTube URL.</p>";
        return;
    }

    let formData = new FormData();
    if (text) formData.append("text", text);
    if (voiceFile) formData.append("voice_file", voiceFile);
    if (youtubeURL) formData.append("youtube_url", youtubeURL);

    // ✅ Show loading text while waiting for response
    responseContainer.innerHTML = "<p style='color: blue;'>⏳ Processing request...</p>";

    try {
        let response = await fetch("https://pwa-backend-1bin.onrender.com/analyze", {
            method: "POST",
            body: formData  
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        let data = await response.json();
        console.log("🔹 Backend Response:", data); // ✅ Debugging
        responseContainer.innerHTML = `<p style="color: green;">✅ Response: ${data.message}</p>`;
    } catch (error) {
        console.error("❌ Fetch Error:", error);
        responseContainer.innerHTML = `<p style='color: red;'>❌ Failed to connect: ${error.message}</p>`;
    }
});
