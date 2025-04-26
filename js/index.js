let next = document.querySelector(".next");
let prev = document.querySelector(".prev");

next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
});

prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]); // here the length of items = 6
});

const seeMoreButtons = document.querySelectorAll(".content button");
seeMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const season = button.closest(".item").querySelector(".name").textContent;
    window.location.href = `city_info.html?season=${season}`;
  });
});


