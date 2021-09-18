const form = document.querySelector('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const submit = document.getElementById('submit');
const para = document.querySelector('p');

form.onsubmit = function (e) {
    if (fname.value === '' || lname.value === '') {
        // 如果测试文本为空，则在事件对象上调用preventDefault()函数，这样就停止了提交。
        e.preventDefault();
        para.textContent = 'You need to fill in both names!';
    }
}
