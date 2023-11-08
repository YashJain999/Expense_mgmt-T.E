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
# from django import views
from django.contrib import admin
from django.urls import path, include
from budget.views import *
from budget.models import *
from budget.pdf_generator import * 
# from django.conf.urls import url


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/verify-email/', EmailVerificationView.as_view(), name='anything'),
    path('update-password/', views.update_password, name='anything'),
    # path('api/login/', LoginView.as_view(), name='anything')
    path('generate_pdf/', views.generate_pdf_view, name='generate_pdf'),
    path('dropdown/', views.dropdown, name="anything"),
    path("submit_year/", views.getyear, name = 'anything'),
    path("get_budget_data/", views.get_budget_data, name = "anything"),
    path("get_financialyears/", views.get_financialyears, name='anything'),
    path("post_year_desc/",views.post_year_desc, name="anything"),
    path('upload_budget/', views.upload_budget, name='anything'),
    path('get_uploaded_docs/',views.get_uploaded_docs,name='anything'),
    path('get_budget_details/', views.get_budget_details, name='anything'),
    path('update_budget_details/',views.update_budget_details,name='anything'),
]
