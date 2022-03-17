document.addEventListener('DOMContentLoaded', () => {
  // using closure to save the note location before playback
  function saveNote(note) {    
    function playNote() {
      console.log('playing note:', note) 
      let music = new Audio(`piano_samples/${note}.mp3`)
      music.loop = false
      music.playbackRate = 4
      music.autoplay = false
      music.play()
    }
    return playNote
  }

  // turns strings to random but consistent integers
  function hashCode(string, size) {
    let hash = 0;
    if (string.length == 0) return hash;
    for (let i = 0; i < string.length; i++) {
      const letter = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + letter;
      hash = hash & hash; // Convert to 32bit integer
    }
    return (Math.abs(hash) % size) + 1;
  }

  // get two random tab URLs
  chrome.tabs.query({active: false, currentWindow: false}, function(tabs) {
    console.log(tabs)
  })

  // regex the first URL into a list of 'words'
  const words = ['This', 'example', 'shows', 'how', 'an', 'extension', 'can', 'toggle', 'the', 'muted', 'state', 'for', 'a', 'given', 'tab']

  // regex the second URL into a list of 'times'
  const times = ['is', 'an', 'asynchronous', 'function', 'meaning', 'that', 'the', 'timer', 'function', 'will', 'not', 'pause', 'execution', 'of', 'other']

  // pass the words through the hash maker, setting size to the number of audio files available to be played
  const noteList = words.map(el => hashCode(el, 5))

  const timeList = times.map(el => hashCode(el, 4))
  console.log(noteList)
  console.log(timeList)

  // add listener to play button in index.html
  let playBtn = document.querySelector('#play')
  playBtn.addEventListener('click', () => {
    let wait = 0
    console.log('entering loop')
    for (let word of words) {
      let note = noteList.pop()
      console.log(word, note)
      setTimeout(saveNote(note), wait)
      wait += 1000
    }
    console.log('exiting loop')
    return;
  });
  
});