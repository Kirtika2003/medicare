import validator from 'validator';
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'

    const registerUser = async (req,res) => {
        try {
            const {name,email,password} = req.body
            if(!name || !email || !password){
                return res.json({success: false,message: 'Please fill in all fields.'})
            }
            if(!validator.isEmail(email)){
                return res.json({success:false,message:"Enter a valid email"})
            }
            if(password.length < 8){
                return res.json({success:false,message:"Password should be at least 8 characters long."})
            }
            const salt= await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const userData = {
                name,
                email,
                password: hashedPassword
            }
            const newUser= new userModel(userData)
            const user = await newUser.save()
             const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
             return res.json({success:true,token})

        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
    
    const loginUser = async (req,res) => {
        try {
            const {email,password} = req.body
            const user = await userModel.findOne({email})
            if(!user){
                return res.json({success:false,message:"User not found."})

            }
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
                res.json({success:true,token})
            }else{
                res.json({success:false,message:"Invalid credentials."})
            }
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }

    //api to get user profile data
    const getProfile= async (req,res) => {
        try {
            const {userId} = req.body
            const userData = await userModel.findById(userId).select('-password')
            res.json({success:true,userData})
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }

    const updateProfile = async (req,res) => {
        try {
            const {userId, name, phone, address, dob, gender} = req.body
            const imageFile= req.file
            if (!name || !phone || !address || !dob || !gender) {
                return res.json({ success: false, message: "Please fill all fields." })   
            }
            await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender})
            if(imageFile){
                const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
                const imageURL = imageUpload.secure_url
                await userModel.findByIdAndUpdate(userId, {image: imageURL})
            }
            res.json({success:true,message:"Profile updated successfully."})
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
    //api to book appointment
    const bookAppointment = async (req,res) => {
        try {
            const {userId, docId, slotDate, slotTime} = req.body
            const docData = await doctorModel.findById(docId).select('-password')
            if(!docData.available){
                return res.json({success:false,message:"Doctor is not available."})
            }
            let slots_booked= docData.slots_booked
            if(slots_booked[slotDate]){
                if(slots_booked[slotDate].includes(slotTime)){
                    return res.json({success:false,message:"Slot not available."})
                }else{
                    slots_booked[slotDate].push(slotTime)
                }
            }else{
                slots_booked[slotDate] = []
                slots_booked[slotDate].push(slotTime)
            }
            const userData = await userModel.findById(userId).select('-password')
            delete docData.slots_booked
            const appointmentData = {
                userId,
                docId,
                userData,
                docData,
                amount: docData.fees,
                slotDate,
                slotTime,
                date: Date.now()
                
            }
            const newAppointment = new appointmentModel(appointmentData)
            await newAppointment.save()

            //save new slots data in docData
            await doctorModel.findByIdAndUpdate(docId,{slots_booked})
            res.json({success:true,message:"Appointment booked successfully."})
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
    //api to get user appointment -my appointments page
    const listAppointment = async (req,res) => {
        try {
            const {userId} = req.body
            const appointments = await appointmentModel.find({userId})
            res.json({success:true,appointments})
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
    //api to cancel appointment
    const cancelAppointment = async (req,res) => {
        try {
            const {userId,appointmentId}= req.body
            const appointmentData = await appointmentModel.findById(appointmentId)
            if(appointmentData.userId !==userId){
                return res.json({success:false,message:"You are not authorized to cancel this appointment."})
            }
            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
            // remove slot booked
            const {docId,slotDate, slotTime} = appointmentData
            const doctorData = await doctorModel.findById(docId)
            let slots_booked= doctorData.slots_booked
            slots_booked[slotDate]= slots_booked[slotDate].filter(e =>e !==slotTime)
            await doctorModel.findByIdAndUpdate(docId,{slots_booked})
            res.json({success:true,message:"Appointment cancelled successfully."})
            
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
    //api to make payment using razorpay
    const razorpayInstance = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    })
    const paymentRazorpay = async (req,res) => {
        try {
            const {appointmentId}= req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        if(!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment cancelled not found."})
        }
        const options = {
            amount: appointmentData.amount*1000, // amount is in paise
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
        const order= await razorpayInstance.orders.create(options)
        res.json({success:true,order})
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
    //api to verify razorpay payment
    const verifyRazorpay = async (req,res) => {
        try {
            const {razorpay_payment_id,razorpay_order_id}= req.body
            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
            if(orderInfo.status==='paid'){
                await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment: true})
                res.json({success:true,message:"Payment successfully."})
            }else{
                res.json({success:false,message:"Payment failed."})
            }
        } catch (error) {
            console.error(error)
            res.json({success:false,message:error.message})
        }
    }
export  {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay}