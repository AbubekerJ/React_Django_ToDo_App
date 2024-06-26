from django.db import models

# Create your models here.

class Todo(models.Model):

    task = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.task
    
