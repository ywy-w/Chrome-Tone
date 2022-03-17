// function hashCode(string, size) {
//   let hash = 0;
//   if (string.length == 0) return hash;
//   for (let i = 0; i < string.length; i++) {
//     const letter = string.charCodeAt(i);
//     hash = ((hash << 5) - hash) + letter;
//     hash = hash & hash; // Convert to 32bit integer
//   }
//   return Math.abs(hash) % size;
// }

// const words = ['This', 'example', 'shows', 'how', 'an', 'extension', 'can', 'toggle', 'the', 'muted', 'state', 'for', 'a', 'given', 'tab']

// for (let word of words) {
//   let note = hashCode(word, 5)
let music = new Audio({
  loop: false,
  volume: 1,
  autoplay: true,
  src: [`/piano_samples/${note}.mp3`]
})
music.play()
  // setTimeout(() => { }, 1000)
// }
