const createElement=(arr)=>{
    const  htmleElements=arr.map(el => ` <span   class="btn">${el}</span>`)
    console.log(htmleElements.join(" "));
}



const synonames  =["hi","hello",   "js"];
createElement(synonames);