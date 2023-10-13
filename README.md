# neptune

NEPTUNE – Network Analysis Website

Commands to run frontend server
```
npm install
npm run dev
```

Commands to run backend server. Go to the root of project.
```
pip install virtualenv
virtualenv venv
source venv/bin/activate
cd techbridge
python manage.py migrate
python manage.py runserver
```



Two logins for the website at http://127.0.0.1:8000/

Admin login: http://127.0.0.1:8000/admin
User login: http://127.0.0.1:8000/login

Database design, there are 4 database tables to consider for admins to create a new survey. All these 4 database tables can be accessed/modified with the Admin login.

**User**: It stores the user's login credentials, i.e., username, and encrypted password.

**Profile**: It stores the password without encryption, allowing us to refer to the password in case we forget the password. It also stores the Techbridge details like name, and display name. User and Profile table has one-to-one mapping.

**Survey**: It stores the survey information. A user can have multiple surveys i.e., same techbridge can have different surveys active at different times.

**Settings**: It stores the config which will help to display survey based on techbridge.



_Steps to create a new survey are intuitive. Once the survey is created, the surveyed data will be stored in Survey database table. we can create user and assosciate the user with survey. The user can see his survey data in a network connected graph upon successful authentication._
