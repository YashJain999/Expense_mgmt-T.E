"""
URL configuration for lab project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from budget.views import *
from budget.models import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/',LoginView.as_view(), name='login'),
    path('create-user/', CreateUserView.as_view(), name='create-user'),
    path('api/verify-email/', EmailVerificationView.as_view(), name='anything'),
    path('update-password/', views.update_password, name='anything'),
    path('generate_pdf/',views.generate_pdf_view, name='generate_pdf' ),
    path('dropdown/', views.dropdown, name="anything"),
    path("submit_year/", views.getyear, name = 'anything'),
    path("get_financialyears/", views.get_financialyears, name='anything'),
    path("show_data/", views.show_enter_data, name='anything'),
    path("get_budget_data/", views.get_budget_data, name = "anything"),
    path('api/expenses/', ExpenseList.as_view(), name='expense-list'),
    path("post_year_desc/",views.post_year_desc, name="anything"),
    path('upload_budget/', views.upload_budget, name='anything'),
    path('get_uploaded_docs/',views.get_uploaded_docs,name='anything'),
    path('get_budget_details/', views.get_budget_details, name='anything'),
    path('update_budget_details/',views.update_budget_details,name='anything'),
    path('get_all_pdf_records/', views.get_all_pdf_records, name='get_all_pdf_records'),
    path('download_pdf/<pdf_id>/', views.download_pdf, name='download_pdf'),
    path('principal_status/', views.principal_status,name='anything')
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)