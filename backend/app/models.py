from django.db import models

from django.contrib.auth.models import AbstractUser

from django_resized import ResizedImageField


# customizing the default user model 

class User(AbstractUser):

    username = models.CharField(unique=True, null=True, blank=True, max_length=100)

    email = models.EmailField(unique=True, null=False)

    role = models.CharField(max_length=100, default="officer")

    photo = ResizedImageField(scale=0.5, quality=50, size=[500, 300],upload_to="static/uploads/photos",null=True, blank=True)
    
    OTP = models.CharField(max_length = 10, null=True, blank=True)

    contact = models.CharField(max_length=15, null=True, blank=True)
    
    REQUIRED_FIELDS=['username'] # must be added to avoid complications when creating the super user

    USERNAME_FIELD = "email" #change the authentication field to take in email and password


    # string representation of a class 

    def __str__(self):

        return self.email
    


class Notification(models.Model):

    action = models.CharField(max_length=100)

    action_taker = models.ForeignKey(User, on_delete=models.CASCADE)

    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "reciever")

    time = models.DateTimeField(auto_now_add=True)  

    is_viewed = models.BooleanField(default=False)
    

    class Meta:

        ordering = ["-time"]


    def __str__(self):
        return self.action
    

class Crop(models.Model):

    name = models.CharField(max_length=100)


    def __str__(self):
        return self.name
    

    
class Pest(models.Model):

    name = models.CharField(max_length=100)
    
    description = models.TextField()

    common_damage = models.TextField()

    preferred_habitat = models.TextField()

    image = ResizedImageField(quality=50,upload_to="static/uploads/pests")


    def __str__(self):
        return self.name  



class Equipment(models.Model):

    name = models.CharField(max_length=100)

    description = models.TextField()
    
    instructions = models.TextField()

    image =ResizedImageField(quality=50,upload_to="static/uploads/equipments")
    

    def __str__(self):
        return self.name
        


class Organization(models.Model):

    name = models.CharField(max_length=100)

    address = models.CharField(max_length=100)

    contact = models.CharField(max_length=100)    

    licence = models.FileField(upload_to="static/uploads/licences")

    officer = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)

    is_active = models.BooleanField(default=False)

    time = models.DateTimeField(auto_now_add=True)  


    def __str__(self):
        return self.name
    


class Article(models.Model):

    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    title = models.CharField(max_length=100)

    description = models.TextField()

    instructions = models.TextField()

    tutorial = models.FileField(upload_to="static/uploads/tutorials", null = True, blank = True)  

    category = models.CharField(max_length=50)

    time = models.DateTimeField(auto_now_add=True)  

    crop = models.ForeignKey(Crop, on_delete=models.CASCADE, null=True, blank=True)

    organization = models.ForeignKey(Organization,on_delete= models.SET_NULL, null=True, blank=True)
    
    pest = models.ForeignKey(Pest, on_delete=models.CASCADE, null=True, blank=True)

    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, null=True, blank=True)


    def __str__(self):
        return self.title
    
    

class ChatRoom(models.Model):

    participants = models.ManyToManyField(User, related_name="participants")

    def __str__(self):

        return str(self.participants)[0:20]
    



class Message(models.Model):

    body = models.CharField(max_length=100)

    chatroom = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, null=True)

    time = models.DateTimeField(auto_now_add=True)  

    viewers = models.ManyToManyField(User, related_name="viewers", blank=True)

    sender = models.ForeignKey(User, related_name="sender", on_delete=models.SET_NULL, null=True)

    def __str__(self):

        return self.body[0:30]
    


class Post(models.Model):

    caption = models.TextField()

    image = ResizedImageField(quality=50,upload_to="static/uploads/posts", null = True, blank = True)

    time = models.DateTimeField(auto_now_add=True)  

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    organization = models.ForeignKey(Organization,on_delete= models.SET_NULL, null=True, blank=True)


    # show latest posts first 

    class Meta:

        ordering = ["-time"]


    def __str__(self):
        return self.caption[0:30]
    

    
class Comment(models.Model):

    body = models.CharField(max_length=100)

    time = models.DateTimeField(auto_now_add=True)  

    author = models.ForeignKey(User, on_delete=models.CASCADE)

    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:

        ordering = ["-time"]


    def __str__(self):

        return self.body[0:20]
    

    





