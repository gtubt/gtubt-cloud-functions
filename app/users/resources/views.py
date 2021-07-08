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
        pass

    def perform_destroy(self, instance):
        pass
