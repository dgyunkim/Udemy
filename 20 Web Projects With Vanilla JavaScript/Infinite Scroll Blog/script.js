const filterInput = document.querySelector("#filter");
const blogListUl = document.querySelector("#blog-list");
const loadingDiv = document.querySelector("#loading");

let posts = [];
let page = 0;

async function fetchPosts() {
  page++;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  );
  const data = await response.json();
  return data;
}

function generatePosts(event) {
  loadingDiv.style.visibility = "visible";
  // Set timeout of 1 second to see if loading div works well.
  setTimeout(() => {
    fetchPosts().then((data) => {
      loadingDiv.style.visibility = "hidden";
      for (let post of data) {
        posts.push(post);
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        h3.className = "blog-id";
        h3.innerText = post.id;
        li.appendChild(h3);
        const h2 = document.createElement("h2");
        h2.innerText = post.title;
        li.appendChild(h2);
        const p = document.createElement("p");
        p.innerText = post.body;
        li.appendChild(p);
        blogListUl.appendChild(li);
      }
    });
  }, 1000);
}

function filterBlogs(event) {
  const text = filterInput.value;
  for (let li of blogListUl.children) {
    const title = li.children[1].innerText;
    const content = li.children[2].innerText;
    if (title.includes(text) || content.includes(text)) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  }
}

document.addEventListener("DOMContentLoaded", generatePosts);
filterInput.addEventListener("keyup", filterBlogs);
window.addEventListener("scroll", (event) => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 2) {
    generatePosts(event);
  }
});
