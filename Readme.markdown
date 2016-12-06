## Dependencies

To setup and run the sample code, you're going to need `npm` from NodeJS available to install the frontend code.
* Node 4.6
* Python 2.7.+
* Highly Reccomend Python Virtual environment

## Setup

1. Enable a virtual environment.
		pip install virtualenv
		virtualenv queue
		source /queue/bin/activate

2. Install Python Requirements

        pip install -r requirements.txt
        python setup.py develop

3. Install Bower + Grunt

		npm install -g grunt-cli bower

4. Install Assets

        npm install
        bower install

5. Compile Assets

        grunt

6. Copy contents of bower_components into example/assets

7. Setup the Database

        make create_database;

8. Run the Server

        ./manage.py runserver

## UPDATING ##

		git pull
		python manage.py makemigrations
		python manage.py migrate
		grunt


## NOTES ##

1.	The coffeescript source is in src/js, these files get compiled and placed inside the assets folder.
2.	The main file for front end is app.tutor.coffee, all the functions for the front-end are inside this function with the exception of a few services for talking to the database.
3.	The models are setup with django. You will find all the code inside the api folder.
4.	api.py is for creating objects.
5.	serializer.py converts object between django and javascript
6.	models.py is how django stores the data in the database.
7.	models.py also controls what gets logged after a session is created.
8.	logs of user sessions are stored in the debug.log file
9.	After running the server you can access the page by going to localhost:8000
10.	There is a view for a kiosk /tutor
11.	There is additionally a view for a larger monitor /view (this view cannot control queue)



# License #
This is free and unencumbered software released into the public domain.



Anyone is free to copy, modify, publish, use, compile, sell, or

distribute this software, either in source code form or as a compiled

binary, for any purpose, commercial or non-commercial, and by any

means.



In jurisdictions that recognize copyright laws, the author or authors

of this software dedicate any and all copyright interest in the

software to the public domain. We make this dedication for the benefit

of the public at large and to the detriment of our heirs and

successors. We intend this dedication to be an overt act of

relinquishment in perpetuity of all present and future rights to this

software under copyright law.



THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,

EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF

MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.

IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR

OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,

ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR

OTHER DEALINGS IN THE SOFTWARE.



For more information, please refer to <http://unlicense.org/>
