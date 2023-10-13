from django.shortcuts import render
from django.http import JsonResponse
# from frontend.template import TEMPLATE_DATA
from pathlib import Path
import os
from accounts.models import Settings, Profile

CURRENT_DIR = Path(__file__).resolve().parent
data_path = os.path.join(CURRENT_DIR, 'data')


# Create your views here.
def index(request):
    return render(request, 'frontend/index.html')


def survey_page1(request, route):
    template_data = Settings.objects.first().tb_survey_fields
    if route not in template_data:
        return render(request, 'frontend/error.html')

    if not template_data[route]['status']:
        return render(request, 'frontend/notification.html')
    
    context = {'name': template_data[route]['name'], 'name_abbreviation': template_data[route]['name_abbreviation'], 'route': route}
    
    return render(request, 'frontend/start_page.html', context)


def survey_page2(request):
    template_data = Settings.objects.first().tb_survey_fields
    survey_id = request.META.get('HTTP_REFERER').split("/")[-1]
    return render(request, 'frontend/survey.html', {'survey_id': survey_id, 'name_abbreviation': template_data[survey_id]['name_abbreviation'], 'name': template_data[survey_id]['name']})


def survey_page3(request):
    response = eval(request.body)
    tb_name = eval(request.body).get('survey_id')
    survey = Profile.objects.filter(tb_name=tb_name).first().survey_set.filter(is_active=True).first()
    data = survey.data
    data.remove({"a": "a"})
    response.pop('survey_id')
    data.append(response)
    survey.data = data
    survey.save()

    return JsonResponse({"message": "Updated successfully"})


def thank_you(request):
    return render(request, 'frontend/thank_you.html')