# Endeavour
Endeavour is an App that offers services to connect Entreprenuers and Investor with an additional role of Mentor (admin user). Entreprenure can post an idea with images and document files that would be uploaded to Cloudinary and url link is saved to Database. Mentor will approve after viewing the idea then it will be published to be viewed by Investor. There is an additional feature of Chat that can be streamed between Mentor/Invesroe with Entrepreneur. User is verified through a code sent on his email , send-in-blue is used to send emails to Users. Mentor can organize workshops, and there is an feature for mentor to send emails to all the participants who has joined for Workshop.

# Tools and Language
```
* Python
* React JS
* Bootstrap
* Postgresql
* Cloudinary
* Send-in-Blue (for sending emails to users)
```
# Basic
* create a postgresql database
* make .env file
* add all the keys in env file (.env.example for reference)


# Start frontend server
* cd endeavour-frontend
* npm install
* npm start

# start backend server
* python manage.py migrate
* python manage.py runserver