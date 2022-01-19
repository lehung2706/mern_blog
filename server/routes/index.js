
import postRoute from './post.js';
import userRoute from './user.js';

function route(app){
    app.get('/', (req, res)=>{
        res.send("API")
    })
    app.use('/posts',postRoute);
    app.use('/user',userRoute);
}

export default route;