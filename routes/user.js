const express=require("express")
const multer=require("multer")
const { createuser, login, getbyid, getall, loginwithout, verify, deleteuser, updateuser, changePassword, uploadimage } = require("../controller/user")
const { searchAI } = require("../controller/ai")
const router=express.Router()




/**
 * @swagger
 * /api/createuser:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with name, email, password, and phone.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ripanshu Rana
 *               email:
 *                 type: string
 *                 example: ripanshu@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               phone:
 *                 type: string
 *                 example: 9876543210
 *     responses:
 *       200:
 *         description: User created successfully
 *       404:
 *         description: All fields required
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */
router.post("/createuser",createuser)



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Login a new user with name, email, password, and phone.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:   
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: ripanshu@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User created successfully
 *       404:
 *         description: All fields required
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 */


router.post("/login",login)

router.get("/getbyid/:id",getbyid)

router.get("/getall",getall)

router.post("/loginwithotp",loginwithout)

router.post("/verify",verify)

router.delete("/delete/:id",deleteuser)

router.put("/updateuser/:id",updateuser)

router.post("/chnagepassword/:id",changePassword)

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"assests/upload")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({ storage });

router.post("/upload/:id",upload.single("avatar"),uploadimage)


router.post("/searchai",searchAI)



module.exports=router;

