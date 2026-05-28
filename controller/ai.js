const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAi=new GoogleGenerativeAI("AIzaSyDor5_0WXPBsuaU2yjJwt0RKTIW46966P0")
const searchAI=async(req,res)=>{
    try{
        const {query}=req.body;
       const model = genAi.getGenerativeModel({
   model: "gemini-2.0-flash"
});
        const result= await model.generateContent(query)
        const response=result.response.text();
        res.json({success:true,answer:response})
    }
    catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error aa gaya",
    });
}
}
module.exports = {
  searchAI
};
