import { Router } from "express";
import { getUsuarios, getusuariosxid, postUsuario, putUsuario, patchUsuario, deleteUsuario, loginUsuario } from "../controladores/usuariosCtrl.js";
import { verificarToken } from '../middlewares/authJWT.js';

const router=Router()

router.post('/login', loginUsuario); // Ruta de autenticación

router.get('/usuarios', verificarToken, getUsuarios)  //select
router.get('/usuarios/:id', verificarToken, getusuariosxid)  //select x id
router.post('/usuarios', verificarToken, postUsuario)  //insert
router.put('/usuarios/:id', verificarToken, putUsuario)  //update
router.patch('/usuarios/:id', verificarToken, patchUsuario)  //update
router.delete('/usuarios/:id', verificarToken, deleteUsuario)  //delete

export default router