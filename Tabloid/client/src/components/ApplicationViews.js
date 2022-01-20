import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Post/PostList";
import PostDetails from "./Post/PostDetails";
import TagList from "./Tag/TagList";
import UserProfileList from "./UserProfile/UserProfileList";
import { TagForm } from "./Tag/CreateTagForm";
import CategoryList from "./Category/CategoryList";
import { DeleteTag } from "./Tag/DeleteTag"


export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/Category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/tag" exact>
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/UserProfile" exact>
          {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
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
