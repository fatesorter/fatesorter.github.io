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
  this.uncheckFilters()
  document.getElementById('otherTMSelect_all').checked = false;
  document.getElementById('otherTMSelect_allExtra').checked = false;
  document.getElementById('topTen').style.display = 'none';
  document.getElementById('resultcontainer').style.display = 'none';
  document.getElementById('optSelect_all').checked = false;
    document.getElementById('optSelect_allExtra').checked = false;


  this.selectAllRomhack()
  this.selectAllMainline()
  for (let i = 1; i < 103; i++) {
    document.getElementById(`dupeC${i}`).checked = false;
    }
    for (let i = 1; i < 128; i++) {
        document.getElementById(`portraitC${i}`).checked = false;
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
    for (let i = 0; i < otherTMArr.length; i++) {
        if (document.getElementById(`romhack${i}`).checked) {
            games.push(otherTMArr[i])
            charlist = charlist.concat(keys.filter(key => library[key].origin.includes(otherTMArr[i])))
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
    for (let i = 1; i < 103; i++) {
        if (!document.getElementById(`dupeC${i}`).checked) {
            continue;
        }
        let sel = document.getElementById(`dupe${i}`).options
        let indexToKeep = document.getElementById(`dupe${i}`).selectedIndex

 
        let len = sel.length

        for (let j = 0; j < len; j++) {
            if (j != indexToKeep && charlist.includes(sel[j].value)) {
        
                charlist.splice(charlist.indexOf(sel[j].value), 1)
                charlist.push(sel[indexToKeep].value)
            } 

        }
    }
}

function editPortraits() {
    for (let i = 1; i < 128; i++) {
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
    if (games.includes('Fate/stay night') || games.includes('Fate/stay night Extra') || games.includes('Fate/hollow ataraxia') || games.includes('Fate/hollow ataraxia Extra')) {
        tags.push('sn')
    }
    if (games.includes('Fate/Zero') || games.includes('Fate/Zero Extra')) {
        tags.push('zero')
    }
    if (games.includes("Lord El-Melloi II's Case Files / The Adventures of Lord El-Melloi II") || games.includes("Lord El-Melloi II's Case Files / The Adventures of Lord El-Melloi II Extra")) {
        tags.push('lemii')
    }
    if (games.includes('Fate/strange Fake') || games.includes('Fate/strange Fake Extra')) {
        tags.push('sf')
    }
    if (games.includes('Fate/EXTRA / Fate/EXTRA Last Encore') || games.includes('Fate/EXTRA / Fate/EXTRA Last Encore Extra') || games.includes('Fate/EXTRA CCC / Fate/EXTRA CCC FoxTail') || games.includes('Fate/EXTRA CCC / Fate/EXTRA CCC FoxTail Extra') || games.includes('Fate/EXTELLA / Fate/EXTELLA LINK') || games.includes('Fate/EXTELLA / Fate/EXTELLA LINK Extra')) {
        tags.push('ex')
    }
    if (games.includes('Fate/Apocrypha') || games.includes('Fate/Apocrypha Extra')) {
        tags.push('apoc')
    }
    if (games.includes('Fate/Prototype') || games.includes('Fate/Prototype Extra')) {
        tags.push('proto')
    }
    if (games.includes('Fate/Prototype: Fragments of Sky Silver') || games.includes('Fate/Prototype: Fragments of Sky Silver Extra')) {
        tags.push('frags')
    }
    if (games.includes('Fate/type Redline') || games.includes('Fate/type Redline Extra')) {
        tags.push('tr')
    }
    if (games.includes('Fate/Samurai Remnant') || games.includes('Fate/Samurai Remnant Extra')) {
        tags.push('sr')
    }
    if (games.includes('Fate/Grand Order / Fate/Grand Order Arcade') || games.includes('Fate/Grand Order / Fate/Grand Order Arcade Extra')) {
        tags.push('go')
    }
    if (games.includes('The Garden of Sinners') || games.includes('The Garden of Sinners Extra')) {
        tags.push('knk')
    }
    if (games.includes('Tsukihime') || games.includes('Tsukihime Extra') || games.includes('Kagetsu Tohya') || games.includes('Kagetsu Tohya Extra') || games.includes('Talk. / Prelude') || games.includes('Talk. / Prelude Extra') || games.includes('Melty Blood (Original Series)') || games.includes('Melty Blood (Original Series) Extra')) {
        tags.push('o')
    }
    if (games.includes('Tsukihime Remake') || games.includes('Tsukihime Remake Extra') || games.includes('Melty Blood: Type Lumina') || games.includes('Melty Blood: Type Lumina Extra')) {
        tags.push('r')
    }
    if (games.includes('Witch on the Holy Night') || games.includes('Witch on the Holy Night Extra')) {
        tags.push('mahoyo')
    }
    if (games.includes("Lord El-Melloi II's Case Files / The Adventures of Lord El-Melloi II") || !games.includes('Fate/Zero')) {
        tags.push('lord')
    }
    portraitTagSelect(tags)

    let useTemp = false;
    let templist = [];
    for (let i = 0; i < 2; i++) { //filter for gender
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
            (library[element].sex == filtersArr[i])
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist;
    }
    useTemp = false;
    templist = [];
    for (let i = 2; i < 4; i++) { //filter for master/servant
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
            (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist
    }
    useTemp = false;
    templist = [];
    for (let i = 4; i < filtersArr.length; i++) { //other filters
        if (document.getElementById(`filter${i}`).checked) {
            templist = [...templist, ...charlist.filter(element =>
                (library[element].class.includes(filtersArr[i]))
            )]
            useTemp = true;
        }
    }
    if (useTemp) {
        charlist = templist
    }

    charlist = this.shuffle(charlist)
    this.removeDoubles()
    charlist = [...new Set(charlist)];
}