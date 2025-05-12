// import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import {connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request : NextResponse){
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findOne({_id: userID}).select('-password-');
        return NextResponse.json({
            message: "User Found",
            data: user
        });
        
    } catch (error:any) {
       return NextResponse.json({
            error: error.message

        });
    }
}