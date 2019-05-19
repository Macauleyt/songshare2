import axios from "axios";
import { setAlert } from "./alert";
import {
  GetPosts,
  PostsError,
  LikeUpdate,
  AddPost,
  DeletePost,
  SinglePost,
  Comment,
  RemoveComment
} from "./constants";

//Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: GetPosts,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const singlePost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: SinglePost,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Like

export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: LikeUpdate,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Unlike
export const unLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: LikeUpdate,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/posts", formData, config);

    dispatch({
      type: AddPost,
      payload: res.data
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete a post

export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DeletePost,
      payload: id
    });

    dispatch(setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: Comment,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Delete a comment

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: RemoveComment,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: PostsError,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
