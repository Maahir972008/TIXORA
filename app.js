const stories = [
  {
    id: "campus-belonging",
    category: "Campus",
    title: "What makes a campus feel like home?",
    excerpt: "Students across OOU share the places, people and small rituals that make university life their own.",
    date: "Campus desk",
    read: "5 min read",
    art: "OUR<br>CAMPUS",
    feature: true,
    body: "A campus is more than lecture halls and timetables. It is the friends who save you a seat, the familiar walk between classes, and the places where ideas turn into friendships. This preview story is a space for students from across OOU to share what makes the university feel like their own. Add reported student voices and verified details here before publishing."
  },
  {
    id: "learning-beyond-lecture",
    category: "Academics",
    title: "Learning doesn't stop when the lecture ends",
    excerpt: "A closer look at peer study groups, student-led projects and the ways OOU students learn together.",
    date: "Academics desk",
    read: "4 min read",
    art: "AFTER<br>CLASS",
    body: "From informal study circles to student-led projects, learning takes many forms beyond the classroom. This preview invites contributions from students and lecturers across departments. Add interviews, examples and any relevant dates or figures after reporting."
  },
  {
    id: "student-creatives",
    category: "Culture",
    title: "The student creatives putting their work out there",
    excerpt: "Meet the artists, makers and storytellers finding an audience right here on campus.",
    date: "Culture desk",
    read: "6 min read",
    art: "MADE<br>HERE",
    body: "OOU is full of people making things: photographs, illustrations, music, fashion, writing and more. This preview is an invitation to meet the student creatives behind that work. Replace with verified profiles, quotes and links to the creators' work."
  },
  {
    id: "more-than-matchday",
    category: "Sports",
    title: "More than match day: sport and campus community",
    excerpt: "For players and supporters alike, sport can bring different corners of the university together.",
    date: "Sports desk",
    read: "4 min read",
    art: "GAME<br>ON",
    body: "Sport can connect people across years, faculties and interests. This preview explores what participation and support mean to students across OOU. Add current team information, match reports and attributed student perspectives before publication."
  },
  {
    id: "student-soundtrack",
    category: "Student life",
    title: "The soundtrack to a day at OOU",
    excerpt: "Students share the songs, sounds and playlists that carry them through a day on campus.",
    date: "Student life desk",
    read: "3 min read",
    art: "CAMPUS<br>FM",
    body: "Every student's day has its own rhythm. This preview gathers the songs, sounds and playlists that accompany campus life, with room for contributions from students in every department. Add attributed recommendations and creator credits."
  },
  {
    id: "campus-calendar",
    category: "Events",
    title: "Make room in your calendar for campus life",
    excerpt: "A student-friendly guide to finding events, sharing what's on and showing up for one another.",
    date: "Events desk",
    read: "3 min read",
    art: "SAVE<br>THE DATE",
    body: "From academic talks and exhibitions to sport and social gatherings, events help make campus life. This preview is a starting point for a verified, regularly updated OOU events guide. Add confirmed dates, times, venues and organizer details."
  },
  {
    id: "campus-style",
    category: "Lifestyle",
    title: "Personal style, student budgets and making it yours",
    excerpt: "Students talk about self-expression, everyday essentials and finding their own look at university.",
    date: "Lifestyle desk",
    read: "5 min read",
    art: "OWN<br>YOUR LOOK",
    body: "Personal style is a form of self-expression that looks different for everyone. This preview makes room for student perspectives on style and everyday life, without assuming one experience fits the whole campus. Add reported interviews and photography with permission."
  },
  {
    id: "campus-conversation",
    category: "Opinions",
    title: "A campus conversation is better when more voices join",
    excerpt: "An open invitation to students with different experiences and points of view to take part.",
    date: "Opinion desk",
    read: "4 min read",
    art: "YOUR<br>VOICE",
    body: "A healthy campus conversation makes room for disagreement, curiosity and lived experience. This preview introduces an open opinion space; published contributions should be clearly attributed, edited transparently and follow the newsroom's submission standards."
  },
  {
    id: "gist-and-buzz",
    category: "Gist & Buzz",
    title: "Good gist travels when everyone gets to tell it",
    excerpt: "Campus buzz, student culture and the stories that bring people together — with context and care.",
    date: "Gist & Buzz desk",
    read: "3 min read",
    art: "THE<br>BUZZ",
    body: "Campus culture moves fast, but good storytelling makes space for context and different perspectives. This preview sets the tone for a Gist & Buzz section that celebrates campus life without passing along unverified claims. Confirm details and seek consent before publishing."
  }
];

const categories = ["All", "Campus", "Academics", "Student life", "Culture", "Sports", "Events", "Lifestyle", "Opinions", "Gist & Buzz"];
let activeCategory = "All";
let activeQuery = "";
let featureIndex = 0;

const featuredStories = stories.filter((story) => story.feature || ["Academics", "Sports", "Culture"].includes(story.category));
const storyGrid = document.querySelector("#story-grid");
const searchInput = document.querySelector("#site-search");
const dialog = document.querySelector(".article-dialog");

function storyMatches(story) {
  const categoryMatches = activeCategory === "All" || story.category === activeCategory;
  const searchText = `${story.title} ${story.excerpt} ${story.category}`.toLowerCase();
  return categoryMatches && searchText.includes(activeQuery.trim().toLowerCase());
}

function renderFeature() {
  const story = featuredStories[featureIndex];
  const feature = document.querySelector("#featured-main");
  feature.innerHTML = `
    <div class="feature-image" aria-hidden="true"></div>
    <div class="feature-content">
      <span class="preview-tag">Preview story · ${story.category}</span>
      <h2>${story.title}</h2>
      <p>${story.excerpt}</p>
      <div class="feature-meta"><span>${story.date}</span><span>${story.read}</span></div>
    </div>`;
  feature.setAttribute("role", "button");
  feature.setAttribute("tabindex", "0");
  feature.setAttribute("aria-label", `Read preview: ${story.title}`);
  feature.onclick = () => openStory(story.id);
  feature.onkeydown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openStory(story.id);
    }
  };

  const railStories = featuredStories
    .filter((_, index) => index !== featureIndex)
    .slice(0, 3);
  document.querySelector("#rail-stories").innerHTML = railStories.map((item) => `
    <button class="rail-story" type="button" data-story-id="${item.id}">
      <span class="story-label">${item.category} <span class="preview-tag">Preview</span></span>
      <h3>${item.title}</h3>
      <small>${item.read} · ${item.date}</small>
    </button>`).join("");
}

function renderCategories() {
  document.querySelector("#category-filters").innerHTML = categories.map((category) => `
    <button class="filter-chip${activeCategory === category ? " is-active" : ""}" type="button" data-category="${category}" aria-pressed="${activeCategory === category}">${category}</button>
  `).join("");
}

function renderStories() {
  const visibleStories = stories.filter(storyMatches);
  storyGrid.innerHTML = visibleStories.map((story, index) => `
    <article class="story-card" tabindex="0" role="button" data-story-id="${story.id}" aria-label="Read preview: ${story.title}">
      <div class="story-art" aria-hidden="true"><span class="art-word">${story.art}</span><span class="art-index">TIXORA / ${String(index + 1).padStart(2, "0")}</span></div>
      <div class="story-card-body">
        <div class="story-card-meta"><span class="story-label">${story.category}</span><span class="preview-tag">Preview</span></div>
        <h3>${story.title}</h3>
        <p>${story.excerpt}</p>
      </div>
    </article>`).join("");
  document.querySelector("#empty-state").hidden = visibleStories.length !== 0;
}

function openStory(id) {
  const story = stories.find((item) => item.id === id);
  if (!story) return;
  document.querySelector(".dialog-content").innerHTML = `
    <div class="dialog-art" aria-hidden="true">${story.art.replace("<br>", " ")}</div>
    <span class="story-label">${story.category} · Preview story</span>
    <h2 id="dialog-title">${story.title}</h2>
    <p class="dialog-meta">${story.date} · ${story.read} · Tixora Student Media</p>
    <p>${story.body}</p>`;
  dialog.showModal();
}

function setCategory(category) {
  activeCategory = categories.includes(category) ? category : "All";
  renderCategories();
  renderStories();
  document.querySelectorAll(".nav-link").forEach((link) => {
    const isCurrent = link.dataset.category === activeCategory;
    link.classList.toggle("is-current", isCurrent);
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

document.addEventListener("click", (event) => {
  const categoryLink = event.target.closest("[data-category]");
  if (categoryLink) {
    event.preventDefault();
    setCategory(categoryLink.dataset.category);
    document.querySelector("#latest").scrollIntoView({ behavior: "smooth" });
    document.querySelector("#primary-nav").classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  }

  const storyTarget = event.target.closest("[data-story-id]");
  if (storyTarget) openStory(storyTarget.dataset.storyId);

  const step = event.target.closest("[data-step]");
  if (step) {
    featureIndex = (featureIndex + Number(step.dataset.step) + featuredStories.length) % featuredStories.length;
    renderFeature();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector("#search-panel").hidden = true;
    document.querySelector(".search-toggle").setAttribute("aria-expanded", "false");
  }
  const storyCard = event.target.closest(".story-card");
  if (storyCard && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    openStory(storyCard.dataset.storyId);
  }
});

searchInput.addEventListener("input", () => {
  activeQuery = searchInput.value;
  renderStories();
});

document.querySelector(".search-toggle").addEventListener("click", (event) => {
  const panel = document.querySelector("#search-panel");
  panel.hidden = !panel.hidden;
  event.currentTarget.setAttribute("aria-expanded", String(!panel.hidden));
  if (!panel.hidden) searchInput.focus();
});

document.querySelector(".search-close").addEventListener("click", () => {
  document.querySelector("#search-panel").hidden = true;
  document.querySelector(".search-toggle").setAttribute("aria-expanded", "false");
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const nav = document.querySelector("#primary-nav");
  const isOpen = nav.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  event.currentTarget.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelector(".theme-toggle").addEventListener("click", (event) => {
  const isDark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  event.currentTarget.querySelector("span").textContent = isDark ? "Dark" : "Light";
  event.currentTarget.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  try {
    localStorage.setItem("tixora-theme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Could not save the theme preference.", error);
  }
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

function initialiseApp() {
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("tixora-theme") || "light";
  } catch (error) {
    console.warn("Could not read the theme preference.", error);
  }

  const themeButton = document.querySelector(".theme-toggle");
  if (savedTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
  }
  themeButton.querySelector("span").textContent = savedTheme === "dark" ? "Dark" : "Light";
  themeButton.setAttribute("aria-label", `Switch to ${savedTheme === "dark" ? "light" : "dark"} mode`);

  document.querySelector("#year").textContent = new Date().getFullYear();
  renderFeature();
  renderCategories();
  renderStories();
}

initialiseApp();

document.querySelector("#year").textContent = new Date().getFullYear();
try {
  const savedTheme = localStorage.getItem("tixora-theme");
  if (savedTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
    document.querySelector(".theme-toggle span").textContent = "Dark";
    document.querySelector(".theme-toggle").setAttribute("aria-label", "Switch to light mode");
  }
} catch (error) {
  console.warn("Could not load the saved theme preference.", error);
}

renderFeature();
renderCategories();
renderStories();
