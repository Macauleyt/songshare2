import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LoadGif from "../layout/LoadGif";
import { singlePost } from "../../actions/post";
import { Link } from "react-router-dom";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";

import PostItem from "../posts/PostItem";
import PropTypes from "prop-types";

const Post = ({ singlePost, post: { post, loading }, match }) => {
  useEffect(() => {
    singlePost(match.params.id);
  }, [singlePost]);
  return loading || post === null ? (
    <LoadGif />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to all posts
      </Link>
      <PostItem post={post} showButtons={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  singlePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { singlePost }
)(Post);
