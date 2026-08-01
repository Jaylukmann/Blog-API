const API_URL = "http://localhost:5000/";


let page = 1;
const limit = 5;



async function getBlogs(){

    const response = await fetch(
        `${API_URL}/getAllBlogs?page=${page}&limit=${limit}`
    );

    const result = await response.json();

    displayBlogs(result.data);

}



function displayBlogs(blogs){

    const container = document.getElementById("blogs");

    container.innerHTML="";


    blogs.forEach(blog=>{

        container.innerHTML += `

        <div class="blog">

        <h2>${blog.title}</h2>

        <p>${blog.content}</p>

        <p>
        Author: ${blog.author}
        </p>

        <p>
        Category: ${blog.category}
        </p>

        <p>
        Status: ${blog.status}
        </p>


        <button class="delete"
        onclick="deleteBlog('${blog._id}')">
        Delete
        </button>


        </div>

        `;

    });

}




async function createBlog(){

const blog = {

title: document.getElementById("title").value,

content: document.getElementById("content").value,

author: document.getElementById("author").value,

category: document.getElementById("category").value,

tags:
document.getElementById("tags")
.value
.split(","),

status:
document.getElementById("status").value

};



const response = await fetch(
`${API_URL}/createBlog`,
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(blog)

});


const result = await response.json();


alert(result.message);


getBlogs();

}





async function deleteBlog(id){


const confirmDelete =
confirm("Delete this blog?");


if(!confirmDelete)
return;



const response = await fetch(

`${API_URL}/deleteBlog/${id}`,

{
method:"DELETE"
}

);


const result = await response.json();


alert(result.message);


getBlogs();


}





function nextPage(){

page++;

getBlogs();

}


function previousPage(){

if(page>1){

page--;

getBlogs();

}

}



getBlogs();