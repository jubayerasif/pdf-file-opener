document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("videoPlayer");
  const speedSelect = document.getElementById("speed");
  const fileInput = document.getElementById("fileInput");
  const fileLabel = document.querySelector(".fileLabel");
  const noVideoLabel = document.querySelector(".no-video-label");

  // Function to load and play video
  function loadVideo(file) {
    if (file) {
      const videoUrl = URL.createObjectURL(file);

      videoPlayer.src = videoUrl;

      // Attempt to play the video
      const playPromise = videoPlayer.play();

      // Listen for loadeddata event
      videoPlayer.addEventListener("loadeddata", function () {
        // Video data is loaded, attempt to play
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video is successfully playing
              noVideoLabel.style.display = "none";
            })
            .catch((error) => {
              // Video playback failed
              console.error("Video playback failed:", error);
              noVideoLabel.style.display = "block";
            });
        }
      });
    } else {
      // If no file selected, show the "No Video" label
      noVideoLabel.style.display = "block";
    }
  }

  // Handle file label click to trigger file input click
  fileLabel.addEventListener("click", function () {
    fileInput.click();
  });

  // Handle file input change event
  fileInput.addEventListener("change", function () {
    const selectedFile = fileInput.files[0];

    // Reset file input value to allow selecting the same file again
    fileInput.value = null;

    // Load video after a short delay
    setTimeout(function () {
      loadVideo(selectedFile);
    }, 100);
  });

  // Handle speed change event
  speedSelect.addEventListener("change", function () {
    videoPlayer.playbackRate = parseFloat(speedSelect.value);
  });
});
