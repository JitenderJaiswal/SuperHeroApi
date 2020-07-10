let fav=[];
const tasksList = document.getElementById('list');
const toastContainer = document.getElementById('toast');

document.addEventListener('click', handleClickLisetner);

function handleClickLisetner (e) {
	e.preventDefault();
    if (e.target.className === 'delete') {
		 removelocalstorage(e.target.id); 
	}
	else if(e.target.className === 'details'){
		for(let i=0;i<fav.length;i++){
			if(fav[i].id===e.target.id){
				addsessionstoragestorage(fav[i]);
			}
		}
		 location.href = "details.html";
	}
	else if(e.target.id === 'home'){
		location.href = "index.html";
	}
}

function addsessionstoragestorage(task){
	sessionStorage.setItem('id', JSON.stringify(task));
}

function removelocalstorage(Taskid){
	let ids=getlocalstorage();
	console.log(ids);
	for (let i = 0; i < ids.length; i++) {
		if(ids[i].id === Taskid){
			ids.splice(i,1);
			fav.splice(i,1);
			console.log(ids);
			break;
		}	
	}
	showNotification('success', 'Task deleted successfully!');
	localStorage.setItem('ids',JSON.stringify(ids));
    renderList(ids);
    
}

function addTaskToDOM (task) {
	if(task){
	const li = document.createElement('li');

	li.innerHTML =`<div class="card mb-3" style="max-width: 540px;border:2px solid black;">
                    <div class="row no-gutters">
                    <div class="col-md-4">
                    <img src="${task.image.url}" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${task.name}</h5>
		            <button type="submit" class="details" id="${task.id}">View Details</button> 
		            <button type="submit" class="delete" id="${task.id}">Delete</button>
                    </div>
                    </div>
                    </div>
                    </div>`;	 
	tasksList.appendChild(li);
	}
}

function renderList (ids) {
    tasksList.innerHTML ='';
	if(ids){
    for (let i = 0; i <ids.length; i++) 
      addTaskToDOM(ids[i]);
	}
 }
 
function getlocalstorage(){
	 let ids=JSON.parse(localStorage.getItem("ids"));
	for(let i=0;i<ids.length;i++){
		fav.push(ids[i]);
	}
	console.log(ids);
	renderList(ids);
	return ids;
}

function showNotification (type, message) {
    toastContainer.classList.add('alert-success');
    toastContainer.style.display = 'block';
    toastContainer.innerText = message;
  
    setTimeout(() => {
      toastContainer.style.display = 'none';
    }, 1000);
  }
  
getlocalstorage();
