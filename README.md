# FoodReviewWebsite 
---
## Project setup and files required in path environment
- `npm`
- `npx`
- In `server` folder
  - Need to install the dependencies before the code can compile and run
    - ``` npm install express
        npm install jsonwebtoken
        npm install dotenv
        npm install express-session
        npm install mongodb
        npm install mongoose
        npm install cloudinary
        npm install multer-storage-cloudinary
        npm install connect-mongo
        npm install body-parser
        npm install nodemon ```
  - Need to setup up `.env` file with variables: 
    - `MONGODB_URL`: The url to the mongodb server for server to connect to
    - `PORT`: The localhost port of server
    - `JSONWEBTOKEN_SECRET`: The hash secret need for password hashing.
