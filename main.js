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
const nave = {x:400,y:560,w:40,h:20,speed:7}
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