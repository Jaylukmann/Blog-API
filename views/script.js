// const API_URL = "http://localhost:5050";
const API_URL = "https://blog-api-11x3.onrender.com";

let page = 1;
const limit = 10;

// =======================
// GET ALL BLOGS
// =======================
async function getBlogs() {
    try {
        const response = await fetch(
            `${API_URL}/getAllBlogs?page=${page}&limit=${limit}`
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        displayBlogs(result.data);

    } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
    }
}

// =======================
// DISPLAY BLOGS
// =======================
function displayBlogs(blogs) {

    const container = document.getElementById("blogs");

    container.innerHTML = "";

    blogs.forEach(blog => {

        container.innerHTML += `
        <div class="blog">

            <h2>${blog.title}</h2>

            <p>${blog.content}</p>

            <p><strong>Author:</strong> ${blog.author}</p>

            <p><strong>Category:</strong> ${blog.category}</p>

            <p><strong>Tags:</strong> ${blog.tags.join(", ")}</p>

            <p><strong>Status:</strong> ${blog.status}</p>

            <p><strong>Views:</strong> ${blog.views}</p>

            <button onclick="editBlog('${blog._id}')">
                Edit
            </button>

            <button class="delete"
                onclick="deleteBlog('${blog._id}')">
                Delete
            </button>

        </div>
        `;
    });
}
// =======================
// SHOW MESSAGE
// =======================

function showMessage(message, type){

    const messageBox = document.getElementById("editMessage");
        messageBox.style.display = "block";
    messageBox.textContent = message;

    if(type === "error"){
        messageBox.style.color = "red";
    } else {
        messageBox.style.color = "green";
    }

}
// =======================
// SHOW CREATE FORM
// =======================
function showCreateForm() {
    document.getElementById("createBlogForm").style.display = "block";
     document.getElementById("createForm").style.display = "block";
}   

// =======================
// CREATE BLOG
// =======================
async function createBlog() {
      document.getElementById("createForm").style.display = "block";

    try {

        const blog = {

            title: document.getElementById("title").value.trim(),

            content: document.getElementById("content").value.trim(),

            author: document.getElementById("author").value.trim(),

            category: document.getElementById("category").value.trim(),

            tags: document
                .getElementById("tags")
                .value
                .split(",")
                .map(tag => tag.trim()),

            status: document.getElementById("status").value,

            views: Number(document.getElementById("views").value)

        };

        const response = await fetch(
            `${API_URL}/createBlog`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blog)
            }
        );
      
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        showMessage(result.message, "success");

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        document.getElementById("author").value = "";
        document.getElementById("category").value = "";
        document.getElementById("tags").value = "";
        document.getElementById("views").value = "";

        getBlogs();

    } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
    }
}

// =======================
// DELETE BLOG
// =======================
async function deleteBlog(id) {

    const confirmDelete = confirm("Delete this blog?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(
            `${API_URL}/deleteBlog/${id}`,
            {
                method: "DELETE"
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        showMessage(result.message, "success");

        getBlogs();

    } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
    }
}

// =======================
// LOAD BLOG INTO EDIT FORM
// =======================
async function editBlog(id) {

    try {

        const response = await fetch(`${API_URL}/getBlog/${id}`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        const blog = result.data;
        document.getElementById("editBlog").style.display = "block";
        document.getElementById("editForm").style.display = "block";

        document.getElementById("editId").value = blog._id;
        document.getElementById("editTitle").value = blog.title;
        document.getElementById("editContent").value = blog.content;
        document.getElementById("editAuthor").value = blog.author;
        document.getElementById("editCategory").value = blog.category;
        document.getElementById("editTags").value = blog.tags.join(", ");
        document.getElementById("editStatus").value = blog.status;
        document.getElementById("editViews").value = blog.views;

    } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
    }
}

// =======================
// UPDATE BLOG
// =======================
async function updateBlog() {

    try {

        const id = document.getElementById("editId").value;

        const blog = {

            title: document.getElementById("editTitle").value.trim(),

            content: document.getElementById("editContent").value.trim(),

            author: document.getElementById("editAuthor").value.trim(),

            category: document.getElementById("editCategory").value.trim(),

            tags: document
                .getElementById("editTags")
                .value
                .split(",")
                .map(tag => tag.trim()),

            status: document.getElementById("editStatus").value,

            views: Number(document.getElementById("editViews").value)

        };

        const response = await fetch(
            `${API_URL}/editBlog/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blog)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        showMessage(result.message, "success");

        document.getElementById("editForm").style.display = "none";

        getBlogs();

    } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
    }
}

// =======================
// PAGINATION
// =======================
function nextPage() {
    page++;
    getBlogs();
}

function previousPage() {

    if (page > 1) {
        page--;
        getBlogs();
    }
}

// =======================
// INITIAL LOAD
// =======================
getBlogs();