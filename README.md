![](https://images-na.ssl-images-amazon.com/images/G/01/kindle/dp/2017/4911315144/LP_AG_HERO_BANNER_1334x389.jpg)


## Hello Buttons Skill

**Important: The Gadgets Skill API is in beta and is subject to change at any time without notice. We welcome your feedback.**


These instructions show how to create a simple skill called Hello Buttons. This skill demonstrates how to send directives to, and receive events from, Echo Buttons.

**Note:** Hello Buttons demonstrates how to use the Gadget interfaces ([GameEngine](https://developer.amazon.com/docs/gadget-skills/gameengine-interface-reference.html) and [GadgetController](https://developer.amazon.com/docs/gadget-skills/gadgetcontroller-interface-reference.html)). It is not intended to be a comprehensive example. For an end-to-end skill, please refer to the Color Changer skill in the [Alexa Github](https://github.com/alexa/skill-sample-nodejs-buttons-colorchanger).

This sample skill uses:

* The [developer portal](https://developer.amazon.com/home.html) to configure the skill and specify the interaction model
* The [Node.js](https://nodejs.org/en/) framework for the skill code
* [AWS Lambda](https://aws.amazon.com/lambda/) to host the skill
* The [Alexa Skills Kit (ASK) SDK for Node.js](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) to simplify the skill code

## Table of Contents
* [Hello Buttons Skill Flow](#hello-buttons-skill-flow)
* [Preparation](#preparation)
* [Step 1: Create the Deployment Package](#step-1-create-the-deployment-package)
* [Step 2: Upload the Deployment Package to AWS Lambda](#step-2-upload-the-deployment-package)
* [Step 3: Find the ARN of the Lambda function](#step-3-find-the-arn-of-the-lambda-function)
* [Step 4: Create the Skill](#step-4-create-the-skill)
* [Step 5: Create an Interaction Model](#step-5-create-an-interaction-model)
* [Step 6: Select Gadget Interfaces](#step-6-select-gadget-interfaces)
* [Step 7: Enter the Endpoint](#step-7-enter-the-endpoint)
* [Step 8: Enter Publishing Information](#step-8-enter-publishing-information)
* [Step 9: Enter Privacy and Compliance Information](#step-9-enter-privacy-and-compliance-information)
* [Step 10: Enable the Skill in the Alexa App](#step-10-enable-the-skill-in-the-alexa-app)
* [Step 11: Invoke the Skill](#step-11-invoke-the-skill)
* [License](#license)

## Hello Buttons Skill Flow
When the Hello Buttons skill begins, it will send [animation directives](https://developer.amazon.com/docs/gadget-skills/control-echo-buttons.html#animate) for the three possible trigger events (`buttonDown`, `buttonUp` and `none`) to all the Echo Buttons. Alexa will then ask you to press the buttons, and an audio file will play.

When you press a button, the skill will interrupt Alexa's speech. If the button that you pressed is not awake, the skill will initialize the button by sending animation directives for `buttonDown`, `buttonUp` and `none` to that button. This is different from the original `LaunchRequest` intent, which sent initialization directives to all buttons.

If the pressed button wakes up, you will see a different color on `buttonDown` and `buttonUp` events, as well as a breathing animation for the `none` event. If you cancel the skill (for example, by saying "Alexa, cancel") or the Input Handler expires, the buttons will fade from white to black.

## Preparation
Before you create the Hello Buttons skill, you must take the following steps:

* **Create an Amazon developer account** If you don't already have an Amazon developer account, go to the [developer portal](https://developer.amazon.com/edw/home.html#/) and select **Sign In** in the upper right to create a free account.

* **Sign up for AWS** If you haven't already, sign up for AWS by going to [AWS Free Tier](https://aws.amazon.com/free/). For most developers, the [AWS Lambda Free Tier](https://aws.amazon.com/lambda/pricing/) is sufficient for the function that supports an Alexa skill.

* **Get Echo Buttons** This skill requires two [Echo Buttons](https://www.amazon.com/Echo-Buttons-Alexa-Gadget-Pack/dp/B072C4KCQH/).

## Step 1: Create the Deployment Package

1. Clone the repository.

```bash
$ git clone https://github.com/alexa/skill-sample-nodejs-buttons-hellobuttons/
```

2. Install npm dependencies by running the npm command `npm install` from the directory of the repo you just cloned in the previous step.

```bash
$ cd skill-sample-nodejs-buttons-hellobuttons
$ npm install
```

3. Create an archive to upload to AWS Lambda.

```bash
$ zip -r -X ../HelloButtonsDeploymentPackage.zip *
```

## Step 2: Upload the Deployment Package
In this step, you upload create an archive of the skill code and supporting modules and upload the archive to AWS Lambda. Later, when you set up the skill in the developer portal, you will specify that this function is the endpoint for the skill.

1. Sign in to the [AWS Management Console](https://console.aws.amazon.com/console/home?region=us-east-1#) and navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda/home?region=us-east-1), which is located under **Compute** services.
2. Using the region selector at the top right of the page, select **US East (N.Virginia)**.
3. Select **Create function**.
4. Select **Author from scratch**.
5. For **Name**, enter `HelloButtons`.
6. For **Runtime**, select **Node.js 6.10**.
7. For **Role**, select **Create new role from template(s)**.
8. For **Role name**, enter `HelloButtonsRole`.
9. From the **Policy templates** list, select **Simple Microservice permissions**.
10. In the lower right, click the **Create function** button. The function might take a moment to create.
11. Under the **Function code** section, for **Code entry type**, select **Upload a .ZIP file**. Then click **Upload** and choose the ``HelloButtonsDeploymentPackage.zip`` file.
12. For **Runtime**, select **Node.js 6.10**.
13. Under the **Designer** section, under **Add triggers**, select the **Alexa Skills Kit** option, and
then select the **Add** button in the lower right.
14. At the top of the page, select **Save**.

## Step 3: Find the ARN of the Lambda function
In this step, you find the Amazon Resource Name (ARN) of the Lambda function that you just created. The ARN serves as the ID of the function. You can find the ARN at the top right of the Hello Buttons function page in the AWS Lambda console. The ARN will look something
like `arn:aws:lambda:us-east-1:012345678910:function:HelloButtons`.

Copy the ARN. Later, when you set up the Hello Buttons skill in the developer portal, you will provide this ARN as the endpoint for the skill.

## Step 4: Create the Skill

Next, create the skill in the developer console by using the following steps:

1. Sign in to the [Alexa Skills Kit developer console](https://developer.amazon.com/alexa/console/ask).
2. Select **Create Skill**.
3. For **Skill Name**, enter **Hello Buttons**, and then select **Next** in the upper right.
4. For **Choose a model to add to your skill**, select **Custom**, and then select **Create Skill** in the upper right.

***Important: If you get an 'unspecified error' when performing any of the remaining steps, try logging out and then logging back in to the developer console.***

## Step 5: Create an Interaction Model

Continuing from the previous step, do the following:

1. On the left side, select **Invocation**.
2. For **Skill Invocation Name**, enter `hello buttons`, and then select **Save Model**.
3. On the left side, select **Intents**.
4. Select **Add Intent**.
5. Under **Create custom intent**, enter `LaunchIntent`, and then select **Create custom intent**.
6. For **Sample Utterances**, enter the following text: `Open Hello Buttons`
7. On the right side of the text field, select the **+** sign.
8. At the top of the page, select **Save Model**.
9. Select **Build Model**. The model might take a moment to build.

## Step 6: Select Gadget Interfaces

Continuing from the previous step, do the following:

1. On the left side, select **Interfaces**.
2. In the **Alexa Gadget** row of the interface list, select **Gadget Controller** and **Game Engine**.
3. At the top of the page, select **Save Interfaces**.

## Step 7: Enter the Endpoint

Continuing from the previous step, do the following:

1. On the left side, select **Endpoint**.
2. For **Service Endpoint Type**, select **AWS Lambda ARN**.
3. In the **Default Region** field, paste the ARN of the Lambda function that you created in an earlier step. Leave the other options at their default values.
4. At the top of the page, select **Save Endpoints**.

## Step 8: Enter Publishing Information

Continuing from the previous step, do the following:

1. At the top of the page, select **Launch**.
2. For **One Sentence Description** and **Detailed Description**, enter `This is a sample skill for Echo Buttons.`
3. For **Example Phrases**, enter `Alexa, open Hello Buttons`.
4. For **Echo Button Use**, select **Required**.
5. For **Number of Echo Buttons**, select a **Min** of **2** and a **Max** of **4**.
6. For **Number of Players**, select **1** for both **Min** and **Max**.  
7. Skip the icon part for now.
8. For **Category**, select **Games**.
9. At the bottom of the page, select **Save and continue**.

## Step 9: Enter Privacy and Compliance Information

Continuing from the previous step, do the following:

1. For **Does this skill allow users to make purchases or spend real money?**, select **No**.
2. For **Does this Alexa skill collect users' personal information?**, select **No**.
3. For **Is this skill directed to or does it target children under the age of 13?**, select **No**.
4. For **Does this skill contain advertising?** select **No**.
5. For **Export Compliance**, select the checkbox.
6. For **Testing Instructions**, enter `None`.
7. At the bottom of the page, select **Save and continue**.
8. Again, select **Save and continue** to accept the default options on the **Availability** page.\
   You should now be on the **Submission** page, which will tell you that fixes are required (to add icons). You don't need to add icons now because you can test the skill without submitting it for certification.

## Step 10: Enable the Skill in the Alexa App

Your Hello Buttons skill is in the development state and available for you to test with your Amazon Echo device and your Echo Buttons. First, you must ensure that the skill is enabled in the Alexa app. To check this, do the following:

1. Go to the web version of the [Alexa app](https://alexa.amazon.com/) and sign in with your Amazon developer account.
2. Choose **Skills** from the main menu.
3. In the upper right, choose **Your Skills**.
4. Using the search bar, search for the Hello Buttons skill.
5. Select the skill.
6. Select **ENABLE**.

## Step 11: Invoke the Skill

Pair your Echo Buttons to your Amazon Echo device, and then invoke the Hello Buttons skill by saying "***Alexa, open Hello Buttons***". The skill should run as described in the [skill flow](#hello-buttons-skill-flow).

## License

This library is licensed under the Amazon Software License.
