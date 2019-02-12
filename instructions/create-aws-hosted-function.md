# Build An AWS-Hosted Hello Buttons Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/gadgets/ECHO_BUTTONS_DEV_PORTAL_API_LAUNCH_BLOG_HERO_954x240_V1._TTH_.png" />

## Setting Up A Lambda Function Using Amazon Web Services

Before you create your back-end function, you will need:

* **An AWS Account** If you haven't already, sign up for AWS by going to [AWS Free Tier](https://aws.amazon.com/free/). For most developers, the [AWS Lambda Free Tier](https://aws.amazon.com/lambda/pricing/) is sufficient for the function that supports an Alexa skill.
* [GIT](https://git-scm.com/)
* [Node.JS](https://nodejs.org) version 8 or higher


## Step 1: Create the Deployment Package

1. Clone the repository.
Open a (bash) command prompt, or terminal, on your laptop, and run:

```bash
$ git clone https://github.com/alexa/skill-sample-nodejs-buttons-hellobuttons/
```

2. Install npm dependencies by running the npm command `npm install` from the directory of the repo you just cloned in the previous step.

```bash
$ cd skill-sample-nodejs-buttons-hellobuttons/lambda/custom
$ npm install
```

3. Create an archive to upload to AWS Lambda.

Make sure to execute the following in the `lambda/custom` directory:

```bash
$ zip -r -X ../HelloButtonsDeploymentPackage.zip *
```

## Step 2: Upload the Deployment Package
In this step, you upload the zip archive of the skill code and supporting modules to AWS Lambda. Later, when you set up the skill in the developer portal, you will specify that this function is the endpoint for the skill.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/console/home?region=us-east-1#) and navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda/home?region=us-east-1), which is located under **Compute** services.
2. Using the region selector at the top right of the page, select **US East (N.Virginia)**.
3. Select **Create function**.
4. Select **Author from scratch**.
5. For **Name**, enter `HelloButtons`.
6. For **Runtime**, select **Node.js 8.10**.
7. For **Role**, select **Create new role from template(s)**.
8. For **Role name**, enter `HelloButtonsRole`.
9. From the **Policy templates** list, select **Simple Microservice permissions**.
10. In the lower right, click the **Create function** button. The function might take a moment to create.
11. Under the **Function code** section, for **Code entry type**, select **Upload a .ZIP file**. Then click **Upload** and choose the ``HelloButtonsDeploymentPackage.zip`` file.
12. For **Runtime**, select **Node.js 8.10**.
13. Under the **Designer** section, under **Add triggers**, select the **Alexa Skills Kit** option, select
**Disable** under **Skill ID verification** and then select the **Add** button in the lower right.
14. (Optional, but recommended) To **secure this Lambda function** follow the instructions found here: [alexa.design/secure-lambda-function](https://alexa.design/secure-lambda-function)

15. At the top of the page, select **Save**.

## Step 3: Find the ARN of the Lambda function
In this step, you find the Amazon Resource Name (ARN) of the Lambda function that you just created. The ARN serves as the ID of the function. You can find the ARN at the top right of the Hello Buttons function page in the AWS Lambda console. The ARN will look something
like `arn:aws:lambda:us-east-1:012345678910:function:HelloButtons`.

Copy the ARN. Later, when you set up the Hello Buttons skill in the developer portal, you will provide this ARN as the endpoint for the skill.


* **Click the "Next" button to continue.**

[![Next](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_testing._TTH_.png)](./test-using-simulator.md)


