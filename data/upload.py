try:
  from google.cloud import storage
except ImportError:
  from google.datalab import storage
import argparse
import os

def upload_blob(storage_client, bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "File {} uploaded to {}.".format(
            source_file_name, destination_blob_name
        )
    )

if __name__=="__main__":
    client = storage.Client()
    bucket = client.get_bucket('youtube-mashup-data')

    data_dir = "../Downloader Stuff/Downloads/" 
    for filename in os.listdir(data_dir):
        source_file_name = filename
        destination_blob_name = ""
        if ('$' in source_file_name):
            destination_blob_name = "mashups/" + source_file_name 
        else:
            destination_blob_name="originals/" + source_file_name 
        upload_blob(client, bucket, source_file_name, destination_blob_name)