let isFlipped = false;
const tiltStrength = 20; // Adjust tilt strength here
const card = document.querySelector('.card');
let direction = 1
let currentRotation = 0
function handleCardClick() {
    isFlipped = !isFlipped; 
    rotate(180)
}
function rotate(degrees) {
    currentRotation += degrees;
    card.style.transform = `rotateY(${currentRotation}deg)`;
  }
function handleCardSwipe(event) {
    startX = event.touches[0].clientX;

    function handleTouchEnd(event) {
        const endX = event.changedTouches[0].clientX;
        const deltaX = endX - startX;
        const threshold = card.offsetWidth / 3; // Adjust threshold as needed
        if (deltaX > threshold) {
        isFlipped = !isFlipped; // Toggle flip state on right swipe
        } else if (deltaX < -threshold) {
        isFlipped = !isFlipped; // Toggle flip state on left swipe
        }
        direction =  ((deltaX > threshold) ? 1 : -1)
        rotate(direction*180)

        card.removeEventListener('touchend', handleTouchEnd);
    }
    card.addEventListener('touchend', handleTouchEnd);
}
// Add event listeners for both mouse and touch events
document.querySelector('.card-container').addEventListener('click', handleCardClick);
document.querySelector('.card-container').addEventListener('touchstart', handleCardSwipe);
  
  
if (false && window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (event) => {
    const tiltXDevice = event.gamma;
    const tiltYDevice = event.beta;
    const tiltXFactor = 0.05 * tiltStrength;
    const tiltYFactor = 0.05 * tiltStrength;

    const card = document.querySelector('.card');
    card.style.transform = `rotateY(${currentRotation}deg) rotateX(${tiltYDevice * tiltYFactor}deg) rotateY(${tiltXDevice * tiltXFactor}deg)`;
  });
} else {      
      document.querySelector('body').addEventListener('mousemove', (event) => {
        const card = document.querySelector('.card');
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
      
        const tiltXMouse = (x / rect.width) * tiltStrength; 
        const tiltYMouse = (y / rect.height) * -tiltStrength; 
      
        card.style.transform = `rotateY(${currentRotation}deg) rotateX(${tiltYMouse}deg) rotateY(${tiltXMouse}deg)`;
      });
}