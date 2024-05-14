
from django.urls import path 
from .import views

urlpatterns = [
    path('', views.my_todo_app),
    path('todo_detail/<int:pk>', views.todo_detail, name ='todo_detail'),

 
]
