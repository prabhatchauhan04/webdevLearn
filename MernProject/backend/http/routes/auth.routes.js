import Router from 'express';        // Import the Router function from Express
import { getMe, postSignin, postSignup } from "../controllers/auth.controller.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = Router();             // Create a new router instance to define routes separately



router.post('/signup' , postSignup);   // Define a POST route for /signup that uses the postSignup controller
router.post('/signin', postSignin);
router.get('/me', requireAuth, getMe);  // Define a GET route for /me that uses the requireAuth middleware and getMe controller




export default router;               // Export the router so it can be used in other files

