let posts = [];

function openWindow(id) {
  document.getElementById(id).style.display = "block";
}

function addPost() {
  const input = document.getElementById("blogInput");
  const text = input.value;

  if (text.trim() === "") return;

  posts.push(text);
  input.value = "";

  renderPosts();
}

function renderPosts() {
  const container = document.getElementById("postList");
  container.innerHTML = "";

  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${post}</p>
      <button onclick="deletePost(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deletePost(index) {
  posts.splice(index, 1);
  renderPosts();
}

/* Dragging windows */
document.querySelectorAll(".window").forEach(win => {
  const bar = win.querySelector(".title-bar");

  bar.onmousedown = function(e) {
    let shiftX = e.clientX - win.getBoundingClientRect().left;
    let shiftY = e.clientY - win.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      win.style.left = pageX - shiftX + 'px';
      win.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  };

  bar.ondragstart = () => false;
});
