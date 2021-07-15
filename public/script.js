
  

const listarMisImagenes = async () =>{
    const listadoImagenes = await axios("/imagenes")
    return listadoImagenes.data
}


(async () =>{
    const imagenes = await listarMisImagenes()  
    console.log(imagenes);   
    imagenes.forEach((imagen)=>{
        $("#listaImagenes").append(`
        <img src="imagenes/${imagen}" width="200" data-toggle="popover1" />
        `)             
    })    
    
$(function () {
    $('[data-toggle="popover1"]').popover({
        content : "<b class='btn btn-danger'>X</b>",
        html: true
    })
  })


  
})()


  
