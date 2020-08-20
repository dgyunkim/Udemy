const closeDiv = document.querySelector("#close");
const modalDiv = document.querySelector("#modal");
const openButton = document.querySelector("#open");
const boxesDiv = document.querySelector("#boxes");
const textTextarea = document.querySelector("#text");
const readButton = document.querySelector("#read");
const voiceSelect = document.querySelector("#voice");

let voices = [];
let voiceName;
let currentVoice;
let text;

function openModal(event) {
  modalDiv.classList.add("show");
}

function closeModal(event) {
  modalDiv.classList.remove("show");
}

function setVoiceName(event) {
  voiceName = voiceSelect.value;
  for (let voice of voices) {
    if (voice.name === voiceName) {
      currentVoice = voice;
      break;
    }
  }
  localStorage.setItem("voiceName", voiceName);
}

function readText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  if (currentVoice) {
    utterance.voice = currentVoice;
  }
  speechSynthesis.speak(utterance);
}

function readModal(event) {
  if (text !== "") {
    readText(text);
  }
}

function setText(event) {
  text = textTextarea.value;
  localStorage.setItem("text", text);
}

function readBox(event) {
  for (let element of event.path) {
    if (element.className === "box") {
      const p = element.children[1];
      const text = p.innerText;
      readText(text);
    }
  }
}

function loadLocalStorage() {
  voiceName = localStorage.getItem("voiceName");
  if (voiceName) {
    voiceSelect.value = voiceName;
  }
  for (let voice of voices) {
    if (voice.name === voiceName) {
      currentVoice = voice;
      break;
    }
  }
  text = localStorage.getItem("text");
  textTextarea.value = text;
}

function populateVoiceList() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
  loadLocalStorage();
}

openButton.addEventListener("click", openModal);
closeDiv.addEventListener("click", closeModal);
voiceSelect.addEventListener("change", setVoiceName);
textTextarea.addEventListener("input", setText);
boxesDiv.addEventListener("click", readBox);
readButton.addEventListener("click", readModal);
speechSynthesis.addEventListener("voiceschanged", populateVoiceList);
document.addEventListener("DOMContentLoaded", populateVoiceList);
