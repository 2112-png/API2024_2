import {conmysql} from '../db.js'
export const getPedidos_Detalle=
async (req,res)=>{
    try {
        const [result] = await conmysql.query(' select * from pedidos_detalle ')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar detalles del pedido"})
    }
}

export const getpedidos_detallexid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from pedidos_detalle where det_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Detalle del pedido no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}

export const postPedido_Detalle=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {prod_id, ped_id, det_cantidad, det_precio}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) values(?,?,?,?)',
            [prod_id, ped_id, det_cantidad, det_precio])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const putPedido_Detalle=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {prod_id, ped_id, det_cantidad, det_precio}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update pedidos_detalle set prod_id=?, ped_id=?, det_cantidad=?, det_precio=? where det_id=?',
            [prod_id, ped_id, det_cantidad, det_precio, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Detalle del pedido no encontrado'
        })
        const[rows]=await conmysql.query('select * from pedidos_detalle where det_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchPedido_Detalle=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {prod_id, ped_id, det_cantidad, det_precio}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update pedidos_detalle set prod_id = IFNULL(?, prod_id), ped_id = IFNULL(?, ped_id), det_cantidad = IFNULL(?, det_cantidad), det_precio = IFNULL(?, det_precio) where det_id=?',
            [prod_id, ped_id, det_cantidad, det_precio, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Detalle del pedido no encontrado'
        })
        const[rows]=await conmysql.query('select * from pedidos_detalle where det_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deletePedido_Detalle=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from pedidos_detalle where det_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el detalle del pedido"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}