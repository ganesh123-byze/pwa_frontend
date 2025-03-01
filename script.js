const BACKEND_URL = "https://cce8-2401-4900-4fbe-320b-8d2-a21e-aadf-bac9.ngrok-free.app";  // Your ngrok URL

document.getElementById("submit-btn").addEventListener("click", async function () {
    let text = document.getElementById("text-input").value.trim();
    let youtubeUrl = document.getElementById("youtube-url").value.trim();

    if (!text && !youtubeUrl) {
        alert("Please enter text or a YouTube URL.");
        return;
    }

    let payload = { text: text || null, youtube_url: youtubeUrl || null };

    console.log("🚀 Sending data to backend:", payload);

    try {
        let response = await fetch(`${BACKEND_URL}/receive`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        let data = await response.json();
        console.log("🎯 Backend Response:", data);
        alert(`Backend Response: ${data.message}`);
    } catch (error) {
        console.error("❌ Error connecting to backend:", error);
        alert("Failed to send data. Ensure your backend is running.");
    }
});
