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
// detailBox.innerHTML="Hi  Im  From  js "
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