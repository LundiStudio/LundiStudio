document.addEventListener("DOMContentLoaded", function () {
    const imageContainer = document.querySelector(".image-container img");
    const captionElement = document.querySelector(".image-caption"); 

    const images = [
        { src: "Images/1.png", caption: "In Conversation, printed publication" },
        { src: "Images/2.png", caption: "Branches, type design", downloadLink: "https://drive.google.com/file/d/1_DLFD2UaCp5bMRvC0-Z5xjwu2tuHVUoE/view?usp=sharing" },
        { src: "Images/3.png", caption: "The Big Issue, brand refresh" },
        { src: "Images/4.png", caption: "The Weather Room, interactive installation" },
        { src: "Images/5.gif", caption: "The Big Issue, custom typeface" },
        { src: "Images/6.jpg", caption: "Brunswick Grotesque, type specimen" },
        { src: "Images/7.png", caption: "A dystopian future, conceptual 3D" },
        { src: "Images/8.png", caption: "The Big Issue, brand refresh" },
        { src: "Images/9.png", caption: "Take It Slow, art installation" },
        { src: "Images/10.png", caption: "Keelan Mak’s Boy’s In Love, EP graphics" },
        { src: "Images/11.png", caption: "A dystopian future, conceptual 3D" },
        { src: "Images/12.jpg", caption: "Brunswick Grotesque, type specimen" },
        { src: "Images/13.png", caption: "In Conversation, printed publication" },
        { src: "Images/14.png", caption: "#Surveillancecore pt.1, interactive installation" },
        { src: "Images/15.png", caption: "Take It Slow, poster design" },
    ];
    
    let currentIndex = 0;

    // Preload the next image
    const preloadImage = (src) => {
        const img = new Image();
        img.src = src;
    };

    // Function to update the image and caption with only the caption transitioning
    function updateImage() {
        // Start fading out the caption (but not the image)
        captionElement.style.opacity = 0;

        // Preload the next image to reduce lag
        preloadImage(images[currentIndex].src);

        setTimeout(() => {
            // After fading out, update the image and caption
            imageContainer.src = images[currentIndex].src;
            captionElement.textContent = images[currentIndex].caption;

            // Fade the caption back in
            captionElement.style.opacity = 1;
        }, 250); // Ensure this is long enough for the fade-out effect of the caption
    }

    // Handle click event for navigation
    document.addEventListener("click", function (e) {
        const screenWidth = window.innerWidth;
        const cursorPosition = e.clientX;

        if (cursorPosition < screenWidth / 2) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        } else {
            currentIndex = (currentIndex + 1) % images.length;
        }

        updateImage();
    });

    // Set initial image and caption
    updateImage();

    // Cursor change on movement
    document.addEventListener("mousemove", function (e) {
        const screenWidth = window.innerWidth;
        const cursorPosition = e.clientX;

        // Check the position of the mouse and change the cursor style
        if (cursorPosition < screenWidth / 2) {
            document.body.style.cursor = "w-resize"; // Left arrow cursor
        } else {
            document.body.style.cursor = "e-resize"; // Right arrow cursor
        }
    });
});





// Sparkle Effect On Information and Contact page relative to paragraph <p> tag

document.addEventListener("DOMContentLoaded", () => {
    const pageKey = window.location.pathname; // Unique key per page based on URL

    function applySparkleAnimation(element, callback, storageKey) {
        let nodes = Array.from(element.childNodes);
        element.innerHTML = "";

        let totalDuration = 0;

        nodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE || node.nodeName === "A") {
                let text = node.nodeType === Node.TEXT_NODE ? node.textContent : node.innerText;
                let parentTag = node.nodeName === "A" ? node.cloneNode(false) : null;

                let container = parentTag || document.createElement("span");

                text.split("").forEach((char, index) => {
                    let span = document.createElement("span");
                    span.textContent = char;
                    span.style.opacity = "0";
                    span.style.animation = `sparkle 1s ease-in-out ${totalDuration + index * 0.042}s forwards`;
                    container.appendChild(span);
                });

                totalDuration += text.length * 0.05;
                element.appendChild(container);
            }
        });

        setTimeout(() => {
            sessionStorage.setItem(storageKey, "completed");
            callback();
        }, totalDuration * 1000 + 500);
    }

    let paragraphs = document.querySelectorAll("body > p");

    const pageCompletedKey = `sparkle-${pageKey}`; // Unique storage key for each page

    // Hide all paragraphs initially
    paragraphs.forEach(p => {
        p.style.opacity = "0"; // Hide all paragraphs initially
    });

    // Check if the page's sparkle animation is already completed
    if (!sessionStorage.getItem(pageCompletedKey)) {
        // If not, start sparkle animation for each paragraph
        let revealNextParagraph = (index) => {
            if (index < paragraphs.length) {
                paragraphs[index].style.opacity = "1"; // Reveal current paragraph
                applySparkleAnimation(paragraphs[index], () => {
                    // Continue to next paragraph after the current one is done
                    revealNextParagraph(index + 1);
                }, `${pageCompletedKey}-p${index + 1}`);
            } else {
                // Once all paragraphs have been revealed, mark the animation as complete
                sessionStorage.setItem(pageCompletedKey, "completed");
            }
        };

        // Start with the first paragraph
        revealNextParagraph(0);
    } else {
        // If the sparkle animation is completed, just show all paragraphs
        paragraphs.forEach(p => p.style.opacity = "1");
    }
});

















// <!-- GIF ANIMATION BEFORE ENTERING INDEX.HTML -->

// List of available GIFs
const gifOptions = [
    "LoadingPage/2.1.gif",
    "LoadingPage/2.2.gif",
    "LoadingPage/2.3.gif" // Added third GIF
];

// Randomly select a GIF
const selectedGif = gifOptions[Math.floor(Math.random() * gifOptions.length)];
document.getElementById("loadingGif").src = selectedGif;

// Check if the GIF has been hidden during the session using sessionStorage
if (sessionStorage.getItem('gifHidden') === 'true') {
    document.getElementById('loading-video-container').style.display = 'none';
}

// Function to hide the GIF and overlay on click
function hideVideo(event) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the overlay
    const gif = document.getElementById('loadingGif');
    const overlay = document.getElementById('overlay');
    const container = document.getElementById('loading-video-container');
    
    gif.style.display = 'none'; // Hide the GIF
    overlay.style.display = 'none'; // Hide the overlay
    container.style.display = 'none'; // Hide the container itself

    sessionStorage.setItem('gifHidden', 'true');
}






