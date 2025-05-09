import express from "express";
import cors from "cors";
import connectToDB from "./db/index.mjs";
import userRoutes from "./routes/userRoutes.mjs"
// import taskRoutes from "./routes/taskRoutes.mjs"
// import dashboardRoute from "./routes/dashboard.mjs"
import taskRoutes from "./routes/taskRouter.mjs";



//Connecting MongoDB
connectToDB()
const app = express();

app.use(
    cors({
        origin: ['http://localhost:5174',
            'http://localhost:5173',
            'https://hackathon-six-steel.vercel.app/login',

        ],
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);


app.use(express.json());
app.use('/api/auth', userRoutes);
app.use("/api", taskRoutes); // Mount karo
// app.use('/api/tasks', taskRoutes);
// app.use('/api/dashboard', dashboardRoute);


app.use("/", (req, res, next) => {
    console.log("Request URL:", req.url, "method: ", req.method);
    next();
});
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
