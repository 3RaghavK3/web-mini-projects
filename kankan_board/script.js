let cards=[...document.querySelectorAll(".card-items")]
let stats=[...document.querySelectorAll(".stats-items .stat-count")]


cards.forEach((card,index)=>{
    card.dataset.column=index
})


const increasecount=(index)=>{
    stats[index].innerText=parseInt(stats[index].innerText)+1
}

const decreasecount=(index)=>{
    stats[index].innerText=parseInt(stats[index].innerText)-1
}


const generatetime=()=>{
    let x=new Date();
    let day=x.getDate();
    let month=x.getMonth()+1;
    let year=x.getFullYear()%100;

    let hours = x.getHours();
    let minutes = x.getMinutes();

    return `${day}/${month}/${year} ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`

}

const createtaskcard=(text,index)=>{
    
    let taskcard=document.createElement('div')
    taskcard.classList.add("task-card")
    taskcard.setAttribute("draggable",true)
    

    taskcard.innerHTML = `
   <span class="task-text" style="background-color: #00000000">${text}</span><br>
   <span class=task-time  style="background-color: #00000000">${generatetime()}</span>`;
    taskcard.dataset.column=index

    let edit=document.createElement('div')
    let del=document.createElement('div')
 
    edit.classList.add("edit")
    del.classList.add("del")
  
    taskcard.appendChild(del)
    taskcard.appendChild(edit)


    edit.addEventListener("click",()=>{
        let updatedtask=window.prompt("Edit the task")
        if(updatedtask.trim().length==0) window.alert("Nothing to edit")
        let text=taskcard.querySelector(".task-text")
        text.innerText=updatedtask;
        let time=taskcard.querySelector(".task-time")
        time.innerText=generatetime();
    })

    del.addEventListener("click",()=>{
        decreasecount(taskcard.dataset.column);
        taskcard.remove();
    })

    return taskcard
}

cards.forEach((card,index)=>{   
    let input=card.querySelector(".input")
    let button=card.querySelector(".add-task-btn")
    button.addEventListener("click",()=>{
        if(input.value.trim().length==0) window.alert("Enter a task")
        else{
            let taskcard=createtaskcard(input.value,index)
            card.appendChild(taskcard)
            increasecount(card.dataset.column)
            input.value=""     
        }
    })
    
});



let dragged = null;

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task-card")) {
        dragged = e.target;
        const transparentImg = new Image();
        transparentImg.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLz4=';
        e.dataTransfer.setDragImage(transparentImg, 0, 0);
    }
});

cards.forEach((card) => {
    card.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    card.addEventListener("drop", (e) => {
        
        let from=dragged.dataset.column
        let to=card.dataset.column
        increasecount(to)
        decreasecount(from)
        e.preventDefault();
        card.appendChild(dragged);
        dragged.dataset.column=to

    });
});
