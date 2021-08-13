import app from './app';

import getRecipesFromFollowedUsers from './endpoints/getRecipesFromFollowedUsers';
import getUserProfile from './endpoints/getUserProfile';
import getProfileByUserId from './endpoints/getProfileByUserId';
import getRecipeById from './endpoints/getRecipeById';

import login from './endpoints/login';
import signup from './endpoints/signup';
import createRecipe from './endpoints/createRecipe';
import followUser from './endpoints/followUser';
import unfollowUser from './endpoints/unfollowUser';

import editRecipe from './endpoints/editRecipe';
import sendTemporaryPassByEmail from './endpoints/sendTemporaryPassByEmail';

import deleteRecipe from './endpoints/deleteRecipe';
import deleteUserAccount from './endpoints/deleteUserAccount';


app.get("/user/feed", getRecipesFromFollowedUsers);
app.get("/user/profile", getUserProfile);
app.get("/user/:id", getProfileByUserId);
app.get("/recipe/:id", getRecipeById);

app.post("/signup", signup);
app.post("/login", login);
app.post("/recipe", createRecipe);
app.post("/user/follow", followUser);
app.post("/user/unfollow", unfollowUser);

app.put("/recipe/edit/:recipeId", editRecipe);
app.put("/user/tempPass", sendTemporaryPassByEmail);

app.delete("/recipe/:recipeId", deleteRecipe);
app.delete("/user/:userId", deleteUserAccount);