let myImage = document.querySelector('img');

myImage.onclick = function () {
    let imageSrc = myImage.getAttribute("src");
    if (imageSrc === 'images/firefox-icon.jfif') {
        myImage.setAttribute("src", "images/chrome.png");
    } else if (imageSrc === 'images/chrome.png') {
        myImage.setAttribute("src", "images/firefox-icon.jfif");

    }

}

let myButton = document.querySelector('button');
let myHead = document.querySelector('h1');

let str = ', mozilla is so cool';

function setUsername() {
    let myName = prompt("请输入你的名字.");
    if (!myName) {
        alert("用户名不能为空，请重新输入")
        setUsername();
    } else {
        localStorage.setItem('name', myName);
        myHead.textContent = myName + str;
    }
}

if (!localStorage.getItem('name')) {
    setUsername();
} else {
    let storedName = localStorage.getItem('name');
    myHead.textContent = storedName + str;
}

myButton.onclick = function () {
    setUsername();
};