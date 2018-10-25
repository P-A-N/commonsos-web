import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login";
import Ad from "@/components/Ad";
import Wallet from "@/components/Wallet";
import Community from "@/components/Community";
import Messages from "@/components/Messages";
import MessageThread from "@/components/MessageThread";
import Profile from "@/components/Profile";
import OtherUserProfile from "@/components/OtherUserProfile";
import SearchUser from "@/components/SearchUser";
import CreateAccount from "@/components/CreateAccount";
import EditProfile from "@/components/EditProfile";
import EmailVerification from "@/components/EmailVerification";
import PasswordResetEmail from "@/components/PasswordResetEmail";
import PasswordResetInput from "@/components/PasswordResetInput";
Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/community" },
    { path: "/wallet", component: Wallet },
    { path: "/community", component: Community },
    { path: "/community/ad/:id", component: Ad, props: true },
    { path: "/community/ads/create", component: Community },
    { path: "/community/my-ads", component: Community },
    { path: "/messages", component: Messages },
    { path: "/messages/:threadId", component: MessageThread, props: true },
    { path: "/profile", component: Profile },
    { path: "/profile/edit", component: EditProfile },
    {
      path: "/profile/:userId/:communityId/:adId",
      component: OtherUserProfile,
      props: true
    },
    { path: "/admin", component: SearchUser },
    { path: "/login", component: Login },
    { path: "/create-account", component: CreateAccount },
    { path: "/email-verification", component: EmailVerification },
    { path: "/passwordresetemail", component: PasswordResetEmail },
    { path: "/passwordresetinput", component: PasswordResetInput },
    { path: "*", redirect: "/" }
  ]
});

export default router;
