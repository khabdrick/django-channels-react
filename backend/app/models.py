from django.db import models

class Text(models.Model):
    sender = models.CharField(max_length=500)
    content = models.TextField()

    def __str__(self):
        return self.sender

    def last_10_messages():
        return Text.objects.order_by('-timestamp').all()[:10]