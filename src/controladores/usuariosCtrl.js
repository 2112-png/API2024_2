import {conmysql} from '../db.js'
import bcrypt from 'bcryptjs'; //Para encriptar contraseñas se instala esta librería de encriptación
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const getUsuarios=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from usuarios ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }


export const getusuariosxid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from usuarios where usr_id=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            cli_id:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}

//export const postUsuario=
//async (req,res)=>{
//    try {
        //console.log(req.body)
//        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body

        //En esta parte se hace para encriptar la clave y generamos un valor aleatorio para hacer más segura la encriptación de la clave
        /* const random = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(usr_clave, random); */


        //console.log(cli_nombre)
        /* const [rows]=await conmysql.query('insert into usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) values(?,?,?,?,?,?)',
            [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]) */
        
//        const [rows]=await conmysql.query('insert into usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) values(?,?,?,?,?,?)',
//            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo])

//        res.send({
//            id:rows.insertId
//        })
//    } catch (error) {
//        return res.status(500).json({message:'error del lado del servidor'})
//    }
//}

export const postUsuario=
async (req, res) => {
    try {
        const { usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo } = req.body;

        // Genera el hash de la contraseña
        const hashedPassword = await bcrypt.hash(usr_clave, 10);

        const [rows] = await conmysql.query(
            'INSERT INTO usuarios (usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo) VALUES (?, ?, ?, ?, ?, ?)',
            [usr_usuario, hashedPassword, usr_nombre, usr_telefono, usr_correo, usr_activo]
        );

        res.send({
            id: rows.insertId
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor' });
    }
}


export const putUsuario=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update usuarios set usr_usuario=?, usr_clave=?, usr_nombre=?, usr_telefono=?, usr_correo=?, usr_activo=? where usr_id=?',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from usuarios where usr_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchUsuario=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update usuarios set usr_usuario=IFNULL(?,usr_usuario), usr_clave=IFNULL(?,usr_clave), usr_nombre=IFNULL(?,usr_nombre), usr_telefono=IFNULL(?,usr_telefono), usr_correo=IFNULL(?,usr_correo), usr_activo=IFNULL(?,usr_activo) where usr_id=?',
            [usr_usuario, usr_clave, usr_nombre, usr_telefono, usr_correo, usr_activo, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from usuarios where usr_id=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteUsuario=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from usuarios where usr_id=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el usuario"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}

// Nueva función para el login
export const loginUsuario = async (req, res) => {
    try {
        const { usr_usuario, usr_clave } = req.body;

        // Consulta al usuario en la base de datos
        const [result] = await conmysql.query('SELECT * FROM usuarios WHERE usr_usuario = ?', [usr_usuario]);
        if (result.length <= 0) return res.status(404).json({ message: 'Usuario no encontrado' });

        const usuario = result[0];

        // Verifica la contraseña encriptada
        const passwordValido = bcrypt.compareSync(usr_clave, usuario.usr_clave);
        if (!passwordValido) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Genera el token JWT
        const token = jwt.sign({ id: usuario.usr_id }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ auth: true, token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error del servidor' });
    }
};

/* {
    "usr_usuario": "bryanbg1230",
    "usr_clave": "wachitowa",
} */