// Posts data - simple static array for demo
const posts = [
  {
    id: 1,
    title: "Blog Post Title 1",
    description: "This is a short description of blog post 1.",
    image: "https://via.placeholder.com/350x150",
    url: "post1.html",
  },
  {
    id: 2,
    title: "Blog Post Title 2",
    description: "This is a short description of blog post 2.",
    image: "https://via.placeholder.com/350x150",
    url: "post2.html",
  },
  {
    id: 3,
    title: "Blog Post Title 3",
    description: "This is a short description of blog post 3.",
    image: "https://via.placeholder.com/350x150",
    url: "post3.html",
  },
  {
    id: 4,
    title: "Blog Post Title 4",
    description: "This is a short description of blog post 4.",
    image: "https://via.placeholder.com/350x150",
    url: "post4.html",
  },
];

const postsPerPage = 3;
let currentPage = 1;

const postsContainer = document.getElementById("postsContainer");
const paginationContainer = document.getElementById("pagination");

// Render posts for current page
function renderPosts(page) {
  if (!postsContainer) return;
  postsContainer.innerHTML = "";
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const pagePosts = posts.slice(start, end);

  pagePosts.forEach(post => {
    const postHTML = `
      <div class="col-md-4">
        <div class="card mb-4" data-url="${post.url}">
          <img src="${post.image}" class="card-img-top" alt="${post.title}">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.description}</p>
            <button class="btn btn-primary read-more-btn" data-url="${post.url}">Read More</button>
          </div>
        </div>
      </div>
    `;
    postsContainer.insertAdjacentHTML("beforeend", postHTML);
  });

  // Attach click handlers for "Read More"
  document.querySelectorAll(".read-more-btn").forEach(button => {
    button.addEventListener("click", e => {
      const url = e.target.getAttribute("data-url");
      window.location.href = url;
    });
  });
}

// Render pagination buttons
function renderPagination() {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(posts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");
    li.innerHTML = `<a class="page-link">${i}</a>`;
    li.addEventListener("click", () => {
      currentPage = i;
      renderPosts(currentPage);
      renderPagination();
      window.scrollTo(0, 0);
    });
    paginationContainer.appendChild(li);
  }
}

// Contact form validation and success message
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
    } else {
      document.getElementById("successMessage").textContent = "Thank you! Your message has been sent.";
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    }
  });
}

// Highlight active nav link based on current URL
function highlightNavLink() {
  const navLinks = document.querySelectorAll("#navLinks .nav-link");
  navLinks.forEach(link => {
    if (link.href === window.location.href || link.href === window.location.href.split("#")[0]) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPosts(currentPage);
  renderPagination();
  highlightNavLink();
});
