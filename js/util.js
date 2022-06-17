//将秒转换为时间格式
function fNumToDate(seconds) {
    let hour = Math.floor(seconds / 3600) >= 10 ? Math.floor(seconds / 3600) : '0' + Math.floor(seconds / 3600);
    seconds -= 3600 * hour;
    let min = Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
    seconds -= 60 * min;
    let sec = seconds >= 10 ? seconds : '0' + seconds;
    return min + ':' + sec;
}
//弹窗
function ShowPopup(config){
    this.panel = document.querySelector(config.panel)
    this.open = document.querySelector(config.open)
    this.mask = document.querySelector('.mask')
    this.cancel = this.panel.querySelector('.cancel')
    this.open.addEventListener('click',  ()=> {
        this.show()
    });
    this.mask.addEventListener('click',()=>{
        this.hide()
    })
    this.cancel.addEventListener('click',()=>{
        this.hide()
    })
}
ShowPopup.prototype.hide=function(){
    this.panel.style.display = 'none'
    this.mask.style.display = 'none'
}
ShowPopup.prototype.show=function(){
    this.panel.style.display = 'block'
    this.mask.style.display = 'block'
}