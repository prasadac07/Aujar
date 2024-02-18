# Generated by Django 4.1 on 2024-02-18 01:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("account", "0002_addride"),
    ]

    operations = [
        migrations.CreateModel(
            name="RideBooking",
            fields=[
                (
                    "id",
                    models.CharField(
                        default="", max_length=200, primary_key=True, serialize=False
                    ),
                ),
                ("weight_occu", models.FloatField(default=0)),
                (
                    "asker",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "ride",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="account.addride",
                    ),
                ),
            ],
        ),
    ]