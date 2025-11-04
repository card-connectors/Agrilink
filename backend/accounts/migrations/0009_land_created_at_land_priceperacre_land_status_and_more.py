# accounts/migrations/0009_land_created_at_land_priceperacre_land_status_and_more.py

from django.db import migrations, models
from django.utils import timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_land_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='land',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='land',
            name='pricePerAcre',
            field=models.DecimalField(decimal_places=2, default=0.00, max_digits=12),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='land',
            name='status',
            field=models.CharField(default='pending', max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='land',
            name='soilType',
            field=models.CharField(max_length=20),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='land',
            name='suitableFor',
            field=models.JSONField(default=list),
            preserve_default=False,
        ),
    ]
