# Generated by Django 3.2.6 on 2022-06-19 21:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_idea'),
    ]

    operations = [
        migrations.CreateModel(
            name='Workshop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField(blank=True, max_length=500, null=True)),
                ('description', models.TextField(blank=True, max_length=1000, null=True)),
                ('about', models.TextField(blank=True, max_length=1000, null=True)),
                ('charges', models.IntegerField(blank=True, null=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('status', models.CharField(blank=True, choices=[('active', 'active'), ('pending', 'pending'), ('rejected', 'rejected')], default='pending', max_length=20, null=True)),
                ('picture', models.CharField(blank=True, max_length=500, null=True)),
                ('mentor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.user')),
            ],
        ),
    ]
