document.addEventListener('keydown', function(e) {
    /*switch(e.code) {
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowDown':    
            imageManager.execute(e.code)
        break    
    }*/
    // check if method in imageManager exist
    if(imageManager.hasOwnProperty(e.code)) {
        imageManager.execute(e.code)
    }
})

let imageManager = {
    image: document.querySelector('.twitter-picture'),
    ArrowUp: function() {
        this.image.style.top = this.image.offsetTop - 10 + 'px'
    },
    ArrowLeft: function() {
        this.image.style.left = this.image.offsetLeft - 10 + 'px'
    },
    ArrowRight: function() {
        this.image.style.left = this.image.offsetLeft + 10 + 'px'
    },
    ArrowDown: function() {
        this.image.style.top = this.image.offsetTop + 10 + 'px'
    },
}

imageManager.execute = function (key) {
    let methodName = imageManager[key]
    return methodName.apply(imageManager)
}

function randomMove() {
    let randomNumber = Math.floor(Math.random() * 4)
    let move

    switch(randomNumber) {
        case 1:
            move = 'ArrowUp'
        break
        case 2:
            move = 'ArrowLeft'
        break
        case 3:
            move = 'ArrowRight'
        break
        case 4:    
            move = 'ArrowDown'
        break 
    } 

    return move
}

setInterval(function() {
    let newMove = randomMove()
    if(imageManager.hasOwnProperty(newMove)) {
        imageManager.execute(newMove)
    }
}, 500)