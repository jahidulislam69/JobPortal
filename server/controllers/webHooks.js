import {Webhook} from 'svix'
import User from '../models/User.js'

// API controller function to manage clerk User with database
export const clerkWebhooks = async (req,res)=> {
    console.log("Webhook received");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    
    try {
        // CREATE a svix instance with clerk webhook secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET)
        // Verifying headers 
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        
        console.log("Webhook verified successfully");
        console.log("");
        
        
        // Getting data from request body
        const {data, type} = req.body

        // Switch cases for different events
        switch (type) {
            case 'user.created':{
                const existingUser = await User.findById(data.id);
                if (!existingUser) {
                    // Check if email_addresses array exists and has at least one element
                    const email = data.email_addresses && data.email_addresses.length > 0 
                        ? data.email_addresses[0].email_address  // This is the correct property name
                        : null;
                        
                    if (!email) {
                        console.log("No email found in user data:", data);
                        return res.status(400).json({ success: false, message: "No email found in user data" });
                    }
                    
                    const userData = {
                        _id: data.id,
                        email: email,  // Use the extracted email
                        name: data.first_name + " " + data.last_name,
                        image: data.image_url,
                        resume: ''
                    }
                    
                    console.log("Creating user with data:", userData);
                    await User.create(userData)
                }
                res.json({})
                break;
                
            }
            case 'user.updated':{
                // Similar fix for the update case
                const email = data.email_addresses && data.email_addresses.length > 0 
                    ? data.email_addresses[0].email_address
                    : null;
                    
                if (!email) {
                    console.log("No email found in user data:", data);
                    return res.status(400).json({ success: false, message: "No email found in user data" });
                }
                
                const userData = {
                    email: email,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                
                console.log("Updating user with data:", userData);
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }
        console.log("Event type:", type);
        console.log("User data:", data);
        
        console.log("User created/updated/deleted successfully");
        
    } catch (error) {
        console.log("Webhook error:", error);
        res.json({success:false, message:"webhooks error"})
    }
}