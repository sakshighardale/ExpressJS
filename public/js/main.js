const output = document.querySelector("#output");
const button = document.querySelector("#get-posts-btn");
const form = document.querySelector("#add-post-form");
//Get and show posts
async function showPosts() {
  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Faild to fetch posts");
    }
    const posts = await res.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const postEle = document.createElement("div");
      postEle.textContent = post.title;
      output.appendChild(postEle);
    });
  } catch (error) {
    console.log("Error fetching posts", error);
  }
}

//Submit new post
async function addPost(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("title");

  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) {
      throw new Error("Failed to add post");
    }
    const newPost = await res.json();
    const postEle = document.createElement("div");
    postEle.textContent = newPost.title;
    output.appendChild(postEle);
    showPosts();
  } catch (error) {
    console.log("Error in adding post", error);
  }
}

//Event listener
button.addEventListener("click", showPosts);
form.addEventListener("submit", addPost);
