const BACKEND_URL = "https://c5ec-2401-4900-4fee-3dfe-943a-2b25-c1a6-cb9a.ngrok-free.app";  // Updated ngrok URL

document.getElementById("submit-btn").addEventListener("click", async function () {
    let text = document.getElementById("text-input").value.trim();
    let youtubeUrl = document.getElementById("youtube-url").value.trim();
    let voiceFile = document.getElementById("voice-input")?.files[0];
    let largeFile = document.getElementById("file-upload")?.files[0];

    if (!text && !youtubeUrl && !voiceFile && !largeFile) {
        alert("Please enter text, upload a file, or provide a YouTube URL.");
        return;
    }

    let formData = new FormData();
    if (text) formData.append("text", text);
    if (youtubeUrl) formData.append("youtube_url", youtubeUrl);
    if (voiceFile) formData.append("voice_file", voiceFile);
    if (largeFile) formData.append("large_file", largeFile);

    console.log("🚀 Sending data to backend:", formData);

    try {
        let response = await fetch(`${BACKEND_URL}/receive`, {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        console.log("🎯 Backend Response:", data);
        alert(`Backend Response: ${data.message}`);
    } catch (error) {
        console.error("❌ Error connecting to backend:", error);
        alert("Failed to send data. Ensure your backend is running.");
    }
});
