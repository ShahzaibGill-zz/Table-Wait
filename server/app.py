from twilio.rest import TwilioRestClient
from flask import Flask, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def sendSMS():
    data = request.get_json()
    twilioNumber = 1 # Enter Twilio Number Here
    customerNumber = data['phoneNumber']
    text = 'Hi '+data['name']+', your table for '+data['size']+' at '+data['establishment']+' is ready!'
    account_sid = "" #Enter twilio account SID here
    auth_token = "" #Enter twilio auth token here
    client = TwilioRestClient(account_sid, auth_token)

    message = client.messages.create(to='+'+str(customerNumber), from_="+"+str(twilioNumber),
                                     body=text)
    return 'Message Sent'

if __name__ == "__main":
    app.run()