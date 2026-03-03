const  loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((json) => displayLessons(json.data))
}
const loadLevelWord=(id)=>{
    const url  =`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayLevelWord(data.data));
};

const  displayLevelWord=(words)=>{
   const wordContainer=document.getElementById("word-container");
   wordContainer.innerHTML="";

   words.forEach(word => {
    console.log(word)
    const card=document.createElement("div");
    card.innerHTML= `
     <div class="bg-white  rounded-xl shadow-sm text-center py-10 px-3 space-y-5">
     <h2 class=" font-bold   text-2xl">${word.word}</h2>
     <p class="">Meaning  /pronounciation</p>
     <h2 class="  font-bangla font-semibold   text-xl">
     "${word.meaning}   "</h2>
     <div class="flex  justify-between items-center">
      <button  class="btn bg-[#1A91FF10]  
      hover:bg-[#1A91FF90] "><i class="fa-solid fa-circle-info"></i>
</button>
      <button class="btn bg-[#1A91FF10] 
       hover:bg-[#1A91FF90]"><i class="fa-solid fa-volume-low"></i>
</button>
     </div>

    </div>

    `
    wordContainer.append(card);

    
    
   });
}

const displayLessons =(lessons)=>{
//4 steps for put   data  into   ui
//1:get  the container & make it  emtry
const   levelContainer=document.getElementById("level-container")
levelContainer.innerHTML="";
//2:get into every  lessons
for(let  lesson of  lessons){
console.log(lessons)
//3:create Element
const btnDiv=document.createElement("div");
btnDiv.innerHTML=`
<button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
 <i class="fa-solid fa-book-open"></i>
         Lesson  ${lesson.level_no}
    </button>`

//4:append into container

levelContainer.append(btnDiv)
}
}





loadLessons()