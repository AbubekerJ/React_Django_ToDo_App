from django.shortcuts import render
from .models import Todo
from .serializer import TodoSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.


@api_view(['GET','POST'])
def my_todo_app(request):
    
    if request.method =='GET':
        todos = Todo.objects.all()
        serializer  = TodoSerializer(todos , many = True)
        return Response (serializer.data)
    elif request.method == 'POST':
        serializer = TodoSerializer( data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.validated_data.get('completed'))
            return Response(serializer.data , status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors , status=status.HTTP_404_NOT_FOUND)

@api_view(['GET','PUT','DELETE','PATCH'])
def todo_detail(request , pk):
    todos = Todo.objects.get(pk=pk)
    if request.method =='GET':
        
        serializer = TodoSerializer(todos)
        return Response(serializer.data)
    elif request.method =='PUT':
        serializer = TodoSerializer(todos , data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data )
        else:
            return Response(serializer.errors , status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == 'DELETE':
        todos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
       

