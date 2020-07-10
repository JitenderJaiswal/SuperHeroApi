let tasks = [];
let str='';
const search = document.getElementById('search');
const tasksList = document.getElementById('list');
const toastContainer = document.getElementById('toast');

document.addEventListener('click', handleClickLisetner);
search.addEventListener('keyup', handleInputKeypress);

function addTaskToDOM (task) {
	const li = document.createElement('li');

	      li.innerHTML =`<div class="card mb-3" style="max-width: 540px; border:2px solid black;">
                         <div class="row no-gutters">
                          <div class="col-md-6">
                           <img src="${task.image.url}" class="card-img" alt="...">
                          </div>
                        <div class="col-md-6" style="background-color:#8A2BE2;opacity:0.7">
                         <div class="card-body" >
                          <h2 class="card-title">${task.name}</h2>
	                      <button type="submit" class="details" id="${task.id}">View Details</button> 
	                      <button type="submit" class="add" id="${task.id}">Add to Favourites</button>
                        </div>
                       </div>
                      </div>
                     </div>`;
	tasksList.appendChild(li);
}
  
function renderList () {
    tasksList.innerHTML ='';

   let results=tasks[tasks.length-1].results;
    for (let i = 0; i <results.length; i++) 
      addTaskToDOM(results[i]);
 }
  
function searchTask(text) {
       let xhr=new XMLHttpRequest();
           xhr.open('GET','https://superheroapi.com/api.php/2558700237587797/search/'+text,true);
           xhr.onload=function(){
	                   if(this.status == 200){
		                 let hero=JSON.parse(this.responseText);
						 if(hero)
						 tasks.push(hero);
						 renderList();
	                    }
	                   else if(this.status==400){
		                 console.log("Not found");
	                   }  
                      }
            xhr.send();
  }

function handleInputKeypress (e) {
	  if(e.keyCode === 8){  
	    str=str.substring(0,str.length-1);
       tasks.pop();
       renderList();	  
	  }
      else{
	  str+=e.key;
	  searchTask(str);
	  } 
}

function addlocalstorage(task){
	let ids=[];
	if(localStorage.hasOwnProperty("ids"))
	  ids=JSON.parse(localStorage.getItem('ids'));
	
	ids.push(task);
	localStorage.setItem('ids',JSON.stringify(ids));
	showNotification('success', 'Task addedd successfully!');
}

function addsessionstoragestorage(task){
	sessionStorage.setItem('id', JSON.stringify(task));
}

function handleClickLisetner (e) {
	 const Taskid=e.target.id;
     let results=tasks[tasks.length-1].results;
	 if(e.target.className === 'add'){
		   for(let i=0;i<results.length;i++){
			if(results[i].id===Taskid)
			addlocalstorage(results[i]);
		   }
	}
	else if(e.target.className === 'details'){
		for(let i=0;i<results.length;i++){
			if(results[i].id===Taskid)
			addsessionstoragestorage(results[i]);
		 }
		 location.href = "details.html";
	}
	else if(e.target.id === 'fav'){
		location.href = "favourites.html";
	}
}

function showNotification (type, message) {
    toastContainer.classList.add('alert-success');
    toastContainer.style.display = 'block';
    toastContainer.innerText = message;
  
    setTimeout(() => {
      toastContainer.style.display = 'none';
    }, 1000);
  }
  
