let audio = document.querySelector('.audio-control');
let playButt = document.querySelector('#play-butt');
let totalTime = document.getElementsByClassName('total-time');   // 总时间
let currentTime = document.getElementsByClassName('current-time'); //当前时间
let playImg = ['./img/start.png', './img/pause.png']
let globalTotalTime = 0
let isUpdate = true
//设置时间到视图上
function setTime(parDuration, parCurrentTime) {
    parDuration = parDuration || Math.floor(audio.duration)
    parCurrentTime = parCurrentTime || Math.floor(audio.currentTime)
    for (let i = 0; i < totalTime.length; i++) {
        totalTime[i].innerHTML = fNumToDate(parDuration)
        currentTime[i].innerHTML = fNumToDate(parCurrentTime)
    }
}
//滑块
let slid = new Slid({
    schedule: '.schedule',
    slid: '#slid',
    fill: '.filling',
    slidTop: '#slid-top',
    slideEventBack: function (e) {
        audio.currentTime = e
        setTime(null, e)
    },
    pressEventBack: function (e) {
        isUpdate = false
        console.log(e, '按下返回时间')
    },
    liftEventBack: function (e) {
        isUpdate = true
        audio.currentTime = e
        audio.play();
        console.log(e, '抬起返回时间')

    }
})
//音频加载完成
audio.oncanplay = function () {
    audio.playbackRate = 1
    setTime()
}
//监听音频播放
let cont = 0
audio.ontimeupdate = function () {
    slid.totalTime = fNumToDate(Math.floor(audio.duration))
    let current = Math.floor(audio.currentTime)

    if (current - cont == 1 && isUpdate) {
        console.log(current)
        slid.updateSchedule(current)
    }
    setTime()
    cont = current
}
//监听暂停事件
audio.onpause = function () {
    playButt.src = playImg[1]
}
//监听播放事件
audio.onplay = function () {
    playButt.src = playImg[0]
}
//点击按钮进行播放
playButt.addEventListener('click', function () {
    if (audio.paused) {
        audio.play()
        playButt.src = playImg[0]
    } else {
        audio.pause()
        playButt.src = playImg[1]
    }
})
// 设置倍率弹窗
let speedPopup = new ShowPopup({
    open: '#speed',
    panel: '#popup-speed'
})
//设置倍率
listClick('speed-item',function(value,icon){
    let speed = document.getElementById('speed')
    speed.src = icon
    audio.playbackRate = value
    console.log(value,'查看')
    speedPopup.hide()
})
//设置循环
let setCyclePopup = new ShowPopup({
    open: '#set-cycle',
    panel: '#cycle'
})
listClick('cycle-item',function(value,icon){
    let speed = document.getElementById('set-cycle')
    speed.src = icon
    console.log(value,'循环类型')
    setCyclePopup.hide()
})
/**
 * 弹窗列表点击
 * @param {string} item  必须是个类名
 * @param {funciton} callback  回调函数 
 */
function listClick(item,callback){
    let speedItem = document.getElementsByClassName(item);
    for (let i = 0; i < speedItem.length; i++) {
        speedItem[i].addEventListener('click', function () {
            console.log(this.classList.toString(), this.classList)
            let value = this.getAttribute('data-value')
            let icon = this.getAttribute('data-src')
            for (let i = 0; i < speedItem.length; i++) {
                speedItem[i].classList.remove('active')
            }
            this.classList.add('active')
            callback(value,icon)
        })
    }
}
//快进15s退后15s
retreatAndGoAhead();
function retreatAndGoAhead(){
    let retreat = document.getElementById('retreat')
    let goAhead = document.getElementById('goAhead')
    goAhead.addEventListener('click',function(){
        let currentTime = audio.currentTime-0
        let duration = audio.duration-0
        this.classList.add('rotate-right')
        let timer = setTimeout(()=>{
            this.classList.remove('rotate-right')
        },1000)
        if(currentTime+15>duration){
            currentTime=duration
        }else{
            currentTime=currentTime+15
        }
        //rotateIn出
        audio.currentTime = currentTime
        slid.updateSchedule(currentTime)
    })
    retreat.addEventListener('click',function(){
        let currentTime = audio.currentTime-0
        this.classList.add('rotate-left')
        let timer = setTimeout(()=>{
            this.classList.remove('rotate-left')
        },1000)
        if(currentTime-15<0){
            currentTime=0
        }else{
            currentTime=currentTime-15
        }
        audio.currentTime = currentTime
        slid.updateSchedule(currentTime)
    })
}
