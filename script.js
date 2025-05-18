// Link the external CSS file
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "lala.css";
document.head.appendChild(link);

// Set up the body styles for a fully black website
document.body.style.margin = "0";
document.body.style.padding = "0";
document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.background = "#000"; // Set background to black
document.body.style.color = "#fff";      // Keep text white for contrast

// Create the login modal
const loginModal = document.createElement("div");
loginModal.id = "loginModal";
loginModal.style.position = "fixed";
loginModal.style.top = "0";
loginModal.style.left = "0";
loginModal.style.width = "100%";
loginModal.style.height = "100%";
loginModal.style.background = "rgba(0, 0, 0, 0.9)";
loginModal.style.display = "flex";
loginModal.style.justifyContent = "center";
loginModal.style.alignItems = "center";
loginModal.style.zIndex = "1000";

// Modal content
const modalContent = document.createElement("div");
modalContent.style.background = "#1e1e1e";
modalContent.style.color = "#fff";
modalContent.style.padding = "20px";
modalContent.style.borderRadius = "12px";
modalContent.style.textAlign = "center";
modalContent.style.width = "300px";
modalContent.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";

// Modal title
const modalTitle = document.createElement("h2");
modalTitle.innerText = "Login";
modalContent.appendChild(modalTitle);

// Input field
const mobileInput = document.createElement("input");
mobileInput.type = "text";
mobileInput.id = "mobile";
mobileInput.placeholder = "Enter Mobile Number";
mobileInput.required = true;
mobileInput.style.width = "90%";
mobileInput.style.padding = "10px";
mobileInput.style.margin = "10px 0";
mobileInput.style.border = "1px solid #ff0000"; // Red
mobileInput.style.borderRadius = "5px";
mobileInput.style.fontSize = "1em";
mobileInput.style.background = "#000";
mobileInput.style.color = "#fff";
modalContent.appendChild(mobileInput);

// Login button
const loginButton = document.createElement("button");
loginButton.innerText = "Login";
loginButton.style.background = "#ff0000"; // Red
loginButton.style.color = "#fff";
loginButton.style.border = "none";
loginButton.style.padding = "10px 20px";
loginButton.style.borderRadius = "5px";
loginButton.style.cursor = "pointer";
loginButton.style.fontSize = "1em";
loginButton.style.marginTop = "10px";
loginButton.addEventListener("click", login);
modalContent.appendChild(loginButton);

loginModal.appendChild(modalContent);
document.body.appendChild(loginModal);

// Create the header
const header = document.createElement("header");
header.style.backgroundColor = "#ff0000"; // Red
header.style.padding = "20px";
header.style.textAlign = "center";
header.style.position = "sticky";
header.style.top = "0";
header.style.zIndex = "1000";
header.innerHTML = `<h1 style="margin: 0; font-size: 2em;">ANSH MUSIC</h1>`; // Updated title
document.body.appendChild(header);

// Create the navigation bar
const nav = document.createElement("nav");
nav.style.display = "flex";
nav.style.justifyContent = "center";
nav.style.backgroundColor = "#1e1e1e";
nav.style.padding = "10px 0";
nav.style.position = "sticky";
nav.style.top = "0";
nav.style.zIndex = "999";
["Home", "About", "Contact", "Playlist"].forEach((item) => {
    const navLink = document.createElement("a");
    navLink.href = `#${item.toLowerCase()}`;
    navLink.innerText = item;
    navLink.style.color = "#fff";
    navLink.style.textDecoration = "none";
    navLink.style.margin = "0 15px";
    navLink.style.fontSize = "1.2em";
    navLink.style.cursor = "pointer";
    navLink.addEventListener("mouseover", () => (navLink.style.color = "#ff0000")); // Red hover
    navLink.addEventListener("mouseout", () => (navLink.style.color = "#fff"));
    navLink.addEventListener("click", () => openPage(item));
    nav.appendChild(navLink);
});
document.body.appendChild(nav);

// Create the search bar
const searchBarContainer = document.createElement("div");
searchBarContainer.style.textAlign = "center";
searchBarContainer.style.margin = "20px";
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "Search for songs or artists...";
searchBar.style.width = "80%";
searchBar.style.padding = "10px";
searchBar.style.fontSize = "1em";
searchBar.style.border = "1px solid #ff0000"; // Red border
searchBar.style.borderRadius = "5px";
searchBar.style.background = "#000";
searchBar.style.color = "#fff";
searchBarContainer.appendChild(searchBar);
document.body.appendChild(searchBarContainer);

// Create the main content container
const mainContent = document.createElement("div");
mainContent.style.padding = "20px";
mainContent.style.display = "none"; // Hidden until login
document.body.appendChild(mainContent);

// Create the playlist section
const playlistSection = document.createElement("section");
playlistSection.style.marginBottom = "20px";
playlistSection.innerHTML = `<h2 style="color: #ff0000;">Your Playlist</h2>`; // Red
const playlistContainer = document.createElement("div");
playlistContainer.style.marginTop = "20px";
playlistContainer.style.padding = "10px";
playlistContainer.style.background = "#1e1e1e";
playlistContainer.style.borderRadius = "10px";
playlistContainer.style.color = "#fff";
playlistSection.appendChild(playlistContainer);
mainContent.appendChild(playlistSection);

// Create the upload section
const uploadSection = document.createElement("section");
uploadSection.style.margin = "20px";
uploadSection.style.padding = "20px";
uploadSection.style.border = "2px dashed #ff0000"; // Red border
uploadSection.style.borderRadius = "10px";
uploadSection.style.textAlign = "center";
uploadSection.style.background = "#1e1e1e";
uploadSection.innerHTML = `
    <h2 style="color: #ff0000;">Upload Your Songs</h2>
    <p style="color: #fff;">Drag and drop your audio files here or click to upload (Max: 1000 songs)</p>
    <input type="file" id="fileInput" multiple accept="audio/*" style="display: none;">
    <button id="uploadButton" style="
        background: #ff0000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
    ">Upload Songs</button>
    <div id="uploadedSongs" style="margin-top: 20px; color: #fff;"></div>
`;
mainContent.appendChild(uploadSection);

// Handle file uploads
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const uploadedSongs = document.getElementById("uploadedSongs");

// --- Fixes for uploaded songs persistence, duplicate variable, and UI errors ---

// Retrieve saved songs from localStorage or initialize as empty array
let uploadedFiles = JSON.parse(localStorage.getItem("uploadedSongs")) || [];

// Display uploaded songs on page load
displayUploadedSongs();

// Handle file uploads
fileInput.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);

    // Validate file type and limit
    const validFiles = files.filter((file) => file.type.startsWith("audio/"));
    if (uploadedFiles.length + validFiles.length > 1000) {
        alert("You can only upload up to 1000 songs.");
        return;
    }

    // Save uploaded files to localStorage as base64 (for persistence)
    validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedFiles.push({ name: file.name, url: e.target.result });
            localStorage.setItem("uploadedSongs", JSON.stringify(uploadedFiles));
            displayUploadedSongs();
        };
        reader.readAsDataURL(file);
    });
});

// Drag-and-drop functionality for uploads
uploadSection.addEventListener("dragover", (event) => {
    event.preventDefault();
    uploadSection.style.borderColor = "#fff";
});

uploadSection.addEventListener("dragleave", () => {
    uploadSection.style.borderColor = "#ff0000";
});

uploadSection.addEventListener("drop", (event) => {
    event.preventDefault();
    uploadSection.style.borderColor = "#ff0000";

    const files = Array.from(event.dataTransfer.files);

    // Validate file type and limit
    const validFiles = files.filter((file) => file.type.startsWith("audio/"));
    if (uploadedFiles.length + validFiles.length > 1000) {
        alert("You can only upload up to 1000 songs.");
        return;
    }

    validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedFiles.push({ name: file.name, url: e.target.result });
            localStorage.setItem("uploadedSongs", JSON.stringify(uploadedFiles));
            displayUploadedSongs();
        };
        reader.readAsDataURL(file);
    });
});

// Display uploaded songs with play, pause, and stop functionality
function displayUploadedSongs() {
    uploadedSongs.innerHTML = `<h3>Uploaded Songs (${uploadedFiles.length})</h3>`;
    uploadedFiles.forEach((file, index) => {
        const songDiv = document.createElement("div");
        songDiv.style.margin = "10px 0";
        songDiv.style.padding = "10px";
        songDiv.style.border = "1px solid #ff0000";
        songDiv.style.borderRadius = "5px";
        songDiv.style.background = "#000";

        // Add song name
        const songName = document.createElement("p");
        songName.innerHTML = `<strong>${index + 1}. ${file.name}</strong>`;
        songDiv.appendChild(songName);

        // Add audio player
        const audioPlayer = document.createElement("audio");
        audioPlayer.controls = true;
        audioPlayer.style.width = "100%";
        const source = document.createElement("source");
        source.src = file.url;
        source.type = "audio/mpeg";
        audioPlayer.appendChild(source);

        // Add control buttons
        const controlsDiv = document.createElement("div");
        controlsDiv.style.marginTop = "10px";

        const playButton = document.createElement("button");
        playButton.innerText = "Play";
        playButton.style.marginRight = "10px";
        playButton.style.background = "#ff0000";
        playButton.style.color = "#fff";
        playButton.style.border = "none";
        playButton.style.padding = "5px 10px";
        playButton.style.borderRadius = "5px";
        playButton.style.cursor = "pointer";
        playButton.addEventListener("click", () => {
            audioPlayer.play();
        });

        const pauseButton = document.createElement("button");
        pauseButton.innerText = "Pause";
        pauseButton.style.marginRight = "10px";
        pauseButton.style.background = "#ff0000";
        pauseButton.style.color = "#fff";
        pauseButton.style.border = "none";
        pauseButton.style.padding = "5px 10px";
        pauseButton.style.borderRadius = "5px";
        pauseButton.style.cursor = "pointer";
        pauseButton.addEventListener("click", () => {
            audioPlayer.pause();
        });

        const stopButton = document.createElement("button");
        stopButton.innerText = "Stop";
        stopButton.style.background = "#ff0000";
        stopButton.style.color = "#fff";
        stopButton.style.border = "none";
        stopButton.style.padding = "5px 10px";
        stopButton.style.borderRadius = "5px";
        stopButton.style.cursor = "pointer";
        stopButton.addEventListener("click", () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0; // Reset playback to the beginning
        });

        controlsDiv.appendChild(playButton);
        controlsDiv.appendChild(pauseButton);
        controlsDiv.appendChild(stopButton);

        songDiv.appendChild(audioPlayer);
        songDiv.appendChild(controlsDiv);
        uploadedSongs.appendChild(songDiv);
    });
}

// Create the music player
const musicPlayer = document.createElement("div");
musicPlayer.style.position = "fixed";
musicPlayer.style.bottom = "0";
musicPlayer.style.width = "100%";
musicPlayer.style.background = "#000";
musicPlayer.style.color = "#fff";
musicPlayer.style.display = "flex";
musicPlayer.style.justifyContent = "space-between";
musicPlayer.style.alignItems = "center";
musicPlayer.style.padding = "10px 20px";
musicPlayer.style.boxShadow = "0 -2px 5px rgba(0, 0, 0, 0.5)";
musicPlayer.innerHTML = `
    <div id="currentSongInfo">No song playing</div>
    <div>
        <button id="prevButton">⏮️</button>
        <button id="playPauseButton">▶️</button>
        <button id="nextButton">⏭️</button>
    </div>
    <div>
        <label for="volumeControl">Volume:</label>
        <input type="range" id="volumeControl" min="0" max="100" value="50">
    </div>
`;
mainContent.appendChild(musicPlayer);

// Add circular media player
const mediaPlayerContainer = document.createElement("div");
mediaPlayerContainer.id = "mediaPlayerContainer";
mediaPlayerContainer.style.textAlign = "center";
mediaPlayerContainer.style.marginTop = "50px";
const songs = [
    { title: "Love Me Like You Do", artist: "ANSH", src: "Love Me Like You Do - Shreya Khanna.mp3" },
    { title: "Khudaya Khair", artist: "ANSH", src: "Khudaya Khair Billu Barber 128 Kbps.mp3" },
    { title: "sad song", artist: "ANSH", src: "Phir Bhi Aas Lagi Hai 2.0 Sagar Kalra 128 Kbps.mp3" },
    { title: "Raataan Lambiyan", artist:  "ANSH", src:"Raataan Lambiyan(MyMp3Song).mp3"},
    { title: "Channa Ve", artist: "ANSH", src: "Kyu Dikhe Mujhe Tu Sirhane Mere Mp3 Song - Dj Sarzen Mix - Copy.mp3"},
    { title: "Aaj ki Raat", artist: "ANSH", src: "128-Aaj Ki Raat - Stree 2 128 Kbps.mp3"},
    { title: "Mash-up 10 min",artist: "ANSH", src: "50 Songs-10 mins KuHu Gracia 1 Beat love Mashup(KoshalWorld.Com).mp3"},
    { title: "Aashiq Tera", artist: "ANSH", src: "128-Aashiq Tera - Happy Bhag Jayegi 128 Kbps.mp3"},
    { title: "Agar Ho Tum", artist: "ANSH", src: "128-Agar Ho Tum - Mr. And Mrs. Mahi 128 Kbps.mp3"},
    { title: "Are Are Are", artist: "ANSH", src:"128-Are Are Are - Makkhi 128 Kbps.mp3"},
    { title: "Dekha Ek Khawab", artist: "ANSH", src:"128-Dekha Ek Khwab Ii - Silsila 128 Kbps.mp3"},
    { title: "Girl I Need You", artist: "ANSH", src:"128-Girl I Need You - Baaghi 128 Kbps.mp3"},
    { title: "Heer Raanjhana", artist: "ANSH", src:"128-Heer Raanjhana - Bachchhan Paandey 128 Kbps.mp3"},
    { title: "Jab Tak", artist: "ANSH", src: "128-Jab Tak - M.S. Dhoni - The Untold Story 128 Kbps.mp3"},
    { title: "O Maahi", artist: "ANSH", src: "128-O Maahi - Dunki 128 Kbps - Copy.mp3"},
    { title: "Ranjhana", artist: "ANSH", src: "128-Raanjhan - Do Patti 128 Kbps.mp3"},
    { title: "Tere Bina", artist: "ANSH", src: "Tere_Bina.mp3"}
    
    // Add more songs as needed
];
mediaPlayerContainer.innerHTML = `
    <canvas id="circularMediaPlayer" width="300" height="300"></canvas>
    <div id="mediaControls" style="margin-top: 20px;">
        <button id="rewindButton" style="padding: 10px; margin: 5px;">⏪ Rewind</button>
        <button id="playPauseButton" style="padding: 10px; margin: 5px;">▶️ Play</button>
        <button id="fastForwardButton" style="padding: 10px; margin: 5px;">⏩ Fast Forward</button>
    </div>
`;
mainContent.appendChild(mediaPlayerContainer);

// Combine all songs and uploaded files
const allSongs = songs.concat(uploadedFiles.map(f => ({
    title: f.name,
    artist: "Uploaded",
    src: f.url
})));

// Render playlist
function renderPlaylist() {
    playlistContainer.innerHTML = `<h3>Playlist (${allSongs.length} Songs)</h3>`;
    allSongs.forEach((song, index) => {
        const songDiv = document.createElement("div");
        songDiv.style.margin = "10px 0";
        songDiv.style.padding = "10px";
        songDiv.style.border = "1px solid #ff0000";
        songDiv.style.borderRadius = "5px";
        songDiv.style.background = "#000";

        // Add song name and artist
        const songInfo = document.createElement("p");
        songInfo.innerHTML = `<strong>${index + 1}. ${song.title}</strong> - ${song.artist}`;
        songDiv.appendChild(songInfo);

        // Add audio player
        const audioPlayer = document.createElement("audio");
        audioPlayer.controls = true;
        audioPlayer.style.width = "100%";

        // Create a URL for the song
        const source = document.createElement("source");
        source.src = song.src;
        source.type = "audio/mpeg";
        audioPlayer.appendChild(source);

        // Add volume control
        const volumeControlDiv = document.createElement("div");
        volumeControlDiv.style.marginTop = "10px";

        const volumeLabel = document.createElement("label");
        volumeLabel.innerText = "Volume: ";
        volumeLabel.style.color = "#fff";
        volumeControlDiv.appendChild(volumeLabel);

        const volumeControl = document.createElement("input");
        volumeControl.type = "range";
        volumeControl.min = "0";
        volumeControl.max = "1";
        volumeControl.step = "0.1";
        volumeControl.value = "0.5"; // Default volume
        volumeControl.style.width = "100%";
        volumeControl.style.marginTop = "5px";
        volumeControl.addEventListener("input", () => {
            audioPlayer.volume = volumeControl.value;
            updateVolumeLabel(volumeControl.value, volumeLabel);
        });

        volumeControlDiv.appendChild(volumeControl);
        songDiv.appendChild(audioPlayer);
        songDiv.appendChild(volumeControlDiv);
        playlistContainer.appendChild(songDiv);
    });
}

// Update volume label based on range
function updateVolumeLabel(volume, label) {
    if (volume == 0) {
        label.innerText = "Volume: Muted";
    } else if (volume > 0 && volume <= 0.3) {
        label.innerText = "Volume: Low";
    } else if (volume > 0.3 && volume <= 0.7) {
        label.innerText = "Volume: Medium";
    } else {
        label.innerText = "Volume: High";
    }
}

// Call the function to render the playlist
renderPlaylist();

// Music player functionality
let currentSongIndex = 0;
const audio = new Audio();

function playSong(index) {
    currentSongIndex = index;
    audio.src = allSongs[currentSongIndex].src;
    audio.play();
    document.getElementById("currentSongInfo").innerText = `${allSongs[currentSongIndex].title} - ${allSongs[currentSongIndex].artist}`;
    document.getElementById("playPauseButton").innerText = "⏸️";
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById("playPauseButton").innerText = "⏸️";
    } else {
        audio.pause();
        document.getElementById("playPauseButton").innerText = "▶️";
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % allSongs.length;
    playSong(currentSongIndex);
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + allSongs.length) % allSongs.length;
    playSong(currentSongIndex);
}

// Event listeners
document.getElementById("playPauseButton").addEventListener("click", togglePlayPause);
document.getElementById("nextButton").addEventListener("click", playNextSong);
document.getElementById("prevButton").addEventListener("click", playPrevSong);
document.getElementById("volumeControl").addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
});

// Login functionality
function login() {
    const mobile = mobileInput.value;
    const mobileRegex = /^[0-9]{10}$/;
    if (mobileRegex.test(mobile)) {
        loginModal.style.display = "none";
        mainContent.style.display = "block";
    } else {
        alert("Please enter a valid 10-digit mobile number");
    }
}

// Open additional pages
function openPage(page) {
    alert(`Opening ${page} page...`);
}

// Search functionality
searchBar.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredSongs = allSongs.filter(
        (song) =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
    );
    playlistContainer.innerHTML = "";
    filteredSongs.forEach((song, index) => {
        const songCard = document.createElement("div");
        songCard.style.background = "#1e1e1e";
        songCard.style.padding = "10px";
        songCard.style.borderRadius = "5px";
        songCard.style.width = "200px";
        songCard.style.textAlign = "center";
        songCard.style.cursor = "pointer";
        songCard.innerHTML = `
            <p><strong>${song.title}</strong></p>
            <p>${song.artist}</p>
        `;
        songCard.addEventListener("click", () => playSong(index));
        playlistContainer.appendChild(songCard);
    });
});

// --- Contact Section with Animation and Developer Name ---

// Create the Contact section
const contactSection = document.createElement("section");
contactSection.id = "contact";
contactSection.style.margin = "40px auto";
contactSection.style.padding = "30px";
contactSection.style.maxWidth = "500px";
contactSection.style.background = "#000"; // <-- Set background to black
contactSection.style.borderRadius = "20px";
contactSection.style.boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.37)";
contactSection.style.color = "#fff";
contactSection.style.position = "relative";
contactSection.style.overflow = "hidden";
contactSection.style.animation = "contactFadeIn 1.2s cubic-bezier(.68,-0.55,.27,1.55)";

// Add keyframes for animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes contactFadeIn {
    0% {
        opacity: 0;
        transform: scale(0.7) rotateY(60deg);
        filter: blur(8px);
    }
    70% {
        opacity: 0.7;
        transform: scale(1.05) rotateY(-10deg);
        filter: blur(2px);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotateY(0deg);
        filter: blur(0);
    }
}
.contact-glow {
    position: absolute;
    top: -40px;
    left: -40px;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, #fff176 0%, #ff0000 80%, transparent 100%);
    opacity: 0.3;
    z-index: 0;
    animation: glowMove 3s infinite alternate;
}
@keyframes glowMove {
    0% { top: -40px; left: -40px; }
    100% { top: 20px; left: 60px; }
}
`;
document.head.appendChild(styleSheet);

// Add a glowing effect
const glowDiv = document.createElement("div");
glowDiv.className = "contact-glow";
contactSection.appendChild(glowDiv);

// Contact form HTML
contactSection.innerHTML += `
    <h2 style="color: #fff; text-align: center; letter-spacing: 2px; margin-bottom: 10px;">Contact Us</h2>
    <div style="text-align:center; margin-bottom: 18px; font-size:1.1em;">
        <span style="background:rgba(0,0,0,0.2); padding:6px 18px; border-radius:12px; display:inline-block;">
            Developer Name : <b>ANSH PANWAR</b>
        </span>
    </div>
    <form id="contactForm" style="max-width: 400px; margin: 0 auto; z-index:1; position:relative;">
        <div style="margin-bottom: 15px;">
            <label for="name" style="display: block; margin-bottom: 5px;">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required
                style="width: 100%; padding: 10px; border: 1px solid #fff; border-radius: 8px; background: #fff3; color: #fff;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="email" style="display: block; margin-bottom: 5px;">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required
                style="width: 100%; padding: 10px; border: 1px solid #fff; border-radius: 8px; background: #fff3; color: #fff;">
        </div>
        <div style="margin-bottom: 15px;">
            <label for="message" style="display: block; margin-bottom: 5px;">Message:</label>
            <textarea id="message" name="message" placeholder="Enter your message" required
                style="width: 100%; padding: 10px; border: 1px solid #fff; border-radius: 8px; background: #fff3; color: #fff; height: 90px;"></textarea>
        </div>
        <button type="submit" style="
            background: #fff;
            color: #ff0000;
            border: none;
            padding: 10px 30px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            box-shadow: 0 2px 8px #ff000055;
            transition: background 0.2s, color 0.2s;
        " onmouseover="this.style.background='#ff0000';this.style.color='#fff';"
          onmouseout="this.style.background='#fff';this.style.color='#ff0000';"
        >Submit</button>
    </form>
    <p id="contactResponse" style="text-align: center; margin-top: 15px; color: #0f0;"></p>
`;
document.body.appendChild(contactSection);

// Handle form submission
const contactForm = document.getElementById("contactForm");
const contactResponse = document.getElementById("contactResponse");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate form inputs
    if (!name || !email || !message) {
        contactResponse.style.color = "#fff176";
        contactResponse.innerText = "Please fill out all fields.";
        return;
    }

    // Simulate form submission
    contactResponse.style.color = "#fff";
    contactResponse.innerText = "Thank you for contacting us! We'll get back to you soon.";

    // Clear form fields
    contactForm.reset();

    // Animate the response
    contactResponse.style.opacity = "0";
    contactResponse.style.transition = "opacity 0.5s";
    setTimeout(() => {
        contactResponse.style.opacity = "1";
    }, 100);
});