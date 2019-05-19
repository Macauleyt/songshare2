import {
  GetPosts,
  PostsError,
  LikeUpdate,
  AddPost,
  Comment,
  RemoveComment,
  DeletePost,
  SinglePost
} from "../actions/constants";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GetPosts:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case SinglePost:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case AddPost:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case PostsError:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case DeletePost:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case LikeUpdate:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case Comment:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      };
    case RemoveComment:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
