const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
for (let i = 1; i <= 5; i++) {
    let imgElement = document.createElement('img');
    imgElement.setAttribute('src','images/'+'pic'+i+'.jpg')
    thumbBar.appendChild(imgElement);
}

/* 切换图片功能 */
thumbBar.addEventListener('click',function (e) {
    if (e.target && e.target.nodeName === 'IMG') {
        let src = e.target.getAttribute('src');
        displayedImage.setAttribute('src', src);
    }
})

/* 编写 变暗/变量 按钮功能 */
btn.addEventListener('click',function (e) {
    if ('dark' === btn.getAttribute('class')) {
        btn.setAttribute('class', 'light');
        btn.textContent = '变亮';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = '变暗';
        overlay.style.backgroundColor = 'rgb(0,0,0,0)';
    }

})