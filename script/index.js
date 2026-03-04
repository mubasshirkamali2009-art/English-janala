



const createElement=(arr)=>{
    const  htmleElements=arr.map(el => ` <span   class="btn">${el}</span>`)
    return(htmleElements.join(" "));
}
const manageSpinner=(status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
         document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }

}


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLessons(json.data))
}
const removeActive=()=>{
    const lessonsButtons=  
    document.querySelectorAll(".lesson-btn")
    // console.log(lessonsButtons)
    lessonsButtons.forEach(btn=>btn.classList.remove("active"));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();
            const clickedBtn=
            document.getElementById(`lesson-btn-${id}`)
       
            clickedBtn.classList.add("active");
            displayLevelWord(data.data)
        });
};

loadWordDetail=async(id)=>{
  const url= `https://openapi.programming-hero.com/api/word/${id}`;
  console.log(url);
  const res  = await fetch(url);
  const  details=await  res.json();
  displayWordDetails(details.data);
  
}

const  displayWordDetails  =(word)=>{
console.log(word)
const   detailBox=document.getElementById("details-container");
detailBox.innerHTML=` <div class="">
          <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>
            : ${word.pronunciation} )</h2>
        </div>
        <div class="">
          <h2 class=" font-bold">Meaning </h2>
          <p>${word.meaning} </p>
        </div>
        
        <div class="">
          <h2 class="font-bold">Example</h2>
          <p>${word.sentence}
          </p>
          </div>
          <div class="">
            <h2 class=" font-bold">Synonym</h2>
            <div class="">
            ${createElement(word.synonyms)}
        </div>
        </div>`
document.getElementById("word-modal").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
       
      <div class="text-center  col-span-full  space-y-6 rounded-lg font-bangla">
       <img class="mx-auto" src="./assets/alert-error.png">
     <p  class="text-xl font-medium  text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
     <h2 class="font-bold  text-4xl">নেক্সট Lesson এ যান</h2>
      </div>`;
      manageSpinner(false)
        return;
    }

    words.forEach(word => {
       
        const card = document.createElement("div");
        card.innerHTML = `
     <div class="bg-white  rounded-xl shadow-sm text-center py-10 px-3 space-y-5">
     <h2 class=" font-bold  
      text-2xl">${word.word ? word.word : "শব্দ খুঁজে পাচ্ছি না।"}</h2>
     <p class="">Meaning  /pronounciation</p>
     <h2 class="  font-bangla font-semibold   text-xl">
     
     "
     ${word.meaning ? word.meaning : "শব্দের অর্থ খুঁজে পাচ্ছি   না"} /  
     ${word.pronunciation ? word.pronunciation : "শব্দের উচ্চারণ খুঁজে পাচ্ছি না।" }  "</h2>
     <div class="flex  justify-between items-center">
      <button onclick="loadWordDetail(${word.id})"  class="btn bg-[#1A91FF10]  
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
    manageSpinner(false);
}

const displayLessons = (lessons) => {
    //4 steps for put   data  into   ui
    //1:get  the container & make it  emtry
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";
    //2:get into every  lessons
    for (let lesson of lessons) {
        // console.log(lessons)
        //3:create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
<button 
 id="lesson-btn-${lesson.level_no}"
onClick="loadLevelWord(${lesson.level_no})"
 class="btn btn-outline btn-primary lesson-btn">
 <i class="fa-solid fa-book-open"></i>
         Lesson  ${lesson.level_no}
    </button>`

        //4:append into container

        levelContainer.append(btnDiv)
    }
}





loadLessons()



document.getElementById("btn-serch").addEventListener("click",()=>{
    removeActive()
    const input=document.getElementById("input-serch");
    const  searchValue=input.value.trim().toLowerCase();
    // console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res)=>res.json())
    .then((data)=>{
        const  allwords=data.data
       const  filterWords=allwords.filter(word=>word.word.toLowerCase().includes(searchValue));
       displayLevelWord(filterWords);
    });
})