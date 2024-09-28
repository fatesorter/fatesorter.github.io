let charlist = []
let games = []

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

let current = 'top25'

function downloadTemplate(){
  var link = document.createElement('a');
  link.download = `${current}.png`;
  link.href = document.getElementById('mainImg').src
  link.id = 'template'
  document.body.appendChild(link);
link.click();
document.body.removeChild(link);

}

function toggleCollapsible(id) {
  let el = document.getElementById(id);
  el.classList.toggle("active");
  var content = el.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function uncheckFilters() {
    for (let i = 0; i < filtersArr.length; i++) {
        let cbox = document.getElementById('filter' + i);
        cbox.checked = false;
    }
}

function startup() {
    this.uncheckFilters();
  document.getElementById('topTen').style.display = 'none';
  document.getElementById('resultcontainer').style.display = 'none';
    document.getElementById('optSelect_all').checked = false;
    document.getElementById('optSelect_main').checked = false;
    document.getElementById('optSelect_mainextra').checked = false;
    document.getElementById('optSelect_extra').checked = false;
    document.getElementById('optSelect_extraextra').checked = false;
    document.getElementById('optSelect_apoc').checked = false;
    document.getElementById('optSelect_apocextra').checked = false;
    document.getElementById('optSelect_proto').checked = false;
    document.getElementById('optSelect_protoextra').checked = false;
    document.getElementById('optSelect_allExtra').checked = false;


    this.selectAllMainline()
    for (let i = 1; i < 34; i++) {
        document.getElementById(`portraitC${i}`).checked = false;
    }
    for (let i = 1; i < 29; i++) {
        let sel = document.getElementById(`dupe${i}`).options;
        let options = sel.length;
        for (let j = 1; j <= options; j++) {
            document.getElementById(`dupeC${i}D${j}`).checked = false;
        }
    }
}

function selectAllMainline() {
  for (let i = 0; i < fateArr.length; i++) {
    document.getElementById('option' + i).checked = document.getElementById('optSelect_all').checked;
  }
}


function reset() {
  if (window.confirm("Do you want to start over? Your saved progress will be deleted.")) {
    window.location.reload();
    window.localStorage.clear()
  }
}

function selectAll(id, arr, option) {
  for (let i = 0; i < arr.length; i++) {
    document.getElementById(option + i).checked = document.getElementById(id).checked;
  }
}

function selectAllExtra(id, arr, option) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i].includes('Extra'))
      document.getElementById(option + i).checked = document.getElementById(id).checked;
  }
}

function selectAllRomhack() {
  for (let i = 0; i < otherTMArr.length; i++) {
    document.getElementById('romhack' + i).checked = document.getElementById('otherTMSelect_all').checked;
  }
}


function selectMain(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("stay night") || arr[i].includes("hollow ataraxia") || arr[i].includes("Zero") || arr[i].includes("Case Files") || arr[i].includes("strange Fake"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}
function selectMainExtra(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].includes("stay night") || arr[i].includes("hollow ataraxia") || arr[i].includes("Zero") || arr[i].includes("Case Files") || arr[i].includes("strange Fake")) && arr[i].includes("Extra"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}

function selectExtraverse(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("/EXTRA") || arr[i].includes("CCC") || arr[i].includes("EXTELLA"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}
function selectExtraverseExtra(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].includes("/EXTRA") || arr[i].includes("CCC") || arr[i].includes("EXTELLA")) && arr[i].includes("Extra"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}

function selectApoc(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("Apocrypha") || arr[i].includes("Lost Einherjar") || arr[i].includes("Labyrinth"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}
function selectApocExtra(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].includes("Apocrypha") || arr[i].includes("Lost Einherjar") || arr[i].includes("Labyrinth")) && arr[i].includes("Extra"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}

function selectProto(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("Prototype") || arr[i].includes("Labyrinth"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}
function selectProtoExtra(id, arr, option) {
    for (let i = 0; i < arr.length; i++) {
        if ((arr[i].includes("Prototype") || arr[i].includes("Labyrinth")) && arr[i].includes("Extra"))
            document.getElementById(option + i).checked = document.getElementById(id).checked;
    }
}

function portraitChoice(id1, id2, id3, id4) {
    let cbox1 = document.getElementById(id1)
    if (cbox1.checked == false) {
        cbox1.checked = true
        return;
    }
    let cbox2 = document.getElementById(id2)
    cbox2.checked = !cbox1.checked;
    if (id3 != undefined) {
        let cbox3 = document.getElementById(id3)
        cbox3.checked = cbox2.checked

        if (id4 != undefined) {
            let cbox4 = document.getElementById(id4)
            cbox4.checked = cbox3.checked
        }
    }
}

function hideAll() {
  document.getElementById('allCheckboxes').style.display = 'none';
  document.getElementById('resumeButton').style.display = 'none';
}
async function initialize() {
    if (window.localStorage['charlist']) {
        if (!window.confirm('Saved progress detected. Are you sure you want to start over?')) {
            return;
        }
    }
    charlist = [];
    let keys = await Object.keys(library)
    for (let i = 0; i < fateArr.length; i++) {
        if (document.getElementById(`option${i}`).checked) {
            games.push(fateArr[i])
            charlist = charlist.concat(keys.filter(key => library[key].origin.includes(fateArr[i])))
            let mySet = new Set(charlist)
            charlist = Array.from(mySet)
        }
    }
    this.applyFilters();
    if (charlist.length < 2) {
        window.alert('You need to select more than 2 characters.')
        return;
    }
    this.hideAll()
    this.start();
    document.getElementById('fldMiddleB').setAttribute("onClick", "undo()");
}

function removeDoubles() {
    for (let i = 1; i < 29; i++) {

        let sel = document.getElementById(`dupe${i}`).options;
        let indexToKeep = document.getElementById(`dupe${i}`).selectedIndex;
        let len = sel.length;

        for (let j = 0; j < len; j++) {
            if (j != indexToKeep && charlist.includes(sel[j].value) && document.getElementById(`dupeC${i}D${j + 1}`).checked) {
                charlist.splice(charlist.indexOf(sel[j].value), 1)
                charlist.push(sel[indexToKeep].value)
            }
        }
    }
}

function editPortraits() {
    for (let i = 1; i < 34; i++) {
        if (!document.getElementById(`portraitC${i}`).checked) {
            continue;
        }
        let name = document.getElementById(`portraitC${i}`).name;
        let sel = document.getElementById(`portrait${i}`).value;

        library[name].portrait = sel;
    }
}

function portraitTagSelect(tags) {
    for (let i = 0; i < charlist.length; i++) {
        for (let j = 0; j < library[charlist[i]].tags.length; j++) {
            if (tags.includes(library[charlist[i]].tags[j])) {
                library[charlist[i]].portrait = library[charlist[i]].tags[j];
                break;
            }
        }
    }
    editPortraits();
}


function applyFilters() {
    let tags = [];
    if (games.includes('Fate/stay night') || games.includes('Fate/hollow ataraxia') ||
        games.includes('Fate/stay night Extra') || games.includes('Fate/hollow ataraxia Extra')) {
        tags.push('sn')
    }
    if (games.includes('Fate/Zero') || games.includes('Fate/Zero Extra')) {
        tags.push('zero')
    }
    if (games.includes('Case Files') || games.includes('Case Files Extra')) {
        tags.push('lemii')
        tags.push('lord')
    }
    if (games.includes('Fate/strange Fake') || games.includes('Fate/strange Fake Extra')) {
        tags.push('sf')
    }
    if (games.includes('Fate/EXTRA') || games.includes('Fate/EXTRA Extra')) {
        tags.push('ex')
        tags.push('mc')
    }
    if (games.includes('Fate/EXTRA CCC') || games.includes('Fate/EXTRA CCC Extra')) {
        tags.push('ccc')
        tags.push('mc')
    }
    if (games.includes('Fate/EXTELLA') || games.includes('Fate/EXTRELLA Extra')) {
        tags.push('mc')
    }
    if (games.includes('Fate/Apocrypha') || games.includes('Fate/Apocrypha Extra')) {
        tags.push('apoc')
    }
    if (games.includes('Fate:Lost Einherjar') || games.includes('Fate:Lost Einherjar Extra')) {
        tags.push('le')
    }
    if (games.includes('Fate/Prototype')) {
        tags.push('proto')
    }
    if (games.includes('Fate/Prototype: Fragments')) {
        tags.push('frags')
    }
    if (games.includes('Fate/type Redline')) {
        tags.push('tr')
    }
    if (games.includes('Fate/Samurai Remnant')) {
        tags.push('sr')
    }
    portraitTagSelect(tags)

    let useTemp = false;
    let templist = [];
    for (let i = 0; i < 3; i++) { //filter for Gender
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }

    useTemp = false;
    templist = [];
    for (let i = 3; i < 6; i++) { //filter for Master/Servant
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }

    useTemp = false;
    templist = [];
    for (let i = 6; i < 18; i++) { //filter for Servant Class
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }

    useTemp = false;
    templist = [];
    for (let i = 18; i < 36; i++) { //filter for character origin
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }

    useTemp = false;
    templist = [];
    for (let i = 36; i < 48; i++) { //filter for alignment
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }

    useTemp = false;
    templist = [];
    for (let i = 48; i < filtersArr.length; i++) { //filter for other traits
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }
    charlist = this.shuffle(charlist)
    this.removeDoubles()
    charlist = [...new Set(charlist)];
}