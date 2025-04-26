document.addEventListener('DOMContentLoaded', function () {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    let currentPage = 0;
    const totalPages = pages.length;

    // 初始化显示总页数
    totalPagesSpan.textContent = totalPages;

    function updatePage() {
        // 隐藏所有页面
        pages.forEach(page => page.classList.remove('active-page'));

        // 显示当前页
        pages[currentPage].classList.add('active-page');

        // 更新页码显示
        currentPageSpan.textContent = currentPage + 1;

        // 控制按钮状态
        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage === totalPages - 1;
    }

    // 上一页
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    });

    // 下一页
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePage();
        }
    });

    // 初始化页面
    updatePage();
});

// 视频控制函数
function openVideo(videoPath) {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    // 直接设置src属性
    videoPlayer.src = videoPath; 
    // 修复iOS自动播放限制（需用户手势）
    videoPlayer.onclick = function () {
        this.play().catch(err => {
            console.log('点击继续播放:', err);
        });
    };
    // 显示模态框并手动触发播放（现代浏览器要求用户手势）
    videoModal.style.display = 'flex';
    videoModal.classList.add('active');
    videoPlayer.play().then(() => {
        // 播放成功的处理逻辑
    }).catch((err) => {
        console.log('视频播放失败:', err);
        // 可以在这里提示用户进行一些操作，比如检查网络等
        videoPlayer.classList.add('need-click');
    });
}

function closeVideo() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
    videoModal.style.display = 'none';
    videoModal.classList.remove('active');
    videoPlayer.classList.remove('need-click');
}

// 点击外部关闭
window.addEventListener('click', function (event) {
    const videoModal = document.getElementById('videoModal');
    if (event.target === videoModal) {
        closeVideo();
    }
});