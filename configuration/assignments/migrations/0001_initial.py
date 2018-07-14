# Generated by Django 2.0.5 on 2018-07-14 03:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('assignment_title', models.CharField(max_length=50)),
                ('description', models.TextField(blank=True)),
                ('complete', models.BooleanField(default=False)),
                ('due_date', models.DateField(default=django.utils.timezone.now)),
                ('development_points', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'ordering': ['due_date'],
            },
        ),
        migrations.CreateModel(
            name='AssignmentWeek',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('assignment_week_title', models.CharField(max_length=75)),
            ],
        ),
        migrations.AddField(
            model_name='assignment',
            name='assignment_week',
            field=models.ForeignKey(on_delete='cascade', related_name='assignments', to='assignments.AssignmentWeek'),
        ),
    ]
