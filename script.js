document.getElementById("submit-btn").addEventListener("click", async function () {
    let text = document.getElementById("text-input").value.trim();
    let voiceFile = document.getElementById("voice-input")?.files[0];
    let youtubeUrl = document.getElementById("youtube-url").value.trim();
    let fileUpload = document.getElementById("file-upload")?.files[0];

    // Validate inputs
    if (!text && !youtubeUrl && !voiceFile && !fileUpload) {
        alert("Please enter text, record/upload a voice file, or provide a YouTube URL!");
        return;
    }

    console.log("Text:", text || "No text entered");
    console.log("YouTube URL:", youtubeUrl || "No URL provided");
    console.log("Voice File:", voiceFile ? voiceFile.name : "No file uploaded");
    console.log("Large File:", fileUpload ? fileUpload.name : "No file uploaded");

    try {
        let response = await fetch("http://localhost:8000/analyze", {  // Ensure this URL matches your backend
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error("Failed to analyze text. Ensure your backend is running.");
        }

        let data = await response.json();
        alert(`Result: ${data.label} (Confidence: ${data.score.toFixed(2)})`);
    } catch (error) {
        console.error("Error connecting to backend:", error);
        alert("Failed to analyze text. Ensure your backend is running.");
    }
});

// 🎤 Microphone Recording Feature
let micBtn = document.getElementById("mic-btn");
let micIcon = document.getElementById("mic-icon");
let recordStatus = document.getElementById("record-status");
let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let audioBlob = null; // Store recorded audio

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    micBtn.addEventListener("click", async () => {
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    async function startRecording() {
        try {
            let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: "audio/wav" });
                console.log("Recorded Audio:", audioBlob);
                alert("Voice recorded successfully!");
            };

            mediaRecorder.start();
            isRecording = true;
            micBtn.classList.add("recording");
            micIcon.src = "mic-recording.png"; // Change icon to recording state
            recordStatus.innerText = "Recording...";
        } catch (error) {
            console.error("Microphone access denied:", error);
            alert("Please allow microphone access to record.");
        }
    }

    function stopRecording() {
        mediaRecorder.stop();
        isRecording = false;
        micBtn.classList.remove("recording");
        micIcon.src = "mic-icon.png"; // Change back to normal icon
        recordStatus.innerText = "Press mic to record";
    }
} else {
    alert("Your browser does not support voice recording.");
}
