from .models import User, Article, Crop, Equipment, Message, Comment, Notification, Organization, Pest, Post, ChatRoom

from rest_framework.serializers import ModelSerializer, CharField, FileField

class UserSerializer(ModelSerializer):

    class Meta:

        model = User

        fields= "__all__"



class CustomUserSerializer(ModelSerializer):

    class Meta:

        model = User

        fields= ["id", "username", "photo"]



class CropSerializer(ModelSerializer):

    class Meta:

        model = Crop

        fields= "__all__"



class OrganizationSerializer(ModelSerializer):

    username = CharField(source = "officer.username", read_only = True)

    user_photo = CharField(source = "officer.photo", read_only = True)
    
    class Meta:

        model = Organization

        fields= "__all__"


        
class ArticleSerializer(ModelSerializer):

    crop_name = CharField(source = "crop.name", read_only = True)

    username = CharField(source = "author.username", read_only = True)

    org_name = CharField(source = "organization.name", read_only = True)

    pest_name = CharField(source = "pest.name", read_only = True)

    equipment_name = CharField(source = "equipment.name", read_only = True)

    user_photo = FileField(source = "author.photo", read_only = True)
    
    class Meta:

        model= Article

        fields= "__all__"



class EquipmentSerializer(ModelSerializer):

    class Meta:
    
        model= Equipment
    
        fields= "__all__"



class UpdateOrganizationSerializer(ModelSerializer):
    
    class Meta:
    
        model=Organization
    
        fields= "__all__"



class ViewArticleSerializer(ModelSerializer):
    
    class Meta:
    
        model = Article
    
        fields = "__all__"



class ViewAllOrganizationsSerializer(ModelSerializer):

    class Meta:

        model=Organization

        fields="__all__"


        
class NotificationSerializer(ModelSerializer):

    username = CharField(source = "action_taker.username", read_only = True)

    user_photo = FileField(source = "action_taker.photo", read_only = True)

    class Meta:

        model = Notification

        fields = "__all__"



class MessageSerializer(ModelSerializer):

    class Meta:

        model = Message

        fields = "__all__"



class ChatRoomSerializer(ModelSerializer):

    class Meta:

        model = ChatRoom

        fields = "__all__"



class PestSerializer(ModelSerializer):

    class Meta:
    
        model = Pest
    
        fields = "__all__"



class PostSerializer(ModelSerializer):

    username = CharField(source = "author.username", read_only = True)
    
    org_name = CharField(source = "organization.name", read_only = True)
    
    user_photo = FileField(source = "author.photo", read_only = True)

    class Meta:

        model=Post

        fields = "__all__"



class CommentSerializer(ModelSerializer):
    
    username = CharField(source = "author.username", read_only = True)

    user_photo = FileField(source = "author.photo", read_only = True)

    user_role = FileField(source = "author.role", read_only = True)

    class Meta:

        model = Comment
        
        fields = "__all__"


