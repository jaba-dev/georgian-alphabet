const alphabetContainer = document.querySelector(".alphabet-carousel-content");
const prevBtn = document.querySelector(".prev-button");
const nextBtn = document.querySelector(".next-button");
let carouselTrack;
let slides;

function renderAlphabet() {
  georgianLetters.forEach((item, index) => {
    let options = ""; // Create an empty string to store options
    item.words.forEach((wrd) => {
      options += `<option>${wrd.word}</option>`; // Add each word as an option
    });

    alphabetContainer.innerHTML += `
 <div class="slide">
 <div class="slide-content">
 <h2>Letter: ${item.letter}</h2>
  <div class="slide-words">
 <select id="${index}" onchange="changeTranslationAndAudio(event)">
 ${options}
 </select>
 <audio controls >
 <source src="${item.words[0].audioUrl}" type="audio/mp4" />
 </audio>
 <p>${item.translations[index]}</p>
 </div>
</div>
 </div>
 
 `;
  });
  carouselTrack = document.querySelector(".alphabet-carousel-content");
  slides = document.querySelectorAll(".slide");
  startCarousel();
}

renderAlphabet();

function changeTranslationAndAudio(event) {
  let currentWordIndex = Number(event.target.id);
  let currentOptionIndex = georgianLetters[currentWordIndex].words.findIndex(
    (wrd) => wrd.word === event.target.value
  );

  // Create an audio element
  const audioElement = document.createElement("audio");
  audioElement.controls = true; // Enable controls for the audio player

  // Create a source element and set its src attribute
  const sourceElement = document.createElement("source");
  sourceElement.src =
    georgianLetters[currentWordIndex].words[currentOptionIndex].audioUrl;
  console.log(sourceElement);
  // Append the source element to the audio element
  audioElement.appendChild(sourceElement);
  console.log(audioElement);

  // remove old audio
  event.target.nextElementSibling.remove();
  // Insert the audio element after the target element
  event.target.after(audioElement);
  let wordTranslationElement =
    event.target.nextElementSibling.nextElementSibling;

  wordTranslationElement.innerText =
    georgianLetters[currentWordIndex].translations[currentOptionIndex];
}

function startCarousel() {
  let currentIndex = 0;
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  function showSlide(index) {
    const totalSlides = slides.length;

    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = index;
    }

    let transformValue = "translateX(" + -currentIndex * 100 + "%)";
    carouselTrack.style.transform = transformValue;
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }
}
