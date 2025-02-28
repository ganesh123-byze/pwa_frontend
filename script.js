document.getElementById("submit-btn").addEventListener("click", async function () {
    let text = document.getElementById("text-input").value.trim();
    let voiceFile = document.getElementById("voice-input").files[0];
    let youtubeUrl = document.getElementById("youtube-url").value.trim();
    let fileUpload = document.getElementById("file-upload").files[0];

    if (!text && !youtubeUrl && !voiceFile && !fileUpload) {
        alert("Please enter text, record/upload a voice file, or provide a YouTube URL!");
        return;
    }

    console.log("Text:", text || "No text entered");
    console.log("YouTube URL:", youtubeUrl || "No URL provided");
    console.log("Voice File:", voiceFile ? voiceFile.name : "No file uploaded");
    console.log("Large File:", fileUpload ? fileUpload.name : "No file uploaded");

    // 🔹 Send text input to local FastAPI backend
    if (text) {
        try {
           let response = await fetch("http://127.0.0.1:8080/analyze", {  // ✅ Use new port 8080
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text })
});


            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            let data = await response.json();
            alert(`Result: ${data.label} (Confidence: ${data.score.toFixed(2)})`);

            // ✅ Clear input fields after successful response
            document.getElementById("text-input").value = "";
            document.getElementById("voice-input").value = "";
            document.getElementById("youtube-url").value = "";
            document.getElementById("file-upload").value = "";
        } catch (error) {
            console.error("Error connecting to backend:", error);
            alert("Failed to analyze text. Ensure your backend is running.");
        }
    } else {
        alert("Please enter some text to analyze.");
    }
});
