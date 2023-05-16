import React from 'react'

const Formulario = () => {
    //estados - hooks
    const [nombre, setNombre]=React.useState('')
    const [apellido, setApellido]=React.useState('')
    const [lista, setLista]=React.useState([])
    const [editar, setEditar] = React.useState(-1)


    // guardar 
    const guardarDatos=(e)=>{
        e.preventDefault()
        //validaciones
        if (!nombre) {
            alert('falta el nombre')
            return
        }

        if (!apellido) {
            alert('falta el apellido')
            return
        }
        
        //guardar en la lista
        if (editar === -1) {
            // Nuevo usuario
            setLista([...lista, { nombre, apellido}])
          } else {
            // Editar usuario
            const updatedList = [...lista]
            updatedList[editar] = { nombre, apellido }
            setLista(updatedList)
            setEditar(-1)
          }
        //limpiar inputs y estados
        e.target.reset()
        //limpiar estados
        setNombre('')
        setApellido('')
    } 

  const eliminarUsuario = (nombre)=>{
    const eliminar = lista.filter (item => item.nombre !== nombre)
    setLista(eliminar)
  }

  const editarUsuario = (index)=>{
    const user = lista[index]
    setNombre(user.nombre)
    setApellido(user.apellido)
    setEditar(index)
  }

  return (
    <div className='container'>

        <h2 className='text-warning text-center'>Formulario de registro de usuario</h2>
        <form onSubmit={guardarDatos}>
            <input type="text" 
            placeholder='ingrese el Nombre'
            className='form-control mb-3'
            onChange={(e)=>setNombre(e.target.value.trim())}
            
            />
             <input type="text" 
            placeholder='ingrese el Apellido'
            className='form-control mb-3'
            onChange={(e)=>setApellido(e.target.value.trim())}
            
            />
            <div className='d-grid gap-2'>
            <button type='submit' className='btn btn-outline-dark'> {editar === -1 ? 'Registrar' : 'Editar'}</button>

            </div>
        </form>
        <hr />
        <ol className='list-group'>
            {
                lista.map((item, index)=>(<li className='list-group-item bg-warning' key={index}>{item.nombre} {item.apellido}
                <button onClick={()=>{eliminarUsuario(item.nombre)}} className='btn btn-danger float-end'>Eliminar</button>

                <button onClick={()=>{editarUsuario(index)}} className='btn btn-primary float-end'>Editar</button>
                </li>))
            }
        </ol>
    </div>

  )
}

export default Formulario