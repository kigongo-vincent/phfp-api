from rest_framework.decorators import api_view 

from rest_framework.response import Response

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status

from django.db.models import Q

from django.shortcuts import get_object_or_404

from .serializers import *

from django.core.mail import send_mail

import random

from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.tokens import RefreshToken, AccessToken


# customizing the information encoded in the access token by adding extra fields 

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod

    def get_token(cls, user):

        token = super().get_token(user)

        # Add custom claims to the token payload

        token['role'] = user.role

        token['username'] = user.username

        token['email'] = user.email

        token['contact'] = user.contact

        token['photo'] = str(user.photo) if user.photo else ""

        return token
    

# creating a custom serializer for information encoded in the tokens 

class CustomTokenObtainPairView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer



# 1. signup for officers and farmers 

@api_view(['POST'])

def signup(request):


    try:

        user = User.objects.get(contact = request.data["contact"])

    except:

        user = None


    if user is not None:

        user.OTP =  random.randint(100000,999999)

        user.save()

        return Response({"code": user.OTP}, status=status.HTTP_202_ACCEPTED)       

    else:

        try:

            # generate an OTP 

            request.data["OTP"] = random.randint(100000,999999)
        
            role = request.data["role"]

            # sign up for farmers 

            if role == "farmer":
                
                request.data["email"] = f"{random.randint(100000,999999)}@gmail.com"

                request.data["password"] = make_password(str(random.randint(100000,999999)))

                request.data["username"] = request.data["contact"]

            # signup for experts 

            elif role == "officer":
                
                request.data["password"] = make_password(request.data["password"]) 

            request.data["is_active"] = False   

            converted = UserSerializer(data = request.data)
            

            if converted.is_valid():
            
                # send OTP via email 
                converted.save()

                if role == "officer":
                    
                    try:
                        subject = 'ACCOUNT CREATION ON PHFIP'
                        message = f'''
                        Thank you for choosing the Post harvest farmers information portal. We are excited to have you on board!

                        Your verification code for logging into the PHFIP is:

                        Verification Code: {request.data["OTP"]}

                        Please keep this code secure and do not share it with anyone. It is essential for verifying your identity and ensuring the security of your account.

                        We understand the importance of safeguarding your property information, and we have implemented robust security measures to protect your data. If you have any questions or concerns regarding the security of our platform, please don't hesitate to reach out to us.


                        Best regards,
                        The OPERATION 2024 Team
                        '''
                        email_from = 'OPERATION 2024 TEAM'

                        # specification of receivers of the email 

                        recipient_list = [request.data["email"]]

                        send_mail(subject, message, email_from, recipient_list)

                    except:

                        pass

                        # return Response(status= status.HTTP_400_BAD_REQUEST


                    return Response({"code": request.data["OTP"]},status=status.HTTP_201_CREATED)

                else:

                    return Response({"code": request.data["OTP"]},status=status.HTTP_201_CREATED)
                
        except:

            return Response(status= status.HTTP_406_NOT_ACCEPTABLE)
    


# get articles by crop and category of information 

@api_view(['GET'])

def getArticle(request, cropId):
        
        articles = Article.objects.filter(crop = cropId)

        serializer = ArticleSerializer(articles, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



# get articles by crop and author 

@api_view(['GET'])

def getArticlebyCrop(request, cropId, author):
        
        articles = Article.objects.filter(crop = cropId, author = author)

        serializer = ArticleSerializer(articles, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)



# verify OTP code 

@api_view(['POST'])

def verify_code(request):
    
    try:
        
        user = User.objects.get(OTP = request.data["OTP"])

    except:

        user = None

    if user is not None:

        user.is_active = True

        user.OTP = ""

        user.save() 

        # untracked 
        access_token = AccessToken.for_user(user)

        refresh_token = RefreshToken.for_user(user)

        return Response(
            
            {
            
                "access": str(access_token), 
                
                "refresh": str(refresh_token), 
                
                "user": {

                    "email": user.email,

                    "username": user.username,

                    "role": user.role,

                    "user_id": user.id,

                    "photo": str(user.photo) if user.photo else "",

                }
            
            }, 
            
            status=status.HTTP_202_ACCEPTED
            
            )  

    else:

        return Response(status=status.HTTP_403_FORBIDDEN)    



# adding information on post harvest practices 

@api_view(['GET', 'POST'])

def addArticle(request):
        
        serializer = ArticleSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# add an Organization to the system
#         
@api_view(['GET', 'POST'])

def addOrganization(request):

    try:

        serializer = OrganizationSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except:

        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


# update organization details 

@api_view(['PATCH'])

def updateOrganization(request, pk):

    try:

        organization = Organization.objects.get(id=pk)
       
    except Organization.DoesNotExist:

        return Response({'error': 'Organization not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "PATCH":

        updated = UpdateOrganizationSerializer(

            organization, data=request.data, partial=True)
        
        if updated.is_valid():
            
            updated.save()

            return Response(updated.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(updated.errors, status=status.HTTP_400_BAD_REQUEST)


    
# get details about an article

@api_view(["GET"])

def viewInformation(request, pk):

    try:

        information=Article.objects.get(id=pk)

    except Article.DoesNotExist:

        return Response({"errors": "Information not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer=ViewArticleSerializer(information)

    return Response(serializer.data,status=status.HTTP_200_OK)


    
# view all organizations

@api_view(["GET"])

def view_all_organizations(request):

    try:

        organizations=Organization.objects.all()

    except:

        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer=ViewAllOrganizationsSerializer(organizations, many=True)

    return Response(serializer.data,status=status.HTTP_200_OK)



# create a notification for a user 

@api_view(['POST'])

def create_notification(request):

    serializer = NotificationSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# get all notifications for a given user

@api_view(['GET'])

def list_notifications(request, pk):

    try:

        notifications = Notification.objects.filter(receiver=pk)

        serializer = NotificationSerializer(notifications, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    except:

        return Response(status=status.HTTP_418_IM_A_TEAPOT)
    


# update all notifications for a given user (mark as viewed)

@api_view(['GET'])

def view_notifications(request, pk):

    notifications = Notification.objects.filter(receiver=pk)

    for n in notifications:

        n.is_viewed = True

        n.save()

    return Response(status=status.HTTP_200_OK)



# create a new post 

@api_view(['POST'])

def create_post(request):

    serializer=PostSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# add a comment on a given post

@api_view(["POST"])

def create_comment(request):
        
    try:

        converted = CommentSerializer(data = request.data)

        if converted.is_valid():

            new_comment = converted.save()

            if new_comment.author != new_comment.post.author:

                Notification.objects.create(

                action_taker = new_comment.author,

                action = "Added a comment to your post",

                receiver = new_comment.post.author

                )

            return Response(converted.data, status=status.HTTP_201_CREATED)
        
        else:
            
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        
    except:

        return Response(status=status.HTTP_400_BAD_REQUEST)  



 # retrieve all comments on a given post 

@api_view(["GET"])

def view_comment(request, post_id):

    try:

        post=Post.objects.get(id=post_id)

    except Post.DoesNotExist:

        return Response({"errors": "post not found"}, status=status.HTTP_404_NOT_FOUND)
    
    comment=Comment.objects.filter(post=post)

    serializer=CommentSerializer(comment, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)



# update user information 

@api_view(['PATCH'])

def update_user(request, pk):

    try:

        user = User.objects.get(id = pk)

        converted = UserSerializer(user, data = request.data, partial = True)

        print(request.data)

        if converted.is_valid():

            converted.save()

            return Response(converted.data, status=status.HTTP_201_CREATED)
        
        else:

            return Response(converted.errors, status=status.HTTP_403_FORBIDDEN)
        
    except:
         return Response(status=status.HTTP_406_NOT_ACCEPTABLE)



# get user statistics on uploads 

@api_view(['GET'])

def get_statistics(request, pk):

    uploads = Article.objects.filter(author__id = pk).count()

    posts = Post.objects.filter(author = pk).count()

    return Response({

        "uploads": uploads,

        "posts": posts

    })



# get all crops 

@api_view(['GET'])

def get_crops(request):

    crops = Crop.objects.all()

    converted = CropSerializer(crops, many = True)

    return Response(converted.data)



# get all posts

@api_view(['GET'])

def get_posts(request):

    objects = Post.objects.all()

    converted = PostSerializer(objects, many = True)

    for post in converted.data:

        post["comments"] = Comment.objects.filter(post = post["id"]).count()

    return Response(converted.data)



# add an equipment for a given post harvest technique

@api_view(['POST'])

def add_equipment(request, pk):

    try:

        article = Article.objects.get(id =pk)

    except:

        article = None

    if article is None:

        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    else:

        converted = EquipmentSerializer(data = request.data)

        if converted.is_valid():

            new_equipment = converted.save()   

            article.equipment = new_equipment

            article.save()

            return Response(status=status.HTTP_201_CREATED)   

        else:

            return Response(status=status.HTTP_400_BAD_REQUEST)      
        


# Add a pest 

@api_view(['POST'])

def add_pest(request):

    try:

        pest = Pest.objects.get(name = request.data["name"])

    except:

        pest = None

    if pest:

        return Response(status= status.HTTP_202_ACCEPTED)

    else:

        converted = PestSerializer(data = request.data)

        if converted.is_valid():

            converted.save()

            return Response(converted.data, status= status.HTTP_201_CREATED)

        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)            
        


# get a given pest 

@api_view(['GET'])

def get_pest(request, pk):

    pest = Pest.objects.get(id=pk)

    converted = PestSerializer(pest)

    return Response(converted.data) 



# get all pests 

@api_view(['GET'])

def get_pests(request):

    pests = Pest.objects.all()

    converted = PestSerializer(pests, many = True)

    return Response(converted.data) 
       


# get an equipment used for a given post-harvest technique
       
@api_view(['GET'])

def get_equipment(request, pk):

    try:

        pest = Equipment.objects.get(id=pk)

        converted = EquipmentSerializer(pest)

        return Response(converted.data)  

    except:

        return Response(status=status.HTTP_400_BAD_REQUEST)



# get information about a given organization by officer

@api_view(['GET'])

def get_organization(request, pk):

    try:

        pest = Organization.objects.get(officer=pk)

        converted = OrganizationSerializer(pest)

        return Response(converted.data) 
       
    except:

        return Response(status=status.HTTP_400_BAD_REQUEST)



# request for an OTP to reset password for a communications officer 

@api_view(['GET'])

def reset_password(request, pk):

    try:

        user = User.objects.get(email = pk, role="officer")

    except:

        user = None

    if user is None:

        return Response(status=status.HTTP_403_FORBIDDEN)

    else:

        OTP = random.getrandbits(128)

        user.OTP = OTP

        user.save()

        frontend_link = f"http://localhost:5173/reset_password/{OTP}"

        try:

            subject = 'PASSWORD RESET ON PHFIP'

            message = f'''Your account has been reset, please follow the link below to create a new password

            {frontend_link}

            Best regards,

            The OPERATION 2024 Team

            '''
            email_from = 'OPERATION 2024 TEAM'

            recipient_list = [pk]

            send_mail(subject, message, email_from, recipient_list)

        except:

            pass

            # return Response(status= status.HTTP_400_BAD_REQUEST

        return Response(status=status.HTTP_202_ACCEPTED)  



# update the officer's password by providing an OTP 

@api_view(['POST'])

def update_password(request, pk):

    try:

        user = User.objects.get(OTP = pk)

    except:

        user = None

    if user is None:

        return Response(status=status.HTTP_403_FORBIDDEN)

    else:

        user.password = make_password(request.data["password"])

        user.OTP = ""

        user.save()

        access_token = AccessToken.for_user(user)

        refresh_token = RefreshToken.for_user(user)

        return Response({
            
            "access": str(access_token), 
            
            "refresh": str(refresh_token), 
            
            "user": {

                "email": user.email,

                "username": user.username,

                "role": user.role,

                "user_id": user.id,

                "photo": user.photo_url if user.photo else "",

            }
            
            }

            , 
            
            status=status.HTTP_202_ACCEPTED
            
            )  



# get_messages 

@api_view(['GET', 'POST'])

def get_messages(request, pk):

    messages = Message.objects.filter(chatroom = pk)

    converted = MessageSerializer(messages, many = True)

    return Response(converted.data)



# add a message to a chatroom

@api_view(['POST'])

def add_message_to_chatroom(request):

    try:

        converted = MessageSerializer(data = request.data)

        if converted.is_valid():

            converted.save()

            return Response(converted.data, status=status.HTTP_201_CREATED)

        else:

            return Response(converted.errors, status=status.HTTP_418_IM_A_TEAPOT)
        
    except:

        return Response(status=status.HTTP_400_BAD_REQUEST)
        


# create chatroom and add message 

@api_view(['POST'])

def create_chatroom_and_add_message(request): 

            try:

                sender = User.objects.get(id = request.data["sender"])

                receiver = User.objects.get(id = request.data["receiver"])

            except:
        
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
            
            senders_chatrooms = ChatRoom.objects.filter(participants = sender.id)

            has_chatroom = False

            for chatroom in list(senders_chatrooms):

                try:

                    chatroom.participants.get(id = receiver.id)

                    has_chatroom = True

                except:
            
                    pass

            if has_chatroom:

                return Response(status= status.HTTP_406_NOT_ACCEPTABLE)    

            serialized = ChatRoomSerializer(

                data={

                "participants" : [sender.id, receiver.id]

            }

            )

            if serialized.is_valid():

                new_chatroom = serialized.save()

                request.data["chatroom"] = new_chatroom.id

                request.data["viewers"] = [sender.id]

                request.data.pop("receiver")

                try:

                    converted = MessageSerializer(data = request.data)

                    if converted.is_valid():

                        converted.save()

                        return Response(converted.data, status=status.HTTP_201_CREATED)

                    else:

                        return Response(converted.errors, status=status.HTTP_418_IM_A_TEAPOT)
            
                except:

                    return Response(status=status.HTTP_400_BAD_REQUEST)

            else:

                return Response(status=status.HTTP_400_BAD_REQUEST)    
            


# get user's chatrooms 

@api_view(['GET'])

def get_chatrooms(request, pk):

    chatrooms = ChatRoom.objects.filter(participants = pk)

    converted = ChatRoomSerializer(chatrooms, many = True)

    for chatroom in list(converted.data):

        user_details = dict()

        all_messages = list()

        for user_id in list(chatroom["participants"]):

            if int(user_id) != int(pk):

                # try:

                    user = User.objects.get(id = user_id)

                    messages = Message.objects.filter(chatroom = chatroom["id"])

                    unread_messages = 0

                    serialized_messages = MessageSerializer(messages, many = True)

                    all_messages = serialized_messages.data

                    for message in all_messages:

                        if not int(pk) in message["viewers"]:

                                unread_messages += 1

                    user_details = {

                        "id": user_id,

                        "username": user.username,

                        "photo": str(user.photo) if user.photo else "",

                        "last_login": str(user.last_login),

                        "new_messages_count": unread_messages,

                        }

                # except:
        
                #     user = None
                
        chatroom["chat_buddy"] = user_details  

        chatroom["messages"] = all_messages  

    return Response(converted.data)



# check_for_chatroom 

@api_view(['GET'])

def check_for_chatroom(request, participant1, participant2):

    shared_chatroom = None

    chatrooms_for_participant1 = ChatRoom.objects.filter(participants = participant1)

    converted = ChatRoomSerializer(chatrooms_for_participant1, many = True)

    for chatroom in list(converted.data):

        for user in chatroom["participants"]:

            if int(user) == int(participant2):
    
                shared_chatroom = chatroom
        
    if shared_chatroom:
        
        return Response(shared_chatroom, status=status.HTTP_200_OK)

    else:

        return Response(status=status.HTTP_400_BAD_REQUEST)    
    


# view messages in a chatroom 

@api_view(['GET'])

def view_messages(request, user, chatroom):

    try:
         
        shared_chatroom = ChatRoom.objects.get(id = chatroom)

    except:

        shared_chatroom = None


    if shared_chatroom is None:

        return Response(status= status.HTTP_400_BAD_REQUEST)
    
    messages = Message.objects.filter(chatroom = chatroom)

    try:

        current_user = User.objects.get(id = user)

    except:
    
        current_user = None

    if current_user is None:

        return Response(status= status.HTTP_401_UNAUTHORIZED)
    
    for message in messages:

        message.viewers.add(current_user)

        message.save()

    return Response(status= status.HTTP_202_ACCEPTED)



# get messages for a given chatroom 

@api_view(['GET'])

def get_messages_by_chatroom(request, pk):
    
    messages = Message.objects.filter(chatroom = pk)

    converted_messages = MessageSerializer(messages, many = True)

    for message in converted_messages.data:

        sender_details = User.objects.get(id = int(message["sender"]))

        converted_sender_details = UserSerializer(sender_details)

        message["sender_details"] = {

            "username": converted_sender_details.data["username"],

            "photo": str(converted_sender_details.data["photo"]) if converted_sender_details.data["photo"] else ""

        }

    return Response(converted_messages.data)



# search for posts or articles 

@api_view(['GET'])

def search(request, query):

    # get input from the client (query)

    q = query if query != "all" else ""

    # filter posts having the query 

    posts = Post.objects.filter(

        Q(author__username__icontains = q) | Q(organization__name__icontains = q) 
        
        | Q(time__icontains = q) | Q(caption__icontains = q)

    )

    converted_posts = PostSerializer(posts, many = True)

    for post in converted_posts.data:

        post["comments"] = Comment.objects.filter(post = post["id"]).count()

    # filter articles having the query 

    articles = Article.objects.filter(

        Q(author__username__icontains = q) | Q(title__icontains = q) | Q(description__icontains = q) 

        | Q(instructions__icontains = q) | Q(category__icontains = q) | Q(time__icontains = q)

        | Q(crop__name__icontains = q) | Q(organization__name__icontains = q) | 

        Q(pest__name__icontains = q) | Q(equipment__name__icontains = q)

    )

    converted_articles = ArticleSerializer(articles, many = True)


    #filter organizations having the query

    organizations = Organization.objects.filter(

        Q(is_active = True) &

        Q(name__icontains = q) | Q(address__icontains = q) | Q(contact__icontains = q)

        | Q(officer__username__icontains = q)

    )

    converted_organizations = OrganizationSerializer(organizations, many = True)


    # filter users having names similar to the query

    users = User.objects.filter(username__icontains = q)
 
    converted_users = CustomUserSerializer(users, many = True)

    # return an object having articles, users, organizations and posts 

    return Response({

        "articles": converted_articles.data,

        "posts": converted_posts.data,

        "organizations" : converted_organizations.data,

        "users": converted_users.data

    })



# get posts by author 

@api_view(['GET'])

def get_posts_by_author(request, pk):

    posts = Post.objects.filter(author = pk)

    converted_posts = PostSerializer(posts, many = True)

    for post in converted_posts.data:

        post["comments"] = Comment.objects.filter(post = post["id"]).count()

    return Response(converted_posts.data)



@api_view(['GET'])

def check_unread_messages(request, user_id):

    user = get_object_or_404(User, id=user_id)

    chatrooms = ChatRoom.objects.filter(participants=user)

    unread_messages_count = Message.objects.filter(chatroom__in=chatrooms).exclude(viewers=user).count()

    return Response({"unread_messages_count": unread_messages_count}, status=202 if unread_messages_count > 0 else 200)




@api_view(['GET'])

def check_unread_notifications(request, user_id):

    user = get_object_or_404(User, id=user_id)

    unread_notifications_count = Notification.objects.filter(receiver = user_id, is_viewed = False).count()

    return Response({"unread_notifiications_count": unread_notifications_count}, status=202 if unread_notifications_count > 0 else 200)