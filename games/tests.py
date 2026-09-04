from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UserRegistrationTests(APITestCase):
    def setUp(self):
        self.url = reverse('user_register')
        self.payload = {
            'username': 'new_player',
            'email': 'player@example.com',
            'password': 'StrongPass!908',
        }

    def test_registration_creates_user_with_hashed_password(self):
        response = self.client.post(self.url, self.payload, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(username='new_player')
        self.assertTrue(user.check_password(self.payload['password']))
        self.assertNotIn('password', response.data)

    def test_registration_rejects_duplicate_email(self):
        get_user_model().objects.create_user(**self.payload)
        duplicate = {**self.payload, 'username': 'another_player'}

        response = self.client.post(self.url, duplicate, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
