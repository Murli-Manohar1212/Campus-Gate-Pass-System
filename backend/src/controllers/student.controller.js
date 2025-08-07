import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { Activity } from "../models/activity.model.js";

const registerStudent = asyncHandler(async (req, res) => {
    const {
        Name, Password, Email, rollNo, Branch,
        Course, State, Village, PostOffice,
        PoliceStation, District, PinCode, AcdemicYear
    } = req.body;

    // Check if any field is empty
    if (
        [Name, Password, Email, rollNo, Branch,
            Course, State, Village, PostOffice,
            PoliceStation, District, PinCode, AcdemicYear
        ].some(field => typeof field === "string" && field.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if student already exists
    const existedStudent = await Student.findOne({ rollNo });

    if (existedStudent) {
        throw new ApiError(409, "Student already exists");
    }

    // Create new student
    const student = await Student.create({
        Name: Name.toLowerCase(),
        Password,
        Email,
        rollNo,
        Branch,
        Course,
        State,
        Village,
        PostOffice,
        PoliceStation,
        District,
        PinCode,
        AcdemicYear
    });

    const createdStudent = await Student.findById(student._id).select("-Password");

    if (!createdStudent) {
        throw new ApiError(500, "Something went wrong while registering the student");
    }

    return res.status(201).json(
        new ApiResponse(201, createdStudent, "Student registered successfully")
    );
});

const generateAccessTokenAndRefreshToken = async (studentId) => {
  try {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    const accessToken = student.generateAccessToken();
    const refreshToken = student.generateRefreshToken();

    student.refreshToken = refreshToken;
    await student.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);  // helpful for debugging
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const loginStudent = asyncHandler(async (req, res) =>{
    // req body->data;
    // roll no 
    // find the student 
    // password chek
    // acess ans refresh token
    // send cookie 
     const {rollNo,Password} = req.body;

     if(!rollNo){
        throw new ApiError(400,"Roll No is required");
     }

     const student = await Student.findOne({rollNo})
     
     if(!student){
        throw new ApiError(404,"student is not resigisterd yet")
      }
 
     const isPasswordvalid = await student.isPasswordCorrect(Password)
       if(!isPasswordvalid){
        throw new ApiError(401,"Password is Incorrect!!");
      }
      // now genreting the acess token and refresh token 
 const {accessToken,refreshToken} = await generateAccessTokenAndRefreshToken(student._id)
  
        const activity =  await Activity.create({
      studentId: student._id,
      status: "out"
       });
 
       const loginTime = new Date(activity.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const loggedInstudent = await Student.findById(student._id).select("-Password -refreshToken")

  const options = {
     httpOnly : true,
     secure : false,
     sameSite: "Lax" ,
      maxAge: 7 * 24 * 60 * 60 * 1000,
  }

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
        200,
        {
          user: loggedInstudent,accessToken,refreshToken,
           status: "Student going out of the college",
          time: loginTime
        },
        "Student loggedd in successfully"
    )
  )

})

const logoutStudent = asyncHandler(async (req,res) =>{ 
    // for logout the student we have to delete the refresh token and alos the send cookie
    // by the sender application
    // how can i find out  the right user and becuse we can take the 
    //any id by user then anyone give me the id and logout the user 
    // so how can i find out the user to logout them form the server 
    // now i will desin for this work a coustom middleware auth.middelewar thsi is verify the studen exist or not 
    
    // now in the route beforet the logutstudent funticn works verifyJWT work they if the user is right then they add the information of user in the req body and now i can acesst the user for req

     await Student.findByIdAndUpdate(
         req.student._id,{
            $unset : {
                refreshToken : true
            }
        },
            {
                new : true // this give the new upadtaede value after he refrsh
            }
         
     );

     const options = {
     httpOnly : true,
     secure : true
     }
    
    const activity =    await Activity.create({
                         studentId: req.student._id,
                         status: "in"
                         });

      const logoutTime = new Date(activity.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });                   
 
     return res
     .status(200)
     .clearCookie("accessToken",options)
     .clearCookie("refreshToken",options)
     .json(new ApiResponse(200,{
       status: "Student comes in the college",
       time: logoutTime 
     },"Student logged out succefully"))
}) 

 const getLoggedInStudent = asyncHandler(async (req, res) => {
  const student = req.student;
      console.log("✅ Me route hit. User:", req.student);
  res.status(200).json(
   new ApiResponse(200,{user: student},"student fetched successfully")
  );
});

export { registerStudent, loginStudent,logoutStudent,getLoggedInStudent,};
