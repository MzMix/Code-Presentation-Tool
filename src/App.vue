<script setup>
import { onMounted, ref } from 'vue';

import 'highlight.js/lib/common';

const startOfFile = 1;

const fileContent = ref([]);
const codeToDisplay = ref([]);
const visibleLines = ref(startOfFile);

let CodeBox;

onMounted(() => {
  CodeBox = document.getElementById("CodeBox");

  // window.addEventListener("resize", BreakText());

});

function onFileChange(e) {
  fileContent.value = [];
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  let LoadedFile = files[0];
  ReadFile(LoadedFile);
  visibleLines.value = startOfFile;
}

function ReadFile(file) {
  let reader = new FileReader();
  reader.onload = e => {
    fileContent.value = e.target.result.split(/\r?\n/);
    GenerateCodeObjectsAray(fileContent.value);
    BreakText();
  };
  reader.readAsText(file);
}

function GenerateCodeObjectsAray(code) {
  let num = 1;
  code.forEach(cd => {
    codeToDisplay.value.push({
      code: cd,
      lineNum: num,
      brake: false,
    })
    num++;
  })
  console.log(codeToDisplay.value);
}

function BreakText() {
  GenerateCodeObjectsAray(fileContent.value);
  //width / 6.5
  // let threshold = Math.floor(document.getElementById('CodeBox').offsetWidth / 6.5);
  // console.log(threshold);
  codeToDisplay.value.forEach(line => {
    if (line.code.length > 100) SplitLine(line);
  })
}

function SplitLine(line) {
  let part1, part2;
  let pos = line.code.indexOf(' ', line.code.length / 2);

  part1 = {
    code: line.code.slice(0, pos),
    lineNum: line.lineNum,
    brake: false,
  }

  part2 = {
    code: line.code.slice(pos + 1),
    lineNum: null,
    brake: true,
  }

  let start = codeToDisplay.value.indexOf(line);
  codeToDisplay.value.splice(start, 1, part1, part2);

  // for

}

function showMore() {
  if (visibleLines.value < fileContent.value.length) {
    visibleLines.value++;
  }

  CodeBox.scrollTop = CodeBox.scrollHeight;
}

function showLess() {
  if (visibleLines.value > 0) {
    visibleLines.value--;
  }
}

function AddLeadingZero(num) {
  return num < 10 ? '0' + num : num;
}

</script>

<template>
  <div class="row fixed-top border-dark border-bottom p-2 text-white text-center user-select-none" id="AppNameRow">
    <div class="col-md-12">
      <h1>Code Presentation Tool <i class="bi bi-code-slash"></i></h1>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-2 col-md-3"></div>

    <div class="col-lg-8 col-md-6 col-sm-12">
      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <div class="border border-dark p-1" id="CodeBox">

            <span v-for=" line in codeToDisplay.slice(0, visibleLines)" :key="codeToDisplay.indexOf(line)" class="line">
              <span v-if="!line.brake" class="line-number user-select-none">{{ AddLeadingZero(line.lineNum) }}</span>
              <span v-else class="tab user-select-none">--</span>
              <highlightjs autodetect :code=line.code />
            </span>

          </div>
        </div>

        <div class=" mb-3 user-select-none">
          <label for="formFile" class="form-label">Wczytaj plik do wyświetlenia</label>
          <input class="form-control" type="file" id="formFile" @change="onFileChange">
        </div>

        <div class="mb-3 d-flex" id="ActionButtons">
          <button class="btn btn-secondary" @click="showLess"><i class="bi bi-arrow-bar-up"></i> Ukryj ostatnią
            linijkę</button>
          <button class="btn btn-primary" @click="showMore">Pokaż następną linijkę <i
              class="bi bi-arrow-bar-down"></i></button>
        </div>
      </form>
      <div class="col-lg-2 col-md-3"></div>
    </div>
  </div>

  <div class="row fixed-bottom border-dark border-top user-select-none">
    <div class="col-md-12 text-center d-flex justify-content-center align-items-center">
      <p class="pt-1">Made with <i class="bi bi-heart-fill text-danger"></i> by <a
          href="https://github.com/MzMix">Mikołaj Zuziak</a></p>
    </div>
  </div>
</template>

<style scoped>
#AppNameRow {
  background-color: #6f2dfa;
}

#CodeBox {
  min-height: 25vh !important;
  height: 55vh;
  max-height: 55vh;
  overflow-y: scroll;

  background-color: #f6f6f6;
  transition: all 0.2s ease-in-out;

}

#ActionButtons {
  justify-content: space-between;
}

.tab {
  font-weight: lighter;
  width: 1.5em;
  margin-right: .5em;
  color: transparent;
}

.line {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.line-number {
  font-weight: lighter;
  border-right: 1px solid #000;
  text-align: left;
  width: 1.5em;
  margin-right: .5em;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #672dfa #5c636a;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #dde0e3;
}

*::-webkit-scrollbar-thumb {
  background-color: #672dfa;
  border-radius: 10px;
  border: 2px solid #000000;
}
</style>
