from django.contrib import admin
from django.urls import path, include
from backend.views import RegisterUser, LoginUser, UpdateUser, SendMail, CreateIdea, CreateWorkshop, GetAllIdeas, GetAllWorkshops, PostMessage, ApprovePost, GetMessage, GetMentorWorkshops, JoinWorkshop, GetJoinedWorkshops, MarkFavorite, GetFavoriteIdeas, PostReply, InviteParticipants
from . import views

urlpatterns = [
    path('signup/', RegisterUser.as_view(), name="signup"),
    path('login/', LoginUser.as_view(), name="login"),
    path('update/', UpdateUser.as_view(), name="update"),
    path('verify-email/', SendMail.as_view(), name='verify-email'),
    path('create-idea/', CreateIdea.as_view(), name="create-idea"),
    path('create-workshop/', CreateWorkshop.as_view(), name="create-workshop"),
    path('get-ideas/', GetAllIdeas.as_view(), name="get-ideas"),
    path('get-idea/<int:id>', GetAllIdeas.as_view(), name="get-idea"),
    path('get-workshops/', GetAllWorkshops.as_view(), name="get-workshops"),
    path('approve-idea/', ApprovePost.as_view(), name="approve-post"),
    path('post-message/', PostMessage.as_view(), name="post-message"),
    path('get-messages/', GetMessage.as_view(), name="get-message"),
    path('get-workshop/<int:id>', GetAllWorkshops.as_view(), name="get-idea"),
    path('get-mentor-workshops/', GetMentorWorkshops.as_view(), name="get-mentor-workshops"),
    path('join-workshop/', JoinWorkshop.as_view(), name="join-workshop"),
    path('get-joined-workshops/', GetJoinedWorkshops.as_view(), name="get-joined-workshop"),
    path('mark-favorite/', MarkFavorite.as_view(), name="mark-favorite"),
    path('get-favorite/', GetFavoriteIdeas.as_view(), name="get-favorite"),
    path('post-reply/', PostReply.as_view(), name="post-reply"),
    path('get-messages/<int:id>', GetMessage.as_view(), name="get-messages"),
    path('invite-participants/', InviteParticipants.as_view(), name="invite-participants"),
]