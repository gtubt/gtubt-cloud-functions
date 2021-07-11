from rest_framework import viewsets

from app.users.models import User
from app.users.resources.serializers import UserSerializer
from app.users.service import UserService


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    service = UserService()

    def perform_create(self, serializer):
        data = serializer.validated_data
        self.service.create_user(**data)

    def perform_update(self, serializer):
        user = self.get_object()
        update_data = serializer.validated_data
        self.service.update_user(user, **update_data)

    def perform_destroy(self, instance):
        self.service.delete_user(instance)
