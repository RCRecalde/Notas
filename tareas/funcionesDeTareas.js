const fs = require('fs');
const tareas = JSON.parse(fs.readFileSync('./tareas/tareas.json','utf-8'))
module.exports = {
    verCartel : function(mensaje){
        console.log('------------------------');
        console.log(mensaje);
        console.log('------------------------');
    },
    agregarTarea : function(titulo='sin título',estado='pendiente'){
        let nuevaTarea = { 
            titulo,
            estado
        }
        tareas.push(nuevaTarea)
        this.guardarJson(tareas)
        this.verCartel('¡Tarea agregada con éxito!')
        this.listarTareas()
    },
    listarTareas : function(){
        tareas.forEach(tarea => {
                console.log(tarea);
        });
    },
    filtrarTareas : function(filtro){
        let tareasFiltradas = tareas.filter(tarea => tarea.estado === filtro || tarea.titulo.includes(filtro));
        return console.log(tareasFiltradas);
    },
    deshacer : function(){
        tareas.pop()
        this.guardarJson(tareas)
        this.verCartel('¡Tarea eliminada con éxito!')
        this.listarTareas()
    },
    guardarJson : function(tareas){
        fs.writeFileSync('./tareas/tareas.json',JSON.stringify(tareas, null, 2),'utf-8')
    },
    cualquierTexto : function(texto){
        if (texto !== this.listarTareas || texto !== this.agregarTarea || texto !== this.filtrarTareas || texto !== this.deshacer) {
            return this.verCartel('No entiendo qué quieres hacer.')
        }
    },
    sinAccion : function(){
         this.verCartel('¡Atención!: Tienes que pasar una acción.')
    }
}