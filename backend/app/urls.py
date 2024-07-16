from django.urls import path

from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns=[

    # sign in for communication officers 
    path('token/', views.CustomTokenObtainPairView.as_view()),

    # sign up for farmers and communications officers 
    path('signup/',views.signup, name='signup' ),

    # adding information on post harvest practices 
    path('addarticle/',views.addArticle, name='addInformation' ),

    # get articles by crop and category of information 
    path('get_articles/<str:cropId>',views.getArticle, name='get_article' ),

    # get articles by crop and author 
    path('get_article_by_crop/<int:cropId>/<str:author>',views.getArticlebyCrop ),

    # verify OTP code 
    path('verify_account/', views.verify_code, name='verify_code'),

    # update organization details 
    path('updateOrganization/<int:pk>', views.updateOrganization, name='update_organization'),

    # get details about an article
    path('viewInformation/<int:pk>', views.viewInformation, name='view_information'),

    # view all organizations     
    path('organizations/', views.view_all_organizations, name='view_all_orgizations'),

    # get all notifications for a given user
    path('notification/<int:pk>', views.list_notifications, name='list_notifications'),

    # update all notifications fon a given user (mark as viewed)
    path('view_notifications/<int:pk>', views.view_notifications),

    # create a notification for a user 
    path('createnotification/', views.create_notification, name='create_notification'),

    # update user information 
    path('update_user/<str:pk>', views.update_user),

    # create a new post 
    path('createPost/', views.create_post, name="create_post"),
    
    # get user statistics on uploads 
    path('get_statistics/<str:pk>', views.get_statistics),

    # add an equipment for a given post harvest technique
    path('add_equipment/<str:pk>', views.add_equipment),

    # get all crops 
    path('crops/', views.get_crops),

    # Add a pest 
    path('add_pest/', views.add_pest),

    # get a given pest 
    path('get_pest/<str:pk>', views.get_pest),

    # get all pests 
    path('get_pests/', views.get_pests),

    # get an equipment used for a given post-harvest technique
    path('get_equipment/<str:pk>', views.get_equipment),

    # get information about a given organization by officer
    path('get_organization/<str:pk>', views.get_organization),

    # request for an OTP to reset password for a communications officer 
    path('reset_password/<str:pk>', views.reset_password),

    # update the officer's password by providing an OTP 
    path('update_password/<str:pk>', views.update_password),

    # get all posts
    path('posts/', views.get_posts),

    # add a comment on a given post
    path('add_comment/', views.create_comment, name='add_comment'),

    # retrieve all comments on a given post 
    path('comments/<int:post_id>', views.view_comment, name='view_comment'),

    # add an Organization to the system 
    path('addOrganization/', views.addOrganization, name='add organization'),

    # get messages for a given chatroom 
    path('get_messages/<str:pk>', views.get_messages),

    # add message to chatroom 
    path("add_message_to_chatroom/", views.add_message_to_chatroom),

    # create chatroom and add message 
    path("create_chatroom_and_add_message/", views.create_chatroom_and_add_message),

    # get user's chatrooms 
    path("get_chatrooms/<str:pk>", views.get_chatrooms),

    # check_for_chatroom 
    path("check_for_chatroom/<str:participant1>/<str:participant2>/", views.check_for_chatroom),

    # view messages in a chatroom 
    path("view_messages/<str:user>/<str:chatroom>", views.view_messages),

    # get messages for a given chatroom 
    path("get_messages_by_chatroom/<str:pk>", views.get_messages_by_chatroom),

    # search 
    path("search/<str:query>", views.search),

    # get posts by author 
    path("get_posts_by_author/<str:pk>", views.get_posts_by_author),

    # get unread messages 
    path("get_unread_messages/<str:user_id>", views.check_unread_messages),

    # get unread notifications
    path("get_unread_notifications/<str:user_id>", views.check_unread_notifications),
]