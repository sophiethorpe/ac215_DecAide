## 1. WebScraping <br>

The current version of images are scarped from runway images on vougue.com. Beautifulsoup and Requests-HTML packages are used. Total of 4221 shows are scraped. Among those, we scraped ~150 shows, including all years from 1988 to 2015, resulting in ~6000 runway pictures. It takes ~3 seconds to scrape a picture. PLEASE DO NOT RUN the notebooks for time considerations.

## 2. Preprocessing

The processing pipeline is used to resize the images and make the resolutions compatible for our models. The processing is done locally, then the processed images can be uploaded to buckets.

Tutorial:

1) cd into `/preprocessing`, where you can find the Dockerfile, Pipfile, and docker-shell.sh.

2) Run `sh docker-shell.sh`. This will run the docker container.

3) In the container environment, run `py preprocessing.py <raw data folder name>`.

The folder structure should look like:

* **preprocessing/** 
    
* **secrets/**
    * pics/
      * raw_data_1/
        * pic#1.jpg
        * pic#2.jpg
        * ...
      * raw_data_2/
      * ...
    * clean_data
    * other secrets

## 3. Data Versioning

We used the standard data versioning pipeline as shown in the tutorial #7 `https://github.com/dlops-io/data-versioning`.

Tutorial:

1) cd into `/data_versioning`, where you can find the Dockerfile, Pipfile, and docker-shell.sh.

2) Run `sh docker-shell.sh`. This will run the docker container.

3) In the container environment, run `git init and dvc init` if the dvc has not been initialized. After that, there should be a data folder under `/app`, `/app/decaide_data`. The data from the bucket `/ac215-decaide/images/...` will be mounted here.

4) Run `dvc remote add -d decaide_data gs://ac215-decaide/dvc_store`.

5) Run `dvc add decaide_data`.

6) Run `dvc push`.


## 4. Modeling

For the intial model, the cleaned data is loaded from the bucket, converted to tensors, and standardized. The corresponding year labels for the images are encoded using sklearn, duplicates are dropped from the dataset, and a TensorFlow Dataset is created. 

The model employs transfer learning, making use of a ResNet50 model initially trained on the ImageNet dataset. A global average pooling layer was added along with a dense layer and the output layer, which outputs a year category for each image. The last ten layers of the ResNet50 model were unfrozen and trained. Categorical cross-entropy was used for the loss, Adam for the optimizer, accuracy for the metric, and the model was trained for ten epochs. 

The performance of the model was fairly good, with over 50% accuracy, which is good considering the relatively large number of categories compared to the size of the dataset. However, more fine-tuning will be done, with data augmentation methods, SMOTE, and further hyperparameter fine-tuning being done to address class imbalance, distribution shift, and other issues currently seen in the model and dataset. 

Tutorial:

1) cd into `/modeling`, where you can find the `/initial_models_ac215.ipynb` notebook for the model.

2) Download `/initial_models_ac215.ipynb`, open it in Google Colab, and choose "Run all" under the "Runtime" tab.

3) When prompted, sign into your Google account.

4) In the third cell, you should see "Do you want to continue (Y/n)?". Click next to this, type "Y", and hit `Enter`. You should then see "Go to the following link in your browser, and complete the sign-in prompts:" and a link. Click on the link, sign into your Google account again, and then copy the link by clicking "Copy" on the final page. Paste this link into the Google Colab next to "Once finished, enter the verification code provided in your browser:" and hit `Enter`. 

5) The rest of the notebook should now run and train the model. 

## 5. Mock App

*****TODO
