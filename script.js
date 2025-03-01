const BACKEND_URL = "http://localhost:8000";  // Change to your backend URL when deployed

document.getElementById("submit-btn").addEventListener("click", async function () {
    let text = document.getElementById("text-input").value.trim();
    let youtubeUrl = document.getElementById("youtube-url").value.trim();
    
    if (!text && !youtubeUrl) {
        alert("Please enter text or a YouTube URL.");
        return;
    }

    let payload = { text: text || null, youtube_url: youtubeUrl || null };

    console.log("🚀 Sending data to backend:", payload);  // Log request in frontend

    try {
        let response = await fetch(`${BACKEND_URL}/receive`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        let data = await response.json();
        console.log("🎯 Backend Response:", data);  // Log response in frontend
        alert(`Backend Response: ${data.message}`);
    } catch (error) {
        console.error("❌ Error connecting to backend:", error);
        alert("Failed to send data. Ensure your backend is running.");
    }
});
