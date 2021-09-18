# mashup-generation

## How to run data collection

In the command line run the following commands in the root directory:

```
pip install virtualenv
virtualenv mashup
source mashup/bin/activate
mashup/bin/pip install -r requirements.txt
```


For instructions on setting up GCP auth using the following command, visit this link: https://cloud.google.com/docs/authentication/getting-started#command-line

`export GOOGLE_APPLICATION_CREDENTIALS=<"YOUR KEY HERE">`

Reference https://googleapis.dev/python/storage/latest/client.html
