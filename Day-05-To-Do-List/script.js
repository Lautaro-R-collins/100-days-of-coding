const listaTareas = document.querySelector('#listaTareas')
const nuevaTarea = document.querySelector('#nuevaTarea')
const botonEnter = document.querySelector('#boton-enter')
const elemento = document.querySelector('#elemento')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST
let id = 0

//funcion para agregar una nueva tarea 

function agregarTarea (tarea,id,realizado,eliminado) {

    if(eliminado) {
        return
    }

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? lineThrough : ''


       const elemento = `<li id="elemento">
                             <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                             <p class="text" ${LINE}">${tarea}</p>
                             <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                         </li>
                        `

        listaTareas.insertAdjacentHTML("beforeend", elemento)
}

//funcion para validar la tarea realizada

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

//funcion para eliminar tarea 

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

//botones para enviar tarea (botonPlus+enter)

botonEnter.addEventListener('click',()=> {
    const tarea = nuevaTarea.value 
    if (tarea) {
        agregarTarea(tarea,id,false, false)
        LIST.push ({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
    }
    nuevaTarea.value = ''
    id++
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

document.addEventListener('keyup', function(event) {
    if (event.key == 'Enter') {
        const tarea = nuevaTarea.value
        if (tarea) {
            agregarTarea(tarea,id,false, false)
            LIST.push({
                nombre : tarea,
                id : id,
                realizado : false,
                eliminado : false
            })
        }
        nuevaTarea.value = ''
        id++
        localStorage.setItem('TODO',JSON.stringify(LIST))
    }
})

listaTareas.addEventListener('click', function(event) {
    const element = event.target
    const elementData = element.attributes.data.value
    if (elementData === 'realizado') {
        tareaRealizada(element)
    }
    else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

// guardar la lista de tareas

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}