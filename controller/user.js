const User=require("../model/user")
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")

const generateOtp = () => {
  let digits = "0123456789";
  let otp = "";

  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  return otp;
};

// wmail:test1290165@gmail.com
// pass=drvw lyja bcln jffa

const transport=nodemailer.createTransport({
  host: "smtp.gmail.com",
  port:465,
  secure:true,
  auth:{
    user:"test1290165@gmail.com",
    pass:"drvw lyja bcln jffa"
  }
})


const createuser=async(req,res)=>{
try{
    const {name,email,password,phone}=req.body;
    if(!name || !email || !password || !phone){
      return  res.status(404).json({message:"all feilds required!!!!!"})
    }
    const user=await User.findOne({email})
    if(user){
      return  res.status(409).json({message:"email  already registered..."})
    }
    const hashpass=await bcrypt.hash(password,10)
    const newuser=await new User({
        name,email,phone,password:hashpass
    })
    newuser.save()

    res.status(200).json({message:"user Created Successfully",newuser})
}
catch(error){
    res.status(500).json({message:"internal server error"})
}
}

const login = async (req, res) => {
 try {
 
        const { email, password } = req.body;
 
        // check email
        const user = await User.findOne({ email })
 
        if (!user) {
            return res.status(404).json({
                message: "Email not found"
            })
        }
 
        // compare password
        const isMatch = await bcrypt.compare(password, user.password)
 
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        } 
 
        res.status(200).json({
            message: "Login successful"
        })
 
    } catch (error) {
 
        res.status(500).json({
            message: "Server Error"
        })
 
    }
 
};

const getbyid=async(req,res)=>{
  try{
const userid=req.params.id;

const user=await User.findById(userid)
if(!user){
  return res.status(404).json({message:"not found"})
}
res.status(200).json({message:"Data fetched Succesfully",user})
  }
   catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getall=async(req,res)=>{
  const user=await User.find()
  res.status(200).json({message:"Data",user})
}


const loginwithout=async(req,res)=>{
  try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!email){
      return res.status(404).json({message:"Email not found"})
    }
    const comparepass=await bcrypt.compare(password, user.password)

    if(!comparepass){
      return res.status(400).json({message:"Incorrect Passwowrd"})
    }

    const otp=generateOtp()
     user.otp = otp;
      await user.save();

      const mailoption={
        from:"test1290165@gmail.com",
        to:user.email,
        sub:"OTP VERIFICATION",
        text:`Hello ${user.name} Your OTP is ${otp}`
      }

      transport.sendMail(mailoption)

    res.status(200).json({message:"OTP send Successfully"})

  }
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

const verify=async(req,res)=>{
  try{
    const {email,otp}=req.body
    const user=await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"email not found"})
    }
    if(user.otp===otp){

      user.otp=null
      await user.save();

      return res.status(200).json({message:"OTP Verify Successfully"})
    }
else{
  return res.status(401).json({message:"invalid OTP"})
}
  }
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  
}

const deleteuser=async(req,res)=>{
  try{
    const userid=req.params.id
    const user=await User.findByIdAndDelete(userid)
    if(!user){
      return res.status(404).json({message:"USerid not found"})
    }
    return res.status(200).json({message:"User Delete Sucessfully"})
  }
   catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  

}

const updateuser=async(req,res)=>{
  try{
    const userid=req.params.id
    const {name,email,phone}=req.body
    if(!name || !email || !phone){
      return res.status(404).json({message:"All feild required"})
    }
    const user= await User.findByIdAndUpdate(userid,{
      name,email,phone
    },
  {new:true})
  res.status(201).json({message:"user update sucessfully",user})

  }
  catch(error){
    return res.status(500).json({message: "internal server error"})
  }
}

const changePassword = async (req, res) => {
  try {
    const userid = req.params.id;

    // user find
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { oldpass, newpass } = req.body;

    // validation
    if (!oldpass || !newpass) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // compare old password
    const compare = await bcrypt.compare(oldpass, user.password);

    if (!compare) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newpass, 10);

    // update password
    user.password = hashedPassword;

    await user.save();

    return res.json({ message: "Password updated successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


const uploadimage=async(req,res)=>{
  try{
const userid=req.params.id
const user=await User.findById(userid)
if(!user){
  return res.status(404).json({message:"User not Found"})
}
if(!req.file){
  return res.status(400).json({message:"File not upload"})
}
user.avatar=req.file.originalname
await user.save()
res.status(200).json({message:"file uploaded successfully",user})
  }
  catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}



module.exports={createuser,login,getbyid,getall,loginwithout,verify,deleteuser,updateuser,changePassword,uploadimage}