function cerrarSesion() {

  window.location.href = "login.html";
}

var usuarioLogueado = localStorage.getItem("usuarioLogueado");
if (!usuarioLogueado || usuarioLogueado !== "true") {
    // Si el usuario no ha iniciado sesión, redirigirlo a la página de inicio de sesión.
    window.location.href = "login.html";
}

var nombreUsuario = localStorage.getItem("nombreUsuario");
document.getElementById("nombreUsuario").textContent = nombreUsuario;

const allStories = [
    {
      id: 0,
      author: "Batman",
      imageUrl: "images/1.jpg",
    },
  
    {
      id: 1,
      author: "Homero",
      imageUrl: "images/2.jpg",
    },
  
    {
      id: 2,
      author: "Goku",
      imageUrl: "images/3.jpg",
    },
  
    {
      id: 3,
      author: "Ben",
      imageUrl: "images/4.jpg",
    },
  
    {
      id: 4,
      author: "Tokito",
      imageUrl: "images/5.jpg",
    },
  
    {
      id: 5,
      author: "Goyo",
      imageUrl: "images/6.jpg",
    },
  
    {
      id: 6,
      author: "Godzilla",
      imageUrl: "images/7.jpg",
    },
  
    {
      id: 7,
      author: "Miu",
      imageUrl: "images/8.jpg",
    },
  
    {
      id: 8,
      author: "Gohan",
      imageUrl: "images/9.jpg",
    },
  
    {
      id: 9,
      author: "NBA",
      imageUrl: "images/10.jpg",
    },
  
    {
      id: 9,
      author: "Paisajes",
      imageUrl: "images/11.jpg",
    },
  
    {
      id: 9,
      author: "Audi",
      imageUrl: "images/12.jpg",
    },
  
    {
      id: 9,
      author: "Avion",
      imageUrl: "images/13.jpg",
    },
  ];
  
  const stories = document.querySelector(".stories");
  const storiesFullView = document.querySelector(".stories-full-view");
  const closeBtn = document.querySelector(".close-btn");
  const storyImageFull = document.querySelector(".stories-full-view .story img");
  const storyAuthorFull = document.querySelector(
    ".stories-full-view .story .author"
  );
  const reactionButtons = document.querySelectorAll(".reaction-btn");
  const nextBtn = document.querySelector(".stories-container .next-btn");
  const previousBtn = document.querySelector(".stories-container .previous-btn");
  const storiesContent = document.querySelector(".stories-container .content");
  const nextBtnFull = document.querySelector(".stories-full-view .next-btn");
  const previousBtnFull = document.querySelector(
    ".stories-full-view .previous-btn"
  );
  
  let currentActive = 0;
  
  let autoChangeInterval;
 
  reactionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const reactionType = button.getAttribute("data-reaction");
      reactToPhoto(reactionType);
    });
  });
  
  function reactToPhoto(reactionType) {
    // Implement your logic to handle reactions here
    // For example, you can update a database or perform other actions
    console.log(`Reacted with ${reactionType}`);
  }

  const reactions = {
    'like': 0,
    'love': 0,
    'haha': 0,
    // Agrega más reacciones según sea necesario
};

function updateReactionCounts() {
  const reactionsSection = document.querySelector('.reactions-section');
  reactionsSection.innerHTML = '';

  for (const reactionType in reactions) {
      const count = reactions[reactionType];
      const button = document.createElement('button');
      button.className = 'reaction';
      button.textContent = count + ' ' + getReactionEmoji(reactionType);
      button.onclick = () => react(reactionType);
      reactionsSection.appendChild(button);
  }
}

function getReactionEmoji(type) {
  switch (type) {
      case 'like':
          return '👍';
      case 'love':
          return '❤️';
      case 'haha':
          return '😄';
      default:
          return '';
  }
}

// Añade esta función para reaccionar a las historias
function react(type) {
  reactions[type]++;
  updateReactionCounts();
}

updateReactionCounts();

  const startAutoChange = () => {
    autoChangeInterval = setInterval(() => {
      if (currentActive < allStories.length - 1) {
        currentActive++;
      } else {
        currentActive = 0;
      }
      updateFullView();
    }, 5000); // Cambio automático después de 5 segundos
  };
  
  const stopAutoChange = () => {
    clearInterval(autoChangeInterval);
  };

  const createStories = () => {
    allStories.forEach((s, i) => {
      const story = document.createElement("div");
      story.classList.add("story");
      const img = document.createElement("img");
      img.src = s.imageUrl;
      const author = document.createElement("div");
      author.classList.add("author");
      author.innerHTML = s.author;
  
      story.appendChild(img);
      story.appendChild(author);
  
      stories.appendChild(story);
  
      story.addEventListener("click", () => {
        showFullView(i);
      });
    });
  };
  
  createStories();
  
  const showFullView = (index) => {
    currentActive = index;
    updateFullView();
    storiesFullView.classList.add("active");
    startAutoChange();
  };
  
  closeBtn.addEventListener("click", () => {
    storiesFullView.classList.remove("active");
    stopAutoChange();
  });
  
  const updateFullView = () => {
    storyImageFull.src = allStories[currentActive].imageUrl;
    storyAuthorFull.innerHTML = allStories[currentActive].author;
  };
  
  nextBtn.addEventListener("click", () => {
    storiesContent.scrollLeft += 300;
  });
  
  previousBtn.addEventListener("click", () => {
    storiesContent.scrollLeft -= 300;
  });
  
  storiesContent.addEventListener("scroll", () => {
    if (storiesContent.scrollLeft <= 24) {
      previousBtn.classList.remove("active");
    } else {
      previousBtn.classList.add("active");
    }
  
    let maxScrollValue =
      storiesContent.scrollWidth - storiesContent.clientWidth - 24;
  
    if (storiesContent.scrollLeft >= maxScrollValue) {
      nextBtn.classList.remove("active");
    } else {
      nextBtn.classList.add("active");
    }
  });
  
  nextBtnFull.addEventListener("click", () => {
    if (currentActive >= allStories.length - 1) {
      return;
    }
    currentActive++;
    updateFullView();
  });
  
  previousBtnFull.addEventListener("click", () => {
    if (currentActive <= 0) {
      return;
    }
    currentActive--;
    updateFullView();
  });