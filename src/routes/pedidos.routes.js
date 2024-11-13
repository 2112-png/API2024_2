import { Router } from "express";
import { getPedidos, getpedidosxid, postPedido, putPedido, patchPedido, deletePedido } from "../controladores/pedidosCtrl.js"

const router=Router()

router.get('/pedidos',getPedidos)  //select
router.get('/pedidos/:id',getpedidosxid)  //select x id
router.post('/pedidos',postPedido)  //insert
router.put('/pedidos/:id',putPedido)  //update
router.patch('/pedidos/:id',patchPedido)  //update
router.delete('/pedidos/:id',deletePedido)  //delete

export default router