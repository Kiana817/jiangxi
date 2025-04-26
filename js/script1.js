const images = document.querySelectorAll('.slider img');
let currentIndex = 0;

function showImage() {
  images.forEach((img, index) => {
    if (index === currentIndex) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

setInterval(nextImage, 3000);

showImage();



// 获取所有导航链接
const navLinks = document.querySelectorAll('nav ul li a');

// 为每个链接添加点击事件监听器
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // 阻止默认跳转行为
    const href = this.getAttribute('href'); // 获取链接的href属性值
    window.location.href = href; // 实现跳转
  });
});





//18张图片轮播
document.addEventListener('DOMContentLoaded', function() {
  // 图片数据 - 假设img文件夹中有18张图片，命名为image1.jpg到image18.jpg
  const images = [];
  for (let i = 1; i <= 18; i++) {
      images.push(`img/sight${i}.jpg`); // 修改为你的图片路径和命名格式
  }
  
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  
  let currentIndex = 0;
  let autoPlayInterval;
  let isPlaying = false; // 标记是否正在自动播放

  // 创建轮播项
  function createCarouselItems() {
      carousel.innerHTML = '';
      
      images.forEach((img, index) => {
          // 创建轮播项
          const item = document.createElement('div');
          item.className = 'carousel-item';
          if (index === 0) item.classList.add('active');
          
          const imgElement = document.createElement('img');
          imgElement.src = img;
          imgElement.alt = `Image ${index + 1}`;
          
          item.appendChild(imgElement);
          carousel.appendChild(item);
      });
  }
  
  // 转到指定幻灯片
  function goToSlide(index) {
      const items = document.querySelectorAll('.carousel-item');
      
      // 更新当前索引
      currentIndex = index;
      if (currentIndex >= images.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = images.length - 1;
      
      // 更新活动项
      items.forEach((item, i) => {
          item.classList.remove('active');
          if (i === currentIndex) {
              item.classList.add('active');
          }
      });
      
      // 滚动到当前项
      const activeItem = items[currentIndex];
      activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
      });
  }
  
  // 下一张幻灯片
  function nextSlide() {
      goToSlide(currentIndex + 1);
  }
  
  // 上一张幻灯片
  function prevSlide() {
      goToSlide(currentIndex - 1);
  }
  
  // 自动播放
  function startAutoPlay() {
      if (isPlaying) return; // 如果已经在播放，则不再重复启动
      autoPlayInterval = setInterval(nextSlide, 2000);
      isPlaying = true;
  }
  
  // 暂停自动播放
  function stopAutoPlay() {
      clearInterval(autoPlayInterval);
      isPlaying = false;
  }
  
  // 初始化轮播
  function initCarousel() {
      createCarouselItems();

      // 事件监听
      prevBtn.addEventListener('click', () => {
          prevSlide();
          stopAutoPlay();
      });
      
      nextBtn.addEventListener('click', () => {
          nextSlide();
          stopAutoPlay();
      });

      // 鼠标悬停暂停自动播放
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // 检测轮播图是否进入视口
  function checkCarouselInView() {
      const carouselRect = carousel.getBoundingClientRect();
      const isInView = carouselRect.top < window.innerHeight && carouselRect.bottom >= 0;

      if (isInView && !isPlaying) {
          startAutoPlay(); // 如果轮播图进入视口且未播放，则开始自动播放
      } else if (!isInView && isPlaying) {
          stopAutoPlay(); // 如果轮播图离开视口且正在播放，则暂停自动播放
      }
  }

  // 监听滚动事件
  window.addEventListener('scroll', checkCarouselInView);

  // 初始化轮播
  initCarousel();

  // 页面加载时检查一次
  checkCarouselInView();
});



 // 故事数据
 const stories = [
    {
        id: 1,
        title: "南昌起义",
        video: "videos/南昌起义.mp4",
        images: [
            "img/南昌起义1.jpg",
            "img/南昌起义2.jpg",
            "img/南昌起义3.jpg"
        ],
        sections: [
            {
                title: "起义背景",
                content: `<p>1927年，蒋介石发动"四一二"反革命政变后，国共合作彻底破裂。在汪精卫武汉国民政府也宣布"分共"的危急关头，中共中央临时政治局常委会决定发动武装起义。7月24日，中共中央正式决定在南昌举行武装起义，并组成以周恩来为书记的前敌委员会。</p>`
            },
            
            {
                title: "起义准备",
                content: `<p>起义部队由以下几部分组成：</p>
                        <ul>
                            <li>贺龙率领的国民革命军第20军（约7500人）</li>
                            <li>叶挺率领的第11军第24师（约5500人）</li>
                            <li>朱德领导的南昌军官教育团（约500人）</li>
                        </ul>`
            },
            {
                title: "历史意义",
                content: `<p>南昌起义打响了武装反抗国民党反动派的第一枪，标志着中国共产党独立领导革命战争、创建人民军队和武装夺取政权的开始。</p>`
            }
        ]
    },
    {
        id: 2,
        title: "井冈山会师",
        video: "videos/井冈山会师.mp4",
        images: [
            "img/井冈山会师1.jpg",
            "img/井冈山会师2.jpg",
            "img/井冈山会师3.jpg"
        ],
        sections: [
            {
                title: "会师背景",
                content: `<p>1928年4月，毛泽东率领的秋收起义部队与朱德、陈毅率领的南昌起义余部在井冈山胜利会师。这是中国革命史上的重大事件，壮大了革命武装力量。</p>`
            },
            {
                title: "会师经过",
                content: `<p>1928年4月28日，两支部队在宁冈砻市龙江书院举行会师大会，宣布成立中国工农红军第四军，朱德任军长，毛泽东任党代表。</p>`
            },
            {
                title: "历史意义",
                content: `<p>井冈山会师开创了"工农武装割据"的新局面，为农村包围城市、武装夺取政权的革命道路奠定了基础。</p>`
            }
        ]
    },
    {
        id: 3,
        title: "瑞金红色政权",
        video: "videos/瑞金.mp4",
        images: [
            "img/瑞金1.jpg",
            "img/瑞金2.jpg",
            "img/瑞金3.jpg"
        ],
        sections: [
            {
                title: "政权建立",
                content: `<p>1931年11月7日，中华苏维埃第一次全国代表大会在瑞金召开，宣告中华苏维埃共和国临时中央政府成立，毛泽东当选为主席。</p>`
            },
            {
                title: "主要成就",
                content: `<ul>
                            <li>颁布了《中华苏维埃共和国宪法大纲》</li>
                            <li>开展了土地革命</li>
                            <li>建立了各级苏维埃政权</li>
                        </ul>`
            },
            {
                title: "历史地位",
                content: `<p>瑞金是共和国的摇篮，中国共产党在这里开始了治国理政的伟大预演。</p>`
            }
        ]
    },
    {
        id: 4,
        title: "兴国将军县",
        video: "videos/兴国将军县.mp4",
        images: [
            "img/兴国将军县1.jpg",
            "img/兴国将军县2.jpg",
            "img/兴国将军县3.jpg"
        ],
        sections: [
            {
                title: "将军之乡",
                content: `<p>兴国县是著名的"将军县"，走出了56位开国将军，包括肖华、陈奇涵等著名将领。</p>`
            },
            {
                title: "革命贡献",
                content: `<p>当年仅有23万人口的兴国县，就有8万多人参加红军，孕育了"兴国模范师"等英雄部队。</p>`
            },
            {
                title: "红色文化",
                content: `<p>兴国山歌是革命宣传的重要形式，《苏区干部好作风》等红色歌谣广为流传。</p>`
            }
        ]
    },
    {
        id: 5,
        title: "方志敏与《可爱的中国》",
        video: "videos/英雄方志敏.mp4",
        images: [
            "img/方志敏1.jpg",
            "img/方志敏2.jpg",
            "img/方志敏3.jpg"
        ],
        sections: [
            {
                title: "革命生涯",
                content: `<p>方志敏是赣东北革命根据地和红十军的主要创建者，1935年被俘后坚贞不屈。</p>`
            },
            {
                title: "狱中著作",
                content: `<p>在狱中，方志敏写下了《可爱的中国》《清贫》等不朽著作，表达了对祖国和人民的深情。</p>`
            },
            {
                title: "精神传承",
                content: `<p>"敌人只能砍下我们的头颅，决不能动摇我们的信仰"成为共产党人的精神丰碑。</p>`
            }
        ]
    },
    {
        id: 6,
        title: "红军长征出发地",
        video: "videos/长征.mp4",
        images: [
            "img/长征1.jpg",
            "img/长征2.jpg",
            "img/长征3.jpg"
        ],
        sections: [
            {
                title: "长征起点",
                content: `<p>1934年10月，中央红军8.6万人从于都渡口出发长征，开始了伟大的战略转移。</p>`
            },
            {
                title: "人民支援",
                content: `<p>于都人民拆门板、捐木材搭建浮桥，送儿送郎当红军，为长征胜利作出了巨大贡献。</p>`
            },
            {
                title: "历史记忆",
                content: `<p>今天的于都长征渡口遗址和中央红军长征出发纪念馆，成为重要的革命传统教育基地。</p>`
            }
        ]
    },
    {
        id: 7,
        title: "小井红军医院",
        video: "videos/小井红军医院.mp4",
        images: [
            "img/小井红军医院1.jpg",
            "img/小井红军医院2.jpg",
            "img/小井红军医院3.jpg"
        ],
        sections: [
            {
                title: "医院建立",
                content: `<p>小井红军医院位于井冈山市小井村，建于1928年10月，是红军第一所正规医院。医院由张子清、曾志等红军领导亲自筹建，最初只有几间简陋的民房。</p>`
            },
            {
                title: "艰苦条件",
                content: `<p>医院条件极其艰苦：</p>
                        <ul>
                            <li>医护人员仅有20余人</li>
                            <li>医疗器械严重缺乏，用竹片做镊子，用木盆消毒</li>
                            <li>药品奇缺，主要靠中草药治疗</li>
                            <li>伤病员睡在铺稻草的地板上</li>
                        </ul>`
            },
            {
                title: "英雄事迹",
                content: `<p>1929年1月，国民党军队偷袭小井村，来不及转移的130多名重伤员和医护人员全部壮烈牺牲。医院后来重建，现为全国重点文物保护单位。</p>
                        <p>医院创始人张子清师长负伤后，把消毒用的食盐全部留给其他伤员，自己因感染牺牲，年仅28岁。</p>`
            },
            {
                title: "历史意义",
                content: `<p>小井红军医院是人民军队医疗卫生事业的开端，培育了"艰苦奋斗、救死扶伤"的红军医院精神，为后来革命根据地的医疗卫生工作积累了宝贵经验。</p>`
            }
        ]
    },
    {
        id: 8,
        title: "上饶集中营斗争",
        video: "videos/上饶集中营.mp4",
        images: [
            "img/上饶集中营1.jpg",
            "img/上饶集中营2.jpg",
            "img/上饶集中营3.jpg"
        ],
        sections: [
            {
                title: "集中营建立",
                content: `<p>1941年皖南事变后，国民党在上饶设立集中营，关押被俘的新四军将士。</p>`
            },
            {
                title: "狱中斗争",
                content: `<p>被囚志士成立秘密党支部，组织学习、策划暴动，展现了坚定的革命信念。</p>`
            },
            {
                title: "茅家岭暴动",
                content: `<p>1942年5月，26名被囚志士成功举行茅家岭暴动，震惊全国。</p>`
            }
        ]
    }
];

// 打开模态框
function openModal(storyId) {
    const modal = document.getElementById('storyModal');
    const story = stories.find(s => s.id === storyId);
    
    if (story) {
        document.getElementById('modalTitle').textContent = story.title;
        
        // 设置视频
        const video = document.getElementById('storyVideo');
        video.innerHTML = `<source src="${story.video}" type="video/mp4">您的浏览器不支持视频播放`;
        video.load();
        
        // 设置图片
        const imagesContainer = document.getElementById('storyImages');
        imagesContainer.innerHTML = '';
        story.images.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = story.title + '图片';
            imagesContainer.appendChild(img);
        });
        
        // 设置内容部分
        const contentContainer = document.getElementById('storyContent');
        contentContainer.innerHTML = '';
        
        story.sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'story-section';
            
            const title = document.createElement('h3');
            title.textContent = section.title;
            
            const content = document.createElement('div');
            content.innerHTML = section.content;
            
            sectionDiv.appendChild(title);
            sectionDiv.appendChild(content);
            contentContainer.appendChild(sectionDiv);
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('storyModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // 停止视频播放
    const video = document.getElementById('storyVideo');
    video.pause();
    video.currentTime = 0;
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('storyModal');
    if (event.target == modal) {
        closeModal();
    }
}