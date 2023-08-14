const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
// const Question = require('../models/question');
// const Topic = require('../models/topic');
// const Company = require("../models/company");
// const Experience = require("../models/experience");
// handle errors

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.addPost_post = async (req, res) => {
  const newPost = req.body;
  try {
    const ret_newPost = await Post.create(newPost);
    const authorId = newPost.authorId;
    const updatedUser = await User.findById(authorId);
    updatedUser.posts_written.push(ret_newPost._id);
    await User.findByIdAndUpdate(
      authorId,
      updatedUser,
      { new: true },
      (error, updatedUser) => {
        if (error) {
          console.error("Error:", error);
        } else {
          console.log("Updated User:", updatedUser);
        }
      }
    );
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
  }
};

module.exports.authorPosts_get = async (req, res) => {
  const authorId = req.params.authorId;
  console.log(authorId);
  try {
    const [authorDetails] = await User.find({ _id: authorId });
    console.log("fjsaljf", authorDetails);
    const postPromises = authorDetails.posts_written?.map(async (postId) => {
      const post = await Post.findById(postId);
      return post;
    });

    const posts = await Promise.all(postPromises);
    // console.log(updatedPosts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

module.exports.post_get = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deletePost_delete = async (req, res) => {
  const postId = req.params.postId;
  try {
    const result = await Post.deleteOne({ _id: postId }); // Replace idToDelete with the actual document's _id you want to delete

    if (result.deletedCount === 1) {
      console.log("Document deleted successfully.");
    } else {
      console.log("Document not found or not deleted.");
    }

    res.send("deleted succesfully");
  } catch (error) {
    console.error("Error:", error);
    res.send("Not deleted succesfully");
  }
};

// controller actions
// module.exports.signup_get = (req, res) => {
//   res.render('signup');
// }

// module.exports.login_get = (req, res) => {
//   res.render('login');
// }

// module.exports.question_get = (req, res) => {
//   res.render('addquestion');
// }

// module.exports.question_post = async(req,res) => {

//   console.log("alia");
//   var x = await Topic.find({ topic : req.body.topic });
//   var id = x[0]._id;
//   req.body.topic = id;
//   console.log(req.body);

//   var data = new Question(req.body);
//  data.save()
//   .then(item => {
//     console.log("data is saved");
//   })
//  .catch(err => {
//     console.log(err);
//   })

// }

// module.exports.addexperience_get = (req,res) =>{
//   res.render('addexperience');
// }

// module.exports.topic_get = (req, res) => {
//   Topic.find({},(err,data)=> {
//     if(err){
//       console.log(err)
//     }else{

//       res.render('practise',{ topic : data});
//     }
//   }
//   )};

//   module.exports.addexperience_get = (req,res) =>{

//     res.render('addexperience');
//   }

//   module.exports.addexperience_post = async(req,res) => {

//    var phew = req.body.company;

//    console.log(req.body);
//     var x = await Company.find({ name : req.body.company });
//     console.log(x);
//      var id = x[0]._id;
//      req.body.company = id;

//   var data = new Experience(req.body);
//    data.save()
//     .then(item => {
//       console.log("data is saved");
//     })
//    .catch(err => {
//       console.log(err);
//     })
//   }