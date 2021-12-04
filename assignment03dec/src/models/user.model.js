const bcrypt = require('bcryptjs');
const { Schema, model} = require("mongoose");

const userSchema = new Schema({
    name : { type: String, required: true},
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true}
},
{
    versionKey: false,
    timestamps: true
});
//using sync 
// userSchema.pre("save", function (next){ //works for both create and update
//   if(!this.isModified("password")) return next();
//   const hash = bcrypt.hashSync(this.password, 10);
//         this.password = hash;
//         return next();
//     });

//using async
userSchema.pre("save", function (next){ //works for both create and update
    if(!this.isModified("password")) return next();
    bcrypt.hash(this.password, 10, (err, hash)=>{
        this.password = hash;
        return next();
    });   
});


//for login
userSchema.methods.checkPassword = function (password){
    return new Promise((resolve, reject)=>{

        bcrypt.compare(password,this.password, function(err, same) {
            if(err) return reject(err);
            return resolve(same);
        });

    });
}

module.exports = model("user",userSchema);