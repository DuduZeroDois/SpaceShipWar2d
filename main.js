//const pais
const canva = document.getElementById("canva")
const ctx = canva.getContext("2d")

// const do hud
const pontos = document.getElementById("pontos")
const xp = document.getElementById("XP")
const gm = document.getElementById("GM")
const wn = document.getElementById("WN")
const reset = document.getElementById("reset")

// let do hud
let pontosL = 0
let xpL = 100
let gmL = false

//objetos
const nave = {x:400,y:560,w:40,h:20,speed:6}
const tecla = {}

//arrys
const bala = []
const inimigos = []

//som --depois

//criar inimigos
function CreateEnemie () {
    inimigos.length = 0
    for (let i = 0; i < 7; i++) {
        inimigos.push({x:100 + i * 90,y:50,w:40,h:20,speed:1 +Math.random() *1})
    }
    
}
CreateEnemie()

//escutador de teclas
document.addEventListener("keydown", e =>{
    tecla[e.key] = true
    if (e.key === " ") {
        bala.push({x: nave.x + nave.w /2 -2, y: nave.y, w:4, h: 10})
    }
})
document.addEventListener("keyup", e=> tecla[e.key] = false)
//game over
function cgo() {
    for (let element of inimigos) {
        if (element.y + element.h >= nave.y && element.x < nave.x + nave.w && element.x + element.w > nave.x) {
            return true
        }
    }
    return xpL <= 0
}
//reniciar
function Reset() {
    pontosL = 0
    xpL = 100
    gmL = false
    bala.length = 0
    CreateEnemie()
    nave.x = 400
    nave.y = 560
    xp.textContent = xpL
    pontos.textContent = pontosL
    gm.style.display = "none"
    wn.style.display = "none"
    requestAnimationFrame(GameLoop)
}
//game loop
function GameLoop() {
    if(gmL == true)return
    ctx.clearRect(0, 0, canva.width, canva.height)
    if (tecla["a"]) nave.x -= nave.speed
    if (tecla["d"]) nave.x += nave.speed
    nave.x = Math.max(0, Math.min(canva.width - nave.w, nave.x))
    //desenhando nave
    ctx.fillStyle = "lime"
    ctx.fillRect(nave.x, nave.y, nave.w, nave.h)
    //desenhando bala
    ctx.fillStyle = "yellow"
    for (let i = bala.length -1; i >= 0; i--) {
        const b = bala[i]
        b.y -= 8
        ctx.fillRect(b.x, b.y, b.w, b.h)
        if (b.y < 0) bala.splice(i,1)
    }
    //Desenhar inimigos
    ctx.fillStyle = "red"
    for (let i = inimigos.length -1; i >= 0; i--) {
        const c = inimigos[i]
        c.y += c.speed
        ctx.fillRect(c.x, c.y, c.w, c.h)
        if (c.y > canva.height) {
            xpL -= 10
            xp.textContent = xpL
            c.y = -20
            c.x = Math.random() *(canva.width - c.w)
        }
        for (let i2 = bala.length - 1; i2 >= 0; i2--) { //verificar colisão com as balas
            const b2 = bala[i2]
            if (b2.x < c.x + c.w && b2.x + b2.w > c.x && b2.y < c.y + c.h && b2.y + b2.h > c.y) {
                inimigos.splice(i, 1)
                bala.splice(i2,1)
                pontosL++
                pontos.textContent = pontosL
                break
            }
        }
    }
    //Check game over
    if (cgo()) {
        gmL = true
        gm.style.display = "flex"
        return
    }
    //Check winner
    if (inimigos.length === 0) {
        wn.style.display = "flex"
        gmL = true
        return        
    }
    requestAnimationFrame(GameLoop)
}
reset.onclick = Reset
requestAnimationFrame(GameLoop)