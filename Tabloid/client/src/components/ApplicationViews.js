import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import PostList from "./Post/PostList";
import TagList from "./Tag/TagList";
import UserProfileList from "./UserProfile/UserProfileList";
import { TagForm } from "./Tag/CreateTagForm";
import CategoryList from "./Category/CategoryList";


export default function ApplicationViews({ isLoggedIn }) {

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/post/:id" exact>
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
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
