import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = asyncHandler(async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);
    const { firstName, lastName, location } = user;

    const newPost = new Post({
      userId,
      firstName,
      lastName,
      location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ success: false, error: err.message });
  }
});

export const getFeedPosts = asyncHandler(async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
});

export const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });

    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
});

export const likePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ success: false, error: err.message });
  }
});
