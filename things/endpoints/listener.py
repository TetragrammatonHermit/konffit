from flask import Flask, redirect, render_template
import requests

from secrets import WAKELIGHT_URL, WAKELIGHT_ACCESS_TOKEN

app = Flask(__name__)

# Functions called from Sleep as Android events
# https://sites.google.com/site/sleepasandroid/doc/developer-api


@app.route('/')
def test_ui():
    return render_template('test_ui.html')


@app.route('/wakeup_sunrise')
def sunrise():
    post_spark('brightening')
    return redirect('/')


@app.route('/wakeup_strobo')
def strobo():
    post_spark('strobo')
    return redirect('/')


@app.route('/wakeup_dismiss')
def dismiss_alarm():
    post_spark('off')
    return redirect('/')


def post_spark(spark_function):
    print "Posting " + spark_function
    payload = {'args': 200,  # 15000 def
               'access_token': WAKELIGHT_ACCESS_TOKEN}

    # TODO async.
    req = requests.post(url=WAKELIGHT_URL + spark_function,
                        data=payload)
    print 'Response: '
    print req.content

if __name__ == '__main__':
    app.run(debug=True)
