import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import TagList from "./Tag/TagList";
import CommentList from "./Comment/CommentList";
import UserProfileList from "./UserProfile/UserProfileList";
import { TagForm } from "./Tag/CreateTagForm";
import CategoryList from "./Category/CategoryList";
import { CreateCategory } from "./Category/CreateCategoryForm";
import { DeleteTag } from "./Tag/DeleteTag"
import { AddComment } from "./Comment/AddComment";
import { PostForm } from "./Post/CreatePostForm"
import { TagUpdateForm } from "./Tag/UpdateTag"


export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/create" exact>
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/categories" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/createCategory" exact>
          {isLoggedIn ? <CreateCategory /> : <Redirect to="login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:id" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comment/:id/create" exact>
          {isLoggedIn ? <AddComment /> : <Redirect to="/login" />}
        </Route>

        <Route path="/UserProfile" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/editTag/:id">
          {isLoggedIn ? <TagUpdateForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag/create">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/deleteTag/:id">
          <DeleteTag userparams />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
