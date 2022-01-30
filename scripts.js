const titlesArr = [
   'Shadow Dragon / New Mystery', 
   'Shadow Dragon / New Mystery Extra',
   'Shadows of Valentia',
   'Shadows of Valentia Extra',
   'Genealogy of the Holy War',
   'Genealogy of the Holy War Extra',
   'Thracia 776',
   'Thracia 776 Extra',
   'Binding Blade',
   'Binding Blade Extra',
   'Blazing Blade',
   'Blazing Blade Extra',
   'Sacred Stones',
   'Sacred Stones Extra',
   'Path of Radiance / Radiant Dawn',
   'Path of Radiance / Radiant Dawn Extra',
   'Awakening',
   'Awakening Extra',
   'Fates',
   'Fates Extra',
   'Three Houses',
   'Three Houses Extra',
   'TMS#FE',
   'TMS#FE Extra',
   'Warriors',
   'Heroes'
]

const romhacksArr = [
   "The Last Promise",
   "Four Kings",
   "Vision Quest",
   "The Last Promise Extra",
   "Four Kings Extra",
   "Vision Quest Extra"
]

const filtersArr = [
"Male Only",
"Female Only",
"Lords",
"Refreshers",
"Myrmidons",
"Pegasus Knights",
"Archers",
"Healers",
"Wyvern Riders",
"Shapeshifters"
]

const doublesKeep = [
'palla_sov',
'catria_sov',
'est_sov',
'karel_fe6',
'bartre_fe6',
'marcus_fe6',
'eliwood_fe7',
'hector_fe7',
'murdock_fe6',
'guinivere_fe6',
'zephiel_fe6',
"merlinus_fe6",
]

const doublesRemove = [
'palla_fe1',
'catria_fe1',
'est_fe1',
'karel_fe7',
'bartre_fe7',
'marcus_fe7',
'eliwood_fe6',
'hector_fe6',
'murdock_fe7',
'guinivere_fe7',
'zephiel_fe7',
"merlinus_fe7",
]

let charlist = []


function toggleCollapsible(id){
   let el = document.getElementById(id);
      el.classList.toggle("active");
   var content = el.nextElementSibling;

    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
}



function uncheckFilters(){
   for (let i = 0; i < filtersArr.length; i++){
      let cbox = document.getElementById('filter'+i);
      cbox.checked = false;
   }

   let cbox = document.getElementById('3hportrait2')
   cbox.checked = false;
   cbox = document.getElementById('tellius1')
   cbox.checked = false;
}


function startup() {
   this.uncheckFilters()
   this.selectAllRomhack()
}

function selectAllMainline() {
   for (let i = 0; i < titlesArr.length; i++) {
      document.getElementById('option' + i).checked = document.getElementById('optSelect_all').checked;
   }
}

function selectAllRomhack() {
   for (let i = 0; i < romhacksArr.length; i++) {
      document.getElementById('romhack' + i).checked = document.getElementById('romhackSelect_all').checked;
   }
}

function portraitChoice(id1, id2) {
   let cbox1 = document.getElementById(id1)
   let cbox2 = document.getElementById(id2)
   cbox2.checked = !cbox1.checked;
}


async function initialize(){
   charlist = [];
   for(let i = 0; i < titlesArr.length; i++){
      if(document.getElementById(`option${i}`).checked){
         charlist = charlist.concat(filter[titlesArr[i]])
      }
   }

   for(let i = 0; i < romhacksArr.length; i++){
         if(document.getElementById(`romhack${i}`).checked){
         charlist = charlist.concat(filter[romhacksArr[i]])
      }
   }

   this.applyFilters()
}

function removeDoubles(keep, remove){
   if (charlist.includes(keep) && charlist.includes(remove)){
      charlist.splice(charlist.indexOf(remove), 1)
   }
}

function portraitFilter(suffix){
   for (let i = 0; i < charlist.length; i++){
      if(charlist[i].includes(suffix)){
         charlist.splice(i, 1);
         i--;
      }
   }
}

function applyFilters(){
   for (let i = 0; i < doublesRemove.length; i++){
      this.removeDoubles(doublesKeep[i], doublesRemove[i])
   }

   document.getElementById('3hportrait1').checked ? this.portraitFilter('_war') : this.portraitFilter('_academy')
   document.getElementById('tellius1').checked ? this.portraitFilter('_rd') : this.portraitFilter('_por')

   for (let i = 0; i < filtersArr.length; i++){
      if(document.getElementById(`filter${i}`).checked)
      charlist = filter[filtersArr[i]].filter(element => charlist.includes(element));
   }

   console.log(charlist)

}

