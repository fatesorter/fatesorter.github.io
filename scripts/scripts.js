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
    document.getElementById('optSelect_allExtra').checked = false;


  this.selectAllMainline()
  for (let i = 1; i < 8; i++) {
    document.getElementById(`dupeC${i}`).checked = false;
    }
    for (let i = 1; i < 8; i++) {
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
    for (let i = 1; i < 8; i++) {
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
    for (let i = 1; i < 8; i++) {
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
    if (games.includes('Fate/stay night') || games.includes('Fate/hollow ataraxia')) {
        tags.push('sn')
    }
    if (games.includes('Fate/Zero')) {
        tags.push('zero')
    }
    if (games.includes('Fate/strange Fake')) {
        tags.push('sf')
    }
    portraitTagSelect(tags)

    let useTemp = false;
    let templist = [];
    for (let i = 0; i < 2; i++) { //filter for role
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