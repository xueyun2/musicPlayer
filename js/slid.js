function Slid(config) {
    this.schedule = document.querySelector(config.schedule)
    this.slid = document.querySelector(config.slid)
    this.fill = document.querySelector(config.fill)
    this.slidTop = document.querySelector(config.slidTop)
    this.totalDuration = config.totalTime || 26
    this.slideEventBack = config.slideEventBack || function () { }
    this.pressEventBack = config.pressEventBack || function () { }
    this.liftEventBack = config.liftEventBack || function () { }

    this.slidEvent()
}

Slid.prototype = {
    slidEvent: function () {
        let totalWidth = this.schedule.offsetWidth
        let slidWidth = this.slid.offsetWidth
        let totalLen = Math.floor(totalWidth - slidWidth)    //除去偏移和滑块的宽度
        let totalPercentage = totalLen / totalWidth * 100    //计算滑块滑动到最后的百分比
        let leftOffset = this.schedule.offsetLeft            //进度条距离右侧偏移距离
        let currentTime = 0
        this.slid.addEventListener('touchmove', (e) => {
            console.log('滑动')
            let status = Math.floor(e.targetTouches[0].clientX - slidWidth - leftOffset) / totalWidth * 100
            let statusWidth = Math.floor(e.targetTouches[0].clientX - leftOffset) / totalWidth * 100
            if (status <= 0) {
                status = 0
                statusWidth = 0
            } else if (status >= totalPercentage) {
                status = totalPercentage
                statusWidth = 100
            }
            this.slid.style.left = status + '%'
            this.fill.style.width = statusWidth + '%'
            currentTime = Math.floor(statusWidth * this.totalDuration / 100)
            this.slideEventBack(Math.floor(statusWidth * this.totalDuration / 100))
        })
        this.slid.addEventListener('touchstart', (e) => {
            this.slidTop.style.display = 'block'
            this.slid.style.transition = 'none'
            this.pressEventBack(currentTime)
            console.log('按下')
        })
        this.slid.addEventListener('touchend', (e) => {
            this.slidTop.style.display = 'none'
            this.slid.style.transition = '0.2s all'
            this.liftEventBack(currentTime)
            console.log('抬起')
        })
    },
    //更新进度
    updateSchedule: function (e) {
        let totalWidth = this.schedule.offsetWidth
        let slidWidth = this.slid.offsetWidth
        let slidProportion = slidWidth / totalWidth * 100
        let widthProportion = e / this.totalDuration * 100
        let slidOffenst = 0
        slidOffenst = e / (this.totalDuration + Math.ceil(slidProportion * this.totalDuration / 100)) * 100
        this.slid.style.left = slidOffenst + '%'
        this.fill.style.width = widthProportion + '%'

    }
}