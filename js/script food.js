
// 美食分类相关
const categories = document.querySelectorAll('.category');
const categoryContent = document.getElementById('category-content');

categories.forEach(category => {
  category.addEventListener('click', function () {
    categories.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    // 这里可以根据点击的分类加载不同的内容，目前简单隐藏所有再显示第一个
    const contentItems = categoryContent.querySelectorAll('.content-item');
    contentItems.forEach(item => item.style.display = 'none');
    contentItems[0].style.display = 'flex';
  });
});

// 特产推荐轮播相关（简单示例，未实现完整轮播逻辑）
const productItems = document.querySelectorAll('.product-item');
let currentIndex = 0;

function showProduct() {
  productItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.style.transform = 'translateX(0)';
    } else {
      item.style.transform = 'translateX(-100%)';
    }
  });
}

showProduct();
setInterval(() => {
  currentIndex = (currentIndex + 1) % productItems.length;
  showProduct();
}, 3000);

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  let currentIndex = 0;

  function showItem(index) {
    const offset = -(index * (items[index].offsetWidth + 16)); // 计算偏移量，考虑间距
    carousel.style.transform = `translateX(${offset}px)`;
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  }

  function prevItem() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  }

  document.querySelector('.next-btn').addEventListener('click', nextItem);
  document.querySelector('.prev-btn').addEventListener('click', prevItem);

  // 自动播放功能（可选）
  setInterval(nextItem, 5000); // 每5秒自动切换到下一个项目
});

