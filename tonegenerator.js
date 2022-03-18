document.addEventListener('DOMContentLoaded', () => {
  const SAMPLES = 15; // change this number to the number of files in the samples folder
  const FILETYPE = '.wav'

  // generate random integer
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive 
  }

  // using closure to save the note location before playback
  function saveNote(note, pitch = 1.25) {    
    function playNote() {
      console.log('playing note:', note) 
      let music = new Audio(`samples/${note}${FILETYPE}`)
      music.volume = .70;
      music.preservesPitch = false;
      music.playbackRate = pitch;
      music.loop = false;
      music.autoplay = false;
      music.play();
    }
    return playNote;
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
    console.log(tabs);
    const randomTab1 = tabs[getRandomInt(0, tabs.length)];
    const randomTab2 = tabs[getRandomInt(0, tabs.length)];
    console.log(randomTab1, randomTab2);
    const url1 = randomTab1.url.replaceAll(/\r?\n|\r/g, "").replaceAll("https://", "");
    const url2 = randomTab2.url.replaceAll(/\r?\n|\r/g, "").replaceAll("https://", "");

    // first url passed in as a whole sets overall pitch from .25 to 1.25
    const PITCHSHIFT = (hashCode(url1, 100) + 25) / 100;
    console.log('pitch ratio:', PITCHSHIFT);

    // second url pass in as a whole sets tempo from 2 to 6
    const TEMPO = (hashCode(url2, 40) + 20) / 10;
    console.log('tempo ratio:', TEMPO);

    // dynamically insert the URLs into the extension page
    let melody = document.querySelector('#melody');
    let timing = document.querySelector('#timing');
    melody.innerText = url1;
    timing.innerText = url2;
    
    // regex the first URL into a list of 'words'
    //const words = ['This', 'example', 'shows', 'how', 'an', 'extension', 'can', 'toggle', 'the', 'muted', 'state', 'for', 'a', 'given', 'tab']
    const words = url1.match(/.{1,4}/g);
    console.log(words.length, 'words:', words);

    // regex the second URL into a list of 'times', 
    //const times = ['is', 'an', 'asynchronous', 'function', 'meaning', 'that', 'the', 'timer', 'function', 'will', 'not', 'pause', 'execution', 'of', 'other']
    const times = url2.match(/.{1,4}/g);
    console.log(times.length, 'times:', times);

    // pass the words through the hash maker, setting size to the number of audio files available to be played
    const noteList = words.map(el => {return hashCode(el, SAMPLES) });
  
    // do the same for the times array, size 3 for triplets 4 for standard time
    const timeList = times.map(el => hashCode(el, 3));

    // add listener to play button in index.html
    const playBtn = document.querySelector('#play');
    playBtn.addEventListener('click', () => {
      let wait = 0;
      console.log('entering playback loop');
      for (let word of words) {
        let note = noteList.shift();
        let time = timeList.shift();
        console.log('word', word, 'note', note, 'time', time);
        setTimeout(saveNote(note, PITCHSHIFT), wait);
        wait += ((1000 - (time * 250)) * TEMPO);
        if (timeList.length == 0) break;
      }
      console.log('exiting playback loop');
    });

  })
  
});