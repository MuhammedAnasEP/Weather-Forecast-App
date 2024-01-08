### Setup frontend 

1. install npm
    - npm install

2. run project
    - npm start

### setup backend

1. create a virtual environment
    - virtualenv venv

2. Activate it
    - source venv/bin/activate

3. install required packages
    - pip install -r requirements.txt

4. setup the database
    note:- i used postgresql 
            - you can also use another database engines
            - please change the user and password
            - also create database

5. migrate the prject
    - python manage.py makemigrations
    - python manage.py migrate

6. Run the project
    - python manage.py runserver
