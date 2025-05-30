const carouselTrack = document.getElementById("carouselTrack");
const caption = document.getElementById("caption");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const carouselNav = document.getElementById("carouselNav");
const autoPlayButton = document.getElementById("autoPlayButton");
const carousel_nav = document.getElementsByClassName("carousel-nav");

const images = [
  {
    url: "https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Beautiful Mountain Landscape",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Ocean Sunset View",
  },
  {
    url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Autumn Forest Path",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Urban City Skyline",
  },
];

let currentIndex = 0;
let img;
let carouNav;
function imageCrowsel() {
  images.forEach((image, index) => {
    img = document.createElement("img");
    img.setAttribute("src", image.url);
    img.className = "carousel-slide";
    carouselTrack.appendChild(img);

    carouNav = document.createElement("div");
    carouNav.className = "carousel-indicator";
    carouNav.setAttribute("id", index);
  
    
    carouselNav.appendChild(carouNav);
   
    
  });
  document.getElementById(currentIndex).style.backgroundColor = "blue"
}

imageCrowsel();


caption.innerHTML = images[currentIndex].caption;

function nextImage() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    caption.innerHTML = images[currentIndex].caption;
    document.getElementById(currentIndex).style.backgroundColor = "blue"
    document.getElementById(currentIndex-1).removeAttribute("style")
    
    
  } else {
    currentIndex = 0;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    caption.innerHTML = images[currentIndex].caption;
    document.getElementById(currentIndex).style.backgroundColor = "blue"
    document.getElementById(images.length - 1).removeAttribute("style")

  }
}

function previousImage() {
  if (currentIndex > 0) {
    currentIndex--;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    caption.innerHTML = images[currentIndex].caption;
    document.getElementById(currentIndex).style.backgroundColor = "blue"
    document.getElementById(currentIndex+1).removeAttribute("style")
  } else {
    currentIndex = images.length - 1;
    carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    caption.innerHTML = images[currentIndex].caption;
    document.getElementById(currentIndex).style.backgroundColor = "blue"
    document.getElementById(currentIndex-currentIndex).removeAttribute("style")
  }
}
let interval;
let counter = 0
autoPlayButton.addEventListener("click", (e) => {
  interval = setInterval(()=>{
    nextImage()
    counter++
    if(counter >= image.length){
      counter = 0
    }
    
  }, 2000);

});

nextButton.addEventListener("click", (e) => {
  nextImage();
  clearInterval(interval);
});

prevButton.addEventListener("click", (e) => {
  previousImage();
  clearInterval(interval);
});



